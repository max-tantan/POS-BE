/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
*/


exports.up = function(knex) {
    return knex.schema.createTable('produk', function(table) {
        table.string('id', 50).primary();
        table.string('nama_produk', 255).notNullable();
        table.integer('harga_produk').notNullable();
        table.string('jenis_produk', 100).notNullable();
        table.string('foto_produk', 255);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.specificType('deleted_at', 'datetime').defaultTo('0000-00-00 00:00:00');
    })
}


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
