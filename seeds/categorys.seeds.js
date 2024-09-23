require("dotenv").config();
require("../config/db.config");

console.log("Seeding categorys...")

const mongoose = require("mongoose");
const Category = require("../models/Category.model");
const categorys = require("./json/categorys.json");


  console.log("ejecución directa de semilla ")
  mongoose.connection.once("open", () => {
  mongoose.connection
    .dropCollection("categories")
    .then(() => {
      console.log("DB cleared");
    
      return Category.create(categorys);
    })
    .then((categoryDB) => {
        categoryDB.forEach((user) => {
        console.log(`${user.name} has been created`);
      });

      console.log(`${categoryDB.length} categorys have been created`);
    })
    .catch((err) => console.error(err))
    .finally(() => {
      mongoose.disconnect();
    });
});
