const db = require('../config/db')

exports.findAll = async () => {
    const [rows] = await db.query(
        'SELECT id, username, role FROM users'
    )

    return rows
}

exports.findById = async (id) => {
    const [rows] = await db.query(
        'SELECT id, username, role FROM users WHERE id = ?',
        [id]
    )

    return rows[0]
}

exports.deleteById = async (id) => {
    await db.query(
        'DELETE FROM users WHERE id = ?',
        [id]
    )
}

exports.findByUsername = async (username) => {
    const [rows] = await db.query(
        'SELECT id, username, password, role FROM users WHERE username = ?',
        [username]
    )

    return rows[0]
}

exports.create = async (data) => {
    const { id, username, password, role } = data

    await db.query(
        'INSERT INTO users (id, username, password, role) VALUES (?, ?, ?, ?)',
        [id, username, password, role]
    )
}