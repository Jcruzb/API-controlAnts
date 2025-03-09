const Debt = require('../models/Debt.model');
const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');

module.exports.createDebt = (req, res, next) => {
    const { debtOwner, payer } = req.body;

    Debt.create(req.body)
        .then(debt => {
            const ownerUpdate = User.findByIdAndUpdate(
                debtOwner, 
                { $push: { debts: debt._id } }, 
                { new: true }
            );

            
            const payerUpdate = User.findByIdAndUpdate(
                payer,
                { $push: { debtsToPay: debt._id } },
                { new: true }
            );

            
            return Promise.all([ownerUpdate, payerUpdate])
                .then(() => res.status(HttpStatus.StatusCodes.CREATED).json(debt));
        })
        .catch(next);
};

module.exports.getDebts = (req, res, next) => {
    Debt.find()
        .then(debts => {            res.status(HttpStatus.StatusCodes.OK).json(debts);
        })
        .catch(err => {
            console.log('Error', err);
            next(err);
        });
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
    const { id } = req.params;
    Debt.findByIdAndDelete(id)
        .then(debt => {
            if (!debt) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            // Eliminamos la deuda del usuario responsable
            return User.findByIdAndUpdate(
                debt.debtOwner, 
                { $pull: { debts: debt._id } }
            ).then(() => res.status(HttpStatus.StatusCodes.OK).json(debt));
        })
        .catch(() => next(createError(HttpStatus.StatusCodes.CONFLICT, 'Error al eliminar la deuda')));
};

module.exports.getDebtsByIds = (req, res, next) => {
    const { ids } = req.query; // Se espera una cadena separada por comas
    if (!ids) {
      return res.status(HttpStatus.StatusCodes.BAD_REQUEST).json({ message: 'No se proporcionaron IDs de deudas.' });
    }
    const idsArray = ids.split(',');
  
    Debt.find({ _id: { $in: idsArray } })
      .then(debts => res.status(HttpStatus.StatusCodes.OK).json(debts))
      .catch(error => next(error));
  };

