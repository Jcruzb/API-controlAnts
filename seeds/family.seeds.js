require("dotenv").config();
require("../config/db.config");

console.log("Seeding family...")

const mongoose = require("mongoose");
const Family = require("../models/Family.model");
const family = require("./json/family.json");

const seedUsers = () => {


  mongoose.connection
    .dropCollection("family")
    .then(() => {
      console.log("DB cleared");

      return Family.create(family);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.familyName} has been created`);
      });

      console.log(`${userDB.length} family have been created`);
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
    .dropCollection("family")
    .then(() => {
      console.log("DB cleared");

      return Family.create(family);
    })
    .then((userDB) => {
        userDB.forEach((user) => {
        console.log(`${user.familyName} has been created`);
      });

      console.log(`${userDB.length} family have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
}