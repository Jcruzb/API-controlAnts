require("dotenv").config();
require("../config/db.config");

console.log("Seeding expenses...")

const mongoose = require("mongoose");
const Expense = require("../models/Expense.model");
const expenses = require("./json/expenses.json");

const seedUsers = () => {


  mongoose.connection
    .dropCollection("expenses")
    .then(() => {
      console.log("DB cleared");

      return Expense.create(expenses);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.description} has been created`);
      });

      console.log(`${userDB.length} expenses have been created`);
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
    .dropCollection("expenses")
    .then(() => {
      console.log("DB cleared");

      return Expense.create(expenses);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.description} has been created`);
      });

      console.log(`${userDB.length} expenses have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
}