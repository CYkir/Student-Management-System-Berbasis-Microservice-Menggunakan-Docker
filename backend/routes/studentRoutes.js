const express = require("express");
const router = express.Router();
const student = require("../controllers/studentController");
const auth = require("../middleware/authMiddleware");


router.get("/", auth, student.getStudents);

// CREATE
router.post("/", auth, student.createStudent);
// UPDATE
router.put("/:id", auth, student.updateStudent);

// GET DETAIL
router.get("/:id", auth, student.getStudentById);
// DELETE
router.delete("/:id", auth, student.deleteStudent);

module.exports = router;

