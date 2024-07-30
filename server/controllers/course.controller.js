import cloudinary from "cloudinary";
import Course from "../models/course.model.js";
import AppError from "../utils/appError.js";
import fs from "fs/promises";

export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const getLecturesByCourseId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("Invalid course id or course not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course lectures fetched successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;

    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "DUMMY",
        secure_url: "DUMMY",
      },
    });

    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });

      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }

      fs.rm(`uploads/${req.file.filename}`);
    }

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course does not exists", 500));
    }
    await Course.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const updateCourse = async (req, res, next) => {
  const { id } = req.params;

  const course = await Course.findByIdAndUpdate(
    id,

    {
      $set: req.body,
    },
    {
      runValidators: true,
    }
  );

  if (!course) {
    return next(new AppError("course does not exist", 400));
  }

  res.status(200).json({
    success: true,
    message: "course updated successfully",
    course,
  });
};

export const addLectureToCourseById = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }

    const course = await Course.findById(id);

    if (!course) {
      return next(
        new AppError("Course with the given id does not exist1", 400)
      );
    }

    let lectureData = {};

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "lms",
          chunk_size: 50000000,
          resource_type: "video",
        });

        if (result) {
          lectureData.public_id = result.public_id;
          lectureData.secure_url = result.secure_url;
        }

        fs.rm(`uploads/${req.file.filename}`);
      } catch (error) {
        for (const file of await fs.readdir("uploads/")) {
          await fs.unlink(path.join("uploads/", file));
        }

        // Send the error message
        return next(
          new AppError(
            JSON.stringify(error) || "File not uploaded, please try again",
            400
          )
        );
      }
    }

    course.lectures.push({
      title,
      description,
      lecture: lectureData,
    });

    course.numberOfLectures = course.lectures.length;

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture added successfully",
      course,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export const deleteLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    if (!courseId) {
      return next(
        new AppError("Course id is incorrect or does not exists", 400)
      );
    }

    if (!lectureId) {
      return next(
        new AppError("Lecture id is incorrect or does not exists", 400)
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course does not exists", 400));
    }

    const lectureIndex = course.lectures.findIndex(
      (lecture) => lecture._id.toString() === lectureId.toString()
    );

    if (lectureIndex === -1) {
      return next(new AppError("Lecture does not exists", 400));
    }

    await cloudinary.v2.uploader.destroy(
      course.lectures[lectureIndex].lecture.public_id,
      {
        resource_type: "video",
      }
    );

    // Remove the lecture from the array
    course.lectures.splice(lectureIndex, 1);

    // update the number of lectures based on lectres array length
    course.numberOfLectures = course.lectures.length;

    // Save the course object
    await course.save();

    // Return response
    res.status(200).json({
      success: true,
      message: "Course lecture removed successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
