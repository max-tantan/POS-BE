/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


exports.up = function(knex) {
    return knex.schema.createTable('orders', function(table) {
        // ID order1
        table.string('id', 50).primary();
        // ID Pelanggan
        table.string('nama_pelanggan', 255).notNullable();
        // Menu dengan cara sambungkan ke ID dari tabel produk
        table.string('produk_id', 50).notNullable()
            .references('id').inTable('produk');
        // Jumlah pesanan
        table.integer('jumlah').notNullable();
        // Total harga
        table.integer('total_harga').notNullable();
        // Status Pesanan (misalnya: 'Proses', 'Kirim', 'Selesai', 'Dibatalkan')
        table.enum('status_pesanan', ['Proses', 'Kirim', 'Selesai', 'Dibatalkan']).defaultTo('Proses');

        // Waktu pesanan
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.specificType('deleted_at', 'datetime').defaultTo('0000-00-00 00:00:00');1
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('orders');
};
