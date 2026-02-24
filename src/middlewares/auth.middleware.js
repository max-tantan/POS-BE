const jwt = require('jsonwebtoken')
const AppError = require('../errors/AppError')

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        return next(new AppError('TOKEN_REQUIRED', 401))
    }

    const token = authHeader.split(' ')[1]

    try {
        req.user = jwt.verify(token, 'SECRET_KEY') // inject user
        next()
    } catch (err) {
        next(new AppError('INVALID_TOKEN', 401))
    }
}