require('dotenv').config()

const express = require('express')
const logger = require('morgan')
const cors = require('cors')
const HttpStatus = require('http-status-codes')

require('./config/db.config')

const app = express()


app.use(cors())
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
const productRoutes = require('./routes/product.routes')
app.use('/products', productRoutes)
const expenseRoutes = require('./routes/expense.routes')
app.use('/expenses', expenseRoutes)
const pricehistoryRoutes = require('./routes/priceHistory.routes')
const storeRoutes = require('./routes/store.routes')
app.use('/stores', storeRoutes)
const debtRoutes = require('./routes/debt.routes')
app.use('/debts', debtRoutes)

app.use((errors, req, res, next) => {
    res.status(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR).send({ error: errors.message })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})


