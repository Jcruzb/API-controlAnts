const Purchase = require('../models/Purchase.model')
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createPurchase = (req, res, next) => {
    Purchase.create(req.body)
        .then(purchase => {
            console.log(purchase), res.status(HttpStatus.StatusCodes.CREATED).json(purchase);
        })
        .catch(next);
}

module.exports.getPurchases = (req, res, next) => {
    Purchase.find()
        .then(purchases => {
            res.status(HttpStatus.StatusCodes.OK).json(purchases);
        })
        .catch(err => {
            console.log('Error', err);
            next(err);
        });
}

module.exports.getPurchase = (req, res, next) => {
    const { id } = req.params;
    Purchase.findById(id)
        .then(purchase => {
            if (!purchase) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(purchase);
        })
        .catch(next);
}

module.exports.editPurchase = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar la compra');
    const { id } = req.params;
    Purchase.findByIdAndUpdate(id, req.body)
        .then(purchase => {
            if (!purchase) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(purchase);
        })
        .catch(() => next(editError));
}

module.exports.deletePurchase = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar la compra');
    const { id } = req.params;
    Purchase.findByIdAndDelete(id)
        .then(purchase => {
            if (!purchase) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(purchase);
        })
        .catch(() => next(deleteError));
}

