exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('kelas', function(table) {
        table.string('kode_kelas').primary()
        table.string('nama_kelas').notNullable()
        table.timestamps(true, true)
        table.timestamp("deleted_at")
    })

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('kelas')

};
