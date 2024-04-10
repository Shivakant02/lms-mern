import { Router } from "express";
import { addLectureToCourseById, createCourse, deleteCourse, getAllCourses, getLecturesByCourseId, updateCourse } from "../controllers/course.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";
import upload from "../middleware/multer.middleware.js";


const router = Router();

router
    .route('/')
    .get(getAllCourses)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('thumbnail'),
        createCourse
    );
router
    .route('/:id')
    .get(isLoggedIn, getLecturesByCourseId)
    .put(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        updateCourse)
    .delete(isLoggedIn,
        authorizedRoles('ADMIN'),
        deleteCourse)
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        upload.single('lecture'),
        addLectureToCourseById)

    

export default router;