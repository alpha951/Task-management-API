"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Keshav",
          email: "10xdev@vscode.com",
          passwordHash:
            "$2b$10$9zdspQi.dWq/xcrFfHnDauAp3wXgcsngN3e5eFW1KGtY6hEsh9P3q",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "AlphaDev",
          email: "leetcoders@vscode.com",
          passwordHash:
            "$2b$10$9zdspQi.dWq/xcrFfHnDauAp3wXgcsngN3e5eFW1KGtY6hEsh9P3q",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "UnpaidIntern",
          email: "gitIsNotGithub@vscode.com",
          passwordHash:
            "$2b$10$9zdspQi.dWq/xcrFfHnDauAp3wXgcsngN3e5eFW1KGtY6hEsh9P3q",
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        {
          name: "DevVsCP",
          email: "codeforcees@vscode.com",
          passwordHash:
            "$2b$10$9zdspQi.dWq/xcrFfHnDauAp3wXgcsngN3e5eFW1KGtY6hEsh9P3q",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
