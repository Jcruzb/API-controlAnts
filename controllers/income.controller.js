const Income = require('../models/Income.model')
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const { populate } = require('../models/Debt.model');

module.exports.createIncome = (req, res, next) => {
    Income.create(req.body)
        .then(income => {
            res.status(HttpStatus.StatusCodes.CREATED).json(income);
        })
        .catch(error =>{
            console.log(error)
            next()
        })
}

module.exports.getIncomes = (req, res, next) => {
    Income.find()
        .populate('user')
        .then(income => {
            res.status(HttpStatus.StatusCodes.OK).json(income);
        })
        .catch(next);
}

module.exports.getIncome = (req, res, next) => {
    const { id } = req.params;
    Income.findById(id)
        .then(income => {
            if (!income) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(income);
        })
        .catch(next);
}

module.exports.editIncome = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el ingreso');
    const { id } = req.params;
    Income.findByIdAndUpdate(id, req.body)
        .then(income => {
            if (!income) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(income);
        })
        .catch(() => next(editError));
}

module.exports.deleteIncome = (req, res, next) => {
    const { id } = req.params;
    Income.findByIdAndDelete(id)
        .then(income => {
            if (!income) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(income);
        })
        .catch(() => next(deleteError));

}