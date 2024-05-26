const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

// Define routes
router.get("/", studentController.findAll);
router.get("/:id", studentController.findById);
router.post("/", studentController.create);
router.put("/:id", studentController.update);
router.delete("/:id", studentController.deleteById);

module.exports = router;
