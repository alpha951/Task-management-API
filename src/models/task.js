"use strict";
const { Model } = require("sequelize");
const { Enums } = require("../utils/common");

const { PENDING, ONGOING, COMPLETED } = Enums.TASK_STATUS;

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, {
        foreignKey: "createdby",
        onDelete: "CASCADE",
      });
    }
  }
  Task.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [PENDING, ONGOING, COMPLETED],
        defaultValue: PENDING,
      },
      createdby: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Task",
    }
  );
  return Task;
};
