const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");
const {
  authenticateToken,
  authorizeRole,
} = require("../middleware/authMiddleware");

// Define routes
router.get("/", authenticateToken, studentController.findAll);
router.get("/:id", authenticateToken, studentController.findById);
router.post(
  "/",
  authenticateToken,
  authorizeRole("admin"),
  studentController.create
);
router.put(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  studentController.update
);
router.delete(
  "/:id",
  authenticateToken,
  authorizeRole("admin"),
  studentController.deleteById
);

module.exports = router;
