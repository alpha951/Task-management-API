const CrudRepository = require("./crud-repository");
const { Logger } = require("../config");
const { User } = require("../models");

class UserRepository extends CrudRepository {
  constructor() {
    super(User); // calling the constructor of the parent class to inherit all methods from it
  }

  // here we can add more methods that are specific to this entity
  async getUserByEmail(email) {
    const user = await this.model.findOne({ where: { email: email } });
    return user;
  }
}

module.exports = UserRepository;
