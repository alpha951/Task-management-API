const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Task } = require("../models");

class TaskRepository extends CrudRepository {
  constructor() {
    super(Task); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
  async getAll(user_id) {
    const response = await this.model.findAll({
      where: { createdby: user_id },
    });
    return response;
  }

  // TODO : update where user_id : id
  async get(data) {
    const response = await this.model.findAll({
      where: { id: data.id, createdby: data.user_id },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }

  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data.id,
        createdby: data.user_id,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
  async update(id, user_id, data) {
    const tableAttributes = Object.keys(this.model.rawAttributes);
    const reqAttributes = Object.keys(data);
    const hasAllAttributes = reqAttributes.every((elem) =>
      tableAttributes.includes(elem)
    );
    if (hasAllAttributes) {
      const response = await this.model.update(data, {
        where: {
          id: id,
          createdby: user_id,
        },
      });

      if (response[0] == 0) {
        throw new AppError(
          "The data for the given ID could not be found",
          StatusCodes.NOT_FOUND
        );
      }
      return response;
    } else {
      throw new AppError(
        "The column for the given ID could not be found",
        StatusCodes.NOT_FOUND
      );
    }
  }
  async destroy(data) {
    const response = await this.model.destroy({
      where: {
        id: data.id,
        createdby: data.user_id,
      },
    });
    if (!response) {
      throw new AppError(
        "Not able to find the resource ",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  }
}

module.exports = TaskRepository;
