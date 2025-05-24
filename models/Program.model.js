// models/VirtualProgram.js

class VirtualProgram {
  constructor({ family, month, year, members, expenses, debts }) {
    this.family = {
      id: family._id,
      name: family.familyName
    };
    this.month = month;
    this.year = year;
    this.members = members.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email
    }));
    this.expenses = expenses.map(expense => ({
      id: expense._id,
      amount: expense.amount,
      date: expense.date,
      kind: expense.kind,
      expenseGroup: expense.expenseGroup,
      category: expense.category?.name || 'Sin categoría',
      planedPayer: expense.planedPayer?.name,
      realPayer: expense.realPayer?.name,
      description: expense.description
    }));
    this.debts = debts.map(debt => ({
      id: debt._id,
      name: debt.name,
      amount: debt.amount,
      startDate: debt.startDate,
      quote: debt.quote,
      numberOfQuotes: debt.numberOfQuotes,
      user: debt.debtOwner?.name,
      payedUser: debt.payedUser?.name
    }));
  }
}

module.exports = VirtualProgram;