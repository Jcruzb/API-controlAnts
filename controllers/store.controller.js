const Store = require('../models/Store.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createStore = (req, res, next) => {
    Store.create(req.body)
        .then(store => {
            res.status(HttpStatus.StatusCodes.CREATED).json(store);
        })
        .catch(next);
}

module.exports.getStores = (req, res, next) => {
    Store.find()
        .then(stores => {
            res.status(HttpStatus.StatusCodes.OK).json(stores);
        })
        .catch(next);
}

module.exports.editStore = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar la tienda');
    const { id } = req.params;
    Store.findByIdAndUpdate(id, req.body)
        .then(store => {
            if (!store) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(store);
        })
        .catch(() => next(editError));
}

module.exports.deleteStore = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar la tienda');
    const { id } = req.params;
    Store.findByIdAndDelete(id)
        .then(store => {
            if (!store) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(store);
        })
        .catch(() => next(deleteError));
}