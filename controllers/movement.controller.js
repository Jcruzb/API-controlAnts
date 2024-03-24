const Movement = require('../models/Movement.model')
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createMovement = (req, res, next) => {
    Movement.create(req.body)
        .then(movement => {
            console.log(movement),            res.status(HttpStatus.StatusCodes.CREATED).json(movement);
        })
        .catch(next);
}

module.exports.getMovements = (req, res, next) => {
    Movement.find()
        .then(movements => {            res.status(HttpStatus.StatusCodes.OK).json(movements);
        })
        .catch(err => {
            console.log('Error', err);
            next(err);
        });
}

module.exports.getMovement = (req, res, next) => {
    const { id } = req.params;
    Movement.findById(id)
        .then(movement => {
            if (!movement) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(movement);
        })
        .catch(next);
}

module.exports.editMovement = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el movimiento');
    const { id } = req.params;
    Movement.findByIdAndUpdate(id, req.body)
        .then(movement => {
            if (!movement) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(movement);
        })
        .catch(() => next(editError));
}

module.exports.deleteMovement = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar el movimiento');
    const { id } = req.params;
    Movement.findByIdAndDelete(id)
        .then(movement => {
            if (!movement) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(movement);
        })
        .catch(() => next(deleteError));
}