const PriceHistory = require('../models/PriceHistory.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createPriceHistory = (req, res, next) => {
    PriceHistory.create(req.body)
        .then(priceHistory => {
            res.status(HttpStatus.StatusCodes.CREATED).json(priceHistory);
        })
        .catch(next);
}

module.exports.getPriceHistories = (req, res, next) => {
    PriceHistory.find()
        .then(priceHistories => {
            res.status(HttpStatus.StatusCodes.OK).json(priceHistories);
        })
        .catch(next);
}

module.exports.editPriceHistory = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el historial de precios');
    const { id } = req.params;
    PriceHistory.findByIdAndUpdate(id, req.body)
        .then(priceHistory => {
            if (!priceHistory) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(priceHistory);
        })
        .catch(() => next(editError));
}

module.exports.deletePriceHistory = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar el historial de precios');
    const { id } = req.params;
    PriceHistory.findByIdAndDelete(id)
        .then(priceHistory => {
            if (!priceHistory) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(priceHistory);
        })
        .catch(() => next(deleteError));
}