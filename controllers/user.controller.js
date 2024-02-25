const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const mailer = require('../config/nodemailer.config');

module.exports.register = (req, res, next) => {
    User.create(req.body)
        .then(user => {
            mailer.sendValidationEmail(user);
            res.status(HttpStatus.StatusCodes.CREATED).json(user);
        })
        .catch(next);
}

module.exports.getUsers = (req, res, next) => {
    User.find()
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
        res.redirect(`${process.env.APP_FRONTEND}/`);
      })
      .catch(next);
  };
  


