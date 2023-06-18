import express from "express";
import { addLecture, createCourse, deleteCourse, deleteLecture, getAllCourses, getCourseLecture } from "../controllers/courseController.js";
import singleUpload from "../middlewares/multer.js";
import { authorizeAdmin, authorizeSubscribers, isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Get All courses without Lectures
router.route("/courses").get(getAllCourses);

// create new course - only admin
router.route("/createcourse").post(isAuthenticated, authorizeAdmin, singleUpload, createCourse);

// Add Lecture , Delete course , Get course Details
router.route("/course/:id")
    .get(isAuthenticated,authorizeSubscribers, getCourseLecture)
    .post(isAuthenticated, authorizeAdmin, singleUpload, addLecture)
    .delete(isAuthenticated,authorizeAdmin,deleteCourse)

// Delete Lecture
router.route("/lecture").delete(isAuthenticated,authorizeAdmin,deleteLecture)

export default router;