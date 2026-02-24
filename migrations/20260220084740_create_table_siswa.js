exports.up = function(knex) {
    return knex.schema.createTableIfNotExists('siswa', function(table) {
        table.string('kode_kelas').nullable()
        table.uuid('id').primary()
        table.string('nama').nullable()
        table.string('nis',30).nullable()
        table.timestamps(true, true)
        table.timestamp("deleted_at")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('siswa')
};
