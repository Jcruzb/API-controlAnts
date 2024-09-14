require("dotenv").config();
require("../config/db.config");

console.log("Seeding incomes...")

const mongoose = require("mongoose");
const Income = require("../models/Income.model");
const incomes = require("./json/incomes.json");

const seedUsers = () => {


  mongoose.connection
    .dropCollection("incomes")
    .then(() => {
      console.log("DB cleared");

      return Income.create(incomes);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.source} has been created`);
      });

      console.log(`${userDB.length} incomes have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });

};

module.exports = seedUsers;

if(require.main === module) {
  console.log("ejecución directa de semilla ")
  mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("incomes")
    .then(() => {
      console.log("DB cleared");

      return Income.create(incomes);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.source} has been created`);
      });

      console.log(`${userDB.length} incomes have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
}