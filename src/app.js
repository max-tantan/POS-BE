const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

// ROUTER
const authRoutes = require('./routes/auth.routes')

// PREFIX
app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.send('Hello Express')
})

const userRoutes = require ('./routes/user.routes')
app.use('/users', userRoutes)

const kelasRoutes = require ('./routes/kelas.routes')
app.use('/kelas', kelasRoutes)

const siswaRoutes = require ('./routes/siswa.routes')
app.use('/siswa', siswaRoutes)

const produkRoutes = require ('./routes/produk.routes')
app.use('/produk', produkRoutes)

const orderRoutes = require ('./routes/order.routes')
app.use('/orders', orderRoutes)

const dashboardRoutes = require('./routes/dashboard.routes');
app.use('/dashboard', dashboardRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    status: 'error',
    statusCode: statusCode,
    message: message
  })
})

module.exports = app
