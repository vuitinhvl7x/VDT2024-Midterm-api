const { Model, DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database");

class Student extends Model {}

Student.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    student_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    university: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    region: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "student",
  }
);

module.exports = Student;
