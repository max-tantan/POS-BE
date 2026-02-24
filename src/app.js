const express = require('express')
const app = express()

app.use(express.json())

// ROUTER
const authRoutes = require('./routes/auth.routes')

// PREFIX
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello Express')
})

const userRoutes = require('./routes/user.routes')
app.use('/users', userRoutes)

module.exports = app
