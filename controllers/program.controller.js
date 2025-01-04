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
    Program.find()
        .populate('expenses')
        .populate('debts')
        .then(program => {
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(next);
}

module.exports.getProgram = (req, res, next) => {
    const { id } = req.params;
    Program.findById(id)
        .populate('expenses')
        .populate('debts')
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(next);
}

module.exports.editProgram = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el programa');
    const { id } = req.params;
    Program.findByIdAndUpdate(id, req.body)
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(() => next(editError));
}

module.exports.deleteProgram = (req, res, next) => {
    const { id } = req.params;
    Program.findByIdAndDelete(id)
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.NO_CONTENT).send();
        })
        .catch(next);
}

module.exports.getProgramByDate = (req, res, next) => {
    const { month, year } = req.params;
    Program.findOne({ month, year })
        .populate('expenses')
        .populate('debts')
        .then(program => {
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(next);
}