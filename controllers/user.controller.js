const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
// const mailer = require('../config/nodemailer.config');

module.exports.register = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            // mailer.sendValidationEmail(user);
            res.status(HttpStatus.StatusCodes.CREATED).json(user);
        })
        .catch(next);
}

module.exports.getUsers = (req, res, next) => {
    User.find()
        .populate('income')
        .populate('family')
        .then(users => {
            res.status(HttpStatus.StatusCodes.OK).json(users);
        })
        .catch(next);
}

module.exports.editUser = (req, res, next) => {
    const editError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al editar el usuario');
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body)
        .then(user => {
            if (!user) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(user);
        })
        .catch(() => next(editError));
}
module.exports.addIncome = (req, res, next) => {
    const { id } = req.params;

    User.findById(id)
        .then((user) => {
            if (!user) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            } else {
                if (!req.body) {
                    return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send('No data provided');
                }
                user.incomes.push(req.body);

                return user.save()
                    .then(() => {
                        res.status(HttpStatus.StatusCodes.CREATED).json(user);
                    })
                    .catch((error) => {
                        console.log(error)
                        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
                    });
            }
        })
        .catch((error) => {
            next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
        });
};

module.exports.deleteUser = (req, res, next) => {
    const deleteError = createError(HttpStatus.StatusCodes.CONFLICT, 'error al eliminar el usuario');
    const { id } = req.params;
    User.findByIdAndDelete(id)
        .then(user => {
            if (!user) {
                return res.status(HttpStatus.StatusCodes.NOT_FOUND).send();
            }
            res.status(HttpStatus.StatusCodes.OK).json(user);
        })
        .catch(() => next(deleteError));
}

module.exports.activate = (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, { active: true })
        .then(() => {
            res.redirect(`${process.env.APP_FRONTEND}/login`);
        })
        .catch(next);
};

module.exports.me = (req, res, next) => {
    User.findById(req.currentUser)
        .populate('family')
        .then((user) => {
            if (!user) {
                next(createHttpError(StatusCodes.NOT_FOUND, "User not found"));
            } else {
                res.json(user);
            }
        })
        .catch(next);
};

module.exports.getUsersNameAndEmail = (req, res, next) => {
    User.find({}, { name: 1, email: 1 })
        .then(users => {
            res.status(HttpStatus.StatusCodes.OK).json(users);
        })
        .catch(next);
}