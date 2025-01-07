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

    Program.findOne({ family: familyId, month, year })
        .populate('expenses')
        .populate('debts')
        .then(program => {
            console.log(program)
            if (!program) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).json({ message: 'Program not found' });
            }
            res.status(HttpStatus.StatusCodes.OK).json(program);
        })
        .catch(err => {
            console.log(err);
            next(err);
        }
        );
};

