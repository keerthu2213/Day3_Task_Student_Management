const express = require('express');
const router = express.Router();

// In-memory student data
let students = [
  { id: 1, name: "Arun", rollNo: "S101", age: 21, course: "B.Tech" },
  { id: 2, name: "Bala", rollNo: "S102", age: 22, course: "B.Sc" },
  { id: 3, name: "Charan", rollNo: "S103", age: 20, course: "B.Com" },
  { id: 4, name: "Deepak", rollNo: "S104", age: 23, course: "B.Tech" },
  { id: 5, name: "Ezhil", rollNo: "S105", age: 21, course: "B.Sc" }
];

// READ – Get all students
router.get('/', (req, res) => {
  res.json(students);
});

// READ – Get student by ID
router.get('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId)) return res.status(400).json({ message: "Invalid student ID" });

  const student = students.find(s => s.id === studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });

  res.json(student);
});

// CREATE – Add new student
router.post('/', (req, res) => {
  const { name, rollNo, age, course } = req.body;

  // Basic validation
  if (!name || !rollNo || !age || !course) {
    return res.status(400).json({ message: "Name, roll number, age, and course are required" });
  }

  // Generate unique ID
  const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;

  const newStudent = { id: newId, name, rollNo, age, course };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// UPDATE – Update student
router.put('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId)) return res.status(400).json({ message: "Invalid student ID" });

  const student = students.find(s => s.id === studentId);
  if (!student) return res.status(404).json({ message: "Student not found" });

  const { name, rollNo, age, course } = req.body;

  // Update only provided fields
  if (name) student.name = name;
  if (rollNo) student.rollNo = rollNo;
  if (age) student.age = age;
  if (course) student.course = course;

  res.json(student);
});

// DELETE – Remove student
router.delete('/:id', (req, res) => {
  const studentId = parseInt(req.params.id);
  if (isNaN(studentId)) return res.status(400).json({ message: "Invalid student ID" });

  const index = students.findIndex(s => s.id === studentId);
  if (index === -1) return res.status(404).json({ message: "Student not found" });

  students.splice(index, 1);
  res.json({ message: "Student deleted successfully" });
});

module.exports = router;
