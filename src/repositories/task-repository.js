const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { Task } = require("../models");

class TaskRepository extends CrudRepository {
  constructor() {
    super(Task); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
}

module.exports = TaskRepository;
