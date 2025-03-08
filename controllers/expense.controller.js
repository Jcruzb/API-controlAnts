const Expense = require('../models/Expense.model');
const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createExpense = (req, res, next) => {

    console.log('entra a createExpense')
    if (!req.currentUser) {
        return res.status(HttpStatus.StatusCodes.UNAUTHORIZED).json({ message: "Usuario no autenticado" });
    }

    const userId = req.currentUser._id;

    console.log(req.body)

    Expense.create({ ...req.body, user: userId })
        .then(expense => {
            return User.findByIdAndUpdate(userId, {
                $push: { expenses: expense._id }
            }, { new: true }).then(() => {
                res.status(HttpStatus.StatusCodes.CREATED).json(expense);
            });
        })
        .catch(err => console.log(err));
};

module.exports.getExpenses = (req, res, next) => {
    Expense.find()
        .populate('category')
        .then(expenses => {
            res.status(HttpStatus.StatusCodes.OK).json(expenses);
        })
        .catch(next);
}
module.exports.getExpense = (req, res, next) => {
    const { id } = req.params;
    Expense.findById(id)
        .populate('category')
        .then(expense => {
            if (!expense) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            console.log(expense)
            res.status(HttpStatus.StatusCodes.OK).json(expense);
        })
        .catch(next);
}


module.exports.editExpense = (req, res, next) => {
    const { id } = req.params;
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'Error al editar el gasto');

    Expense.findByIdAndUpdate(id, req.body, { new: true })
        .then(expense => {
            if (!expense) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(expense);
        })
        .catch(() => next(editError));
}

module.exports.deleteExpense = (req, res, next) => {
    const { id } = req.params;
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'Error al eliminar el gasto');

    Expense.findByIdAndDelete(id)
        .then(expense => {
            if (!expense) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            return User.findByIdAndUpdate(expense.planedPayer, {
                $pull: { expenses: expense._id }
            }).then(() => {
                res.status(HttpStatus.StatusCodes.OK).json(expense);
            });
        })
        .catch(() => next(deleteError));
}