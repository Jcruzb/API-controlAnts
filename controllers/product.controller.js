const Product = require('../models/Poduct.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createProduct = (req, res, next) => {
    Product.create(req.body)
        .then(product => {
            res.status(HttpStatus.StatusCodes.CREATED).json(product);
        })
        .catch(next);
}

module.exports.getProducts = (req, res, next) => {
    Product.find()
        .then(products => {
            res.status(HttpStatus.StatusCodes.OK).json(products);
        })
        .catch(next);
}

module.exports.editProduct = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el producto');
    const { id } = req.params;
    Product.findByIdAndUpdate(id, req.body)
        .then(product => {
            if (!product) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(product);
        })
        .catch(() => next(editError));
}

module.exports.deleteProduct = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar el producto');
    const { id } = req.params;
    Product.findByIdAndDelete(id)
        .then(product => {
            if (!product) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(product);
        })
        .catch(() => next(deleteError));
}