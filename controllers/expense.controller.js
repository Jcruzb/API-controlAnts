const Expense = require('../models/Expense.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createExpense = (req, res, next) => {
    Expense.create(req.body)
        .then(expense => {
            res.status(HttpStatus.StatusCodes.CREATED).json(expense);
        })
        .catch(next);
}

module.exports.getExpenses = (req, res, next) => {
    Expense.find()
        .then(expenses => {
            res.status(HttpStatus.StatusCodes.OK).json(expenses);
        })
        .catch(next);
}

module.exports.editExpense = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el gasto');
    const { id } = req.params;
    Expense.findByIdAndUpdate(id, req.body)
        .then(expense => {
            if (!expense) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(expense);
        })
        .catch(() => next(editError));
}

module.exports.deleteExpense = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar el gasto');
    const { id } = req.params;
    Expense.findByIdAndDelete(id)
        .then(expense => {
            if (!expense) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(expense);
        })
        .catch(() => next(deleteError));
}