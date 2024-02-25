const Category = require('../models/Category.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createCategory = (req, res, next) => {
    Category.create(req.body)
        .then(category => {
            res.status(HttpStatus.StatusCodes.CREATED).json(category);
        })
        .catch(next);
}

module.exports.getCategories = (req, res, next) => {
    Category.find()
        .then(categories => {
            res.status(HttpStatus.StatusCodes.OK).json(categories);
        })
        .catch(next);
}

module.exports.getcategoriesName = (req, res, next) => {
    //obtener sólo el nombre de las categorías
    Category.find()
        .then(categories => {
            res.status(HttpStatus.StatusCodes.OK).json(categories.map(category => category.name));
        })
        .catch(next);
}

module.exports.editCategory = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar la categoría');
    const { id } = req.params;
    Category.findByIdAndUpdate(id, req.body)
        .then(category => {
            if (!category) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(category);
        })
        .catch(() => next(editError));
}

module.exports.deleteCategory = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar la categoría');
    const { id } = req.params;
    Category.findByIdAndDelete(id)
        .then(category => {
            if (!category) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(category);
        })
        .catch(() => next(deleteError));
}