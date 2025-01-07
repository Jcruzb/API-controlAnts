require("dotenv").config();
require("../config/db.config");

console.log("Seeding programs...")

const mongoose = require("mongoose");
const Program = require("../models/Program.model");
const programs = require("./json/programs.json");

const seedPrograms = () => {

    mongoose.connection
        .dropCollection("programs")
        .then(() => {
        console.log("DB cleared");
    
        return Program.create(programs);
        })
        .then((programDB) => {
            programDB.forEach((program) => {
            console.log(`${program.month} has been created`);
        });
    
        console.log(`${programDB.length} programs have been created`);
        })
        .catch((err) => console.error(err))
        .finally(() => {
        mongoose.disconnect();
        });
    
    }

module.exports = seedPrograms;

if(require.main === module) {
    console.log("ejecución directa de semilla ")
    mongoose.connection.once("open", () => {
    mongoose.connection
        .dropCollection("programs")
        .then(() => {
        console.log("DB cleared");
    
        return Program.create(programs);
        })
        .then((programDB) => {
            programDB.forEach((program) => {
            console.log(`${program.month} has been created`);
        });
    
        console.log(`${programDB.length} programs have been created`);
        })
        .catch((err) => console.error(err))
        .finally(() => {
        mongoose.disconnect();
        });
    });
}

