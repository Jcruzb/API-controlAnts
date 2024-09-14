require("dotenv").config();
require("../config/db.config");

console.log("Seeding debts...")

const mongoose = require("mongoose");
const Debt = require("../models/Debt.model");
const debts = require("./json/debts.json");

const seedUsers = () => {


  mongoose.connection
    .dropCollection("debts")
    .then(() => {
      console.log("DB cleared");

      return Debt.create(debts);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.name} has been created`);
      });

      console.log(`${userDB.length} debts have been created`);
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
    .dropCollection("debts")
    .then(() => {
      console.log("DB cleared");

      return Debt.create(debts);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.name} has been created`);
      });

      console.log(`${userDB.length} debts have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
}