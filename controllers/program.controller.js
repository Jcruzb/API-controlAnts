const createError = require('http-errors');
const HttpStatus = require('http-status-codes');
const VirtualProgram = require('../models/Program.model');
const Family = require('../models/Family.model');
const Expense = require('../models/Expense.model');
const Debt = require('../models/Debt.model');

module.exports.getVirtualProgramByDate = (req, res, next) => {
  const { month, year } = req.query;
  const { familyId } = req.params;

  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0, 23, 59, 59);

  Family.findById(familyId)
    .populate('members.user')
    .then(family => {
      if (!family) {
        return next(createError(HttpStatus.StatusCodes.NOT_FOUND, 'Familia no encontrada'));
      }

      console.log('Familia encontrada:', family.familyName);

      const userIds = family.members.map(m => m.user._id);

      return Promise.all([
        Expense.find({
          planedPayer: { $in: userIds },
          date: { $gte: startDate, $lte: endDate }
        }).populate('category').populate('planedPayer realPayer'),
        Debt.find({
          debtOwner: { $in: userIds },
          startDate: { $lte: endDate },
          endDate: { $gte: startDate }
        }).populate('debtOwner payedUser')
      ]).then(([expenses, debts]) => {
        const program = new VirtualProgram({
          family,
          month: parseInt(month),
          year: parseInt(year),
          members: family.members.map(m => m.user),
          expenses,
          debts
        });

        console.log('Programa virtual generado:', program);

        res.status(200).json(program);
      });
    })
    .catch(err => {
      console.error('Error al obtener el programa virtual:', err);
      next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, 'Error al obtener el programa virtual'));
    });
};