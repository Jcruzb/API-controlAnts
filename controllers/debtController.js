const Debt = require('../models/Debt.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createDebt = (req, res, next) => {
    Debt.create(req.body)
        .then(debt => {
            res.status(HttpStatus.StatusCodes.CREATED).json(debt);
        })
        .catch(next);
}

module.exports.getDebts = (req, res, next) => {
    Debt.find()
        .then(debts => {
            res.status(HttpStatus.StatusCodes.OK).json(debts);
        })
        .catch(next);
}

module.exports.getDebt = (req, res, next) => {
    const { id } = req.params;
    Debt.findById(id)
        .then(debt => {
            if (!debt) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(debt);
        })
        .catch(next);
}

module.exports.editDebt = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar la deuda');
    const { id } = req.params;
    Debt.findByIdAndUpdate(id, req.body)
        .then(debt => {
            if (!debt) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(debt);
        })
        .catch(() => next(editError));
}

module.exports.deleteDebt = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar la deuda');
    const { id } = req.params;
    Debt.findByIdAndDelete(id)
        .then(debt => {
            if (!debt) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(debt);
        })
        .catch(() => next(deleteError));
}

