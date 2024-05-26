const {
  findById,
  findAll,
  create,
  update,
  deleteById,
} = require("../controllers/studentController");
const Student = require("../models/Student");

jest.mock("../models/Student");

describe("Student Controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should return 404 when student is not found", async () => {
      Student.findByPk.mockResolvedValue(null);

      const req = { params: { id: 1 } };
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await findById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Student could not be found");
    });

    it("should return 500 when an error occurs", async () => {
      Student.findByPk.mockRejectedValue(new Error("Database error"));

      const req = { params: { id: 1 } };
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await findById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "Error retrieving student from the database"
      );
    });
  });

  describe("findAll", () => {
    it("should return 404 when no students are found", async () => {
      Student.findAll.mockResolvedValue([]);

      const req = {};
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("No students found");
    });

    it("should return 500 when an error occurs", async () => {
      Student.findAll.mockRejectedValue(new Error("Database error"));

      const req = {};
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await findAll(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "Error retrieving students from the database"
      );
    });
  });

  describe("create", () => {
    it("should return 400 when there are validation errors", async () => {
      const error = new Error("Validation error");
      error.errors = [{ message: "Name is required" }];
      Student.create.mockRejectedValue(error);

      const req = { body: {} };
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith(["Name is required"]);
    });
  });

  describe("update", () => {
    it("should return 404 when student is not found", async () => {
      Student.findByPk.mockResolvedValue(null);

      const req = { params: { id: 1 }, body: {} };
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Student could not be found");
    });
  });

  describe("deleteById", () => {
    it("should return 404 when student is not found", async () => {
      Student.destroy.mockResolvedValue(0);

      const req = { params: { id: 1 } };
      const res = {
        send: jest.fn().mockReturnThis(),
        status: jest.fn(),
      };
      res.status.mockReturnValue(res);

      await deleteById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Student could not be found");
    });
  });
});
