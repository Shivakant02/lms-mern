import { Router } from "express";
import { createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from "../controllers/course.controller.js";
import { isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";


const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
        upload.single('thumbnail'),
        createCourse
    );
router
    .route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(updateCourse)
    .delete(deleteCourse);

export default router;