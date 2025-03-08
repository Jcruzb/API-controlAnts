const Program = require('../models/Program.model');
const Expense = require('../models/Expense.model');
const Debt = require('../models/Debt.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createProgram = (req, res, next) => {
    Program.create(req.body)
        .then(program => {
            res.status(HttpStatus.StatusCodes.CREATED).json(program);
        })
        .catch(next);
}

module.exports.getPrograms = (req, res, next) => {
    const { familyId } = req.params;

    Program.find({ family: familyId })
        .populate('expenses')
        .populate('debts')
        .then(programs => {
            if (!programs.length) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'No programs found for this family' });
            }
            res.status(HttpStatus.StatusCodes.OK).json(programs);
        })
        .catch(next);
};

module.exports.getProgram = (req, res, next) => {
    const { id } = req.params;

    Program.findById(id)
        .populate('expenses')
        .populate('debts')
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Program not found' });
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(next);
}

module.exports.editProgram = (req, res, next) => {
    const { id } = req.params;

    Program.findByIdAndUpdate(id, req.body, { new: true })
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Program not found' });
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(next);
}

module.exports.deleteProgram = (req, res, next) => {
    const { id } = req.params;

    Program.findByIdAndDelete(id)
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Program not found' });
            }
            res.status(HttpStatus.StatusCodes.NO_CONTENT).json();
        })
        .catch(next);
}

module.exports.getProgramByDate = (req, res, next) => {
    const { familyId, month, year } = req.body;

    const startDate = new Date(year, month - 1, 1); // Inicio del mes
    const endDate = new Date(year, month, 0, 23, 59, 59); // Fin del mes

    console.log(`StartDate: ${startDate}`);
    console.log(`EndDate: ${endDate}`);

    Program.findOne({ family: familyId, month, year })
        .populate('expenses')
        .populate('debts')
        .then(program => {
            if (!program) {
                console.log('Program no encontrado para los parámetros proporcionados');
                return res
                    .status(HttpStatus.StatusCodes.NOT_FOUND)
                    .json({ message: 'Program not found' });
            }

            // Buscar gastos dentro del rango de fechas
            return Expense.find({
                family: familyId, // Usar directamente el familyId recibido
                createdAt: { $gte: startDate, $lte: endDate }
            }).then(expenses => {
                console.log('Gastos encontrados:', expenses);

                // Actualizar el programa con los gastos encontrados
                program.expenses = expenses.map(expense => expense._id);
                return program.save();
            }).then(updatedProgram => {
                console.log('Program actualizado:');
                res.status(HttpStatus.StatusCodes.OK).json(updatedProgram);
            });
        })
        .catch(err => {
            console.log('Entrando a catch con error:');
            console.error(err.stack);
            next(err);
        });
};

