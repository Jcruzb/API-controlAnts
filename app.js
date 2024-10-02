require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const HttpStatus = require('http-status-codes')

require('./config/db.config')

const app = express()


const corsOptions = {
    origin: process.env.APP_FRONTEND,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions))
app.use(logger('dev'))
app.use(express.json())

app.get('/', (req, res) => {
    res.status(HttpStatus.StatusCodes.OK).send('Hello World!')
})

//rutas
const userRoutes = require('./routes/user.routes')
app.use('/users', userRoutes)
const categoryRoutes = require('./routes/category.routes')
app.use('/categories', categoryRoutes)
const expenseRoutes = require('./routes/expense.routes')
app.use('/expenses', expenseRoutes)
const debtRoutes = require('./routes/debt.routes')
app.use('/debts', debtRoutes)
const incomeRoutes = require('./routes/income.routes')
app.use('/incomes', incomeRoutes)
const familyRoutes = require('./routes/family.routes')
app.use('/family', familyRoutes)
const budgetRoutes = require('./routes/budget.routes')
app.use('/budgets', budgetRoutes)

app.use((errors, req, res, next) => {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: errors.message })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})


