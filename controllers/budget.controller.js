const Income = require('../models/Income.model');
const Expense = require('../models/Expense.model');
const Debt = require('../models/Debt.model');
const User = require('../models/User.model');

module.exports.getBudgetForMonth = (req, res, next) => {
    const { userId, month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    let filterCriteria = {
        date: { $gte: startDate, $lte: endDate },
        $or: [{ 'status.planeado': true }, { 'status.realizado': true }]
    };

    // Primero buscamos si el usuario tiene una familia
    User.findById(userId).populate('family')
        .then(user => {
            if (!user) {
                return res.status(404).send('Usuario no encontrado');
            }

            const familyId = user.family ? user.family._id : null;

            // Si el usuario tiene una familia, incluimos ingresos y gastos familiares en el filtro
            if (familyId) {
                filterCriteria.incomeGroup = { $in: ['personal', 'familiar'] };
                filterCriteria.responsable = { $in: [userId, familyId] };
            } else {
                // Si no tiene familia, buscamos solo los personales
                filterCriteria.responsable = userId;
                filterCriteria.incomeGroup = 'personal';
            }

            // Buscar los ingresos (personales o familiares)
            return Income.find(filterCriteria)
                .then(incomes => {
                    // Buscar los gastos (personales o familiares)
                    return Expense.find(filterCriteria).then(expenses => ({ incomes, expenses }));
                })
                .then(({ incomes, expenses }) => {
                    // Buscar las deudas y las cuotas pendientes de pago
                    return Debt.find({
                        debtOwner: { $in: [userId, familyId] }, // Incluir deudas personales y familiares
                        finishDate: { $gte: startDate },
                        "pays.payDate": { $lte: endDate }
                    }).then(debts => ({ incomes, expenses, debts }));
                })
                .then(({ incomes, expenses, debts }) => {
                    const totalIncome = incomes.reduce((total, income) => total + income.amount, 0);
                    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);
                    const totalDebtPayments = debts.reduce((total, debt) => total + debt.quote, 0);

                    res.status(200).json({
                        totalIncome,
                        totalExpenses,
                        totalDebtPayments,
                        netBudget: totalIncome - totalExpenses - totalDebtPayments
                    });
                });
        })
        .catch(error => {
            next(error);
        });
};