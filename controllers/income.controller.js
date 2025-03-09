const Income = require('../models/Income.model');
const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createIncome = (req, res, next) => {
    console.log('entra en crear income')
    Income.create(req.body)
        .then(income => {
            console.log(income)
            return User.findByIdAndUpdate(
                income.responsable,
                { $push: { incomes: income._id } },
                { new: true }
            ).then(() => res.status(HttpStatus.StatusCodes.CREATED).json(income));
        })
        .catch(err => console.log(err));
};

module.exports.getIncomes = (req, res, next) => {
    Income.find()
        .populate('responsable')
        .then(income => {
            res.status(HttpStatus.StatusCodes.OK).json(income);
            console.log(res.status(HttpStatus.StatusCodes.OK).json(income))
        })
        .catch(err => {
            console.log(err)
            next()
        })
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
            return User.findByIdAndUpdate(
                income.responsable,
                { $pull: { incomes: income._id } }
            ).then(() => res.status(HttpStatus.StatusCodes.OK).json(income));
        })
        .catch(() => next(createError(HttpStatus.StatusCodes.CONFLICT, 'Error al eliminar el ingreso')));
};



module.exports.getIncomesByIds = (req, res, next) => {
    const { ids } = req.query; // Se espera una cadena separada por comas
    if (!ids) {
        return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'No se proporcionaron IDs de ingresos.' });
    }
    const idsArray = ids.split(',');

    Income.find({ _id: { $in: idsArray } })
        .then(incomes => res.status(HttpStatus.StatusCodes.OK).json(incomes))
        .catch(error => next(error));
};