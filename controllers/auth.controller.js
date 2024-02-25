const User = require('../models/User.model');
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res, next) => {
    const loginError = createError(HttpStatus.StatusCodes.UNAUTHORIZED, 'email o password incorrectos');
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(loginError);
    }
  
    // Check email
    User.findOne({ email })
      .then(user => {
        if (!user) {
          return next(loginError)
        }
  
        // Check password
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              return next(loginError)
            }
  
            // Emitir y firmar un token jwt con la info del usuario
            const token = jwt.sign(
              { id: user.id },
              process.env.JWT_SECRET || 'Super secret',
              {
                expiresIn: '1h'
              }
            )
  
            res.json({ accessToken: token })
          })
      })
      .catch(next)
  }