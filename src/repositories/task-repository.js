const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Task } = require("../models");

class TaskRepository extends CrudRepository {
  constructor() {
    super(Task); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
  async getAll(user_id = 4) {
    const response = await this.model.findAll({
      where: { createdby: user_id },
    });
    return response;
  }

  // TODO : update where user_id : id
  async get(data) {
    const response = await this.model.findByPk(data);
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
