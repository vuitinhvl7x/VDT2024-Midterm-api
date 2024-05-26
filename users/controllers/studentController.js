const Student = require("../models/Student");

exports.findById = async (req, res) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.send(student.toJSON());
    } else {
      res.status(404).send("Student could not be found");
    }
  } catch (error) {
    res.status(500).send("Error retrieving student from the database");
  }
};

exports.findAll = async (req, res) => {
  try {
    const students = await Student.findAll();
    if (!students || students.length === 0) {
      res.status(404).send("No students found");
    } else {
      res.status(200).send(students.map((s) => s.toJSON()));
    }
  } catch (error) {
    res.status(500).send("Error retrieving students from the database");
  }
};

exports.create = async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student.toJSON());
  } catch (error) {
    res.status(400).send(error.errors.map((err) => err.message));
  }
};

exports.update = async (req, res) => {
  const studentId = req.params.id;
  const payload = req.body;

  try {
    const student = await Student.findByPk(studentId);
    if (!student) {
      res.status(404).send("Student could not be found");
    } else {
      const updatedStudent = await student.update(payload);
      res.send(updatedStudent.toJSON());
    }
  } catch (error) {
    res.status(400).send(error.errors.map((err) => err.message));
  }
};

exports.deleteById = async (req, res) => {
  try {
    const rowsDeleted = await Student.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (rowsDeleted === 0) {
      res.status(404).send("Student could not be found");
    } else {
      res.send("Student has been deleted successfully!");
    }
  } catch (error) {
    res.status(500).send("Error deleting student from the database");
  }
};
