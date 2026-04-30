/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

const crypto = require('crypto');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('produk').del()
  await knex('produk').insert([
  {
    id: crypto.randomUUID(), 
    nama_produk: 'Ayam Geprek',
    harga_produk: 10000,
    jenis_produk: 'Makanan',
    foto_produk: null
  },
  {
    id: crypto.randomUUID(), 
    nama_produk: 'Susu Coklat',
    harga_produk: 5000,
    jenis_produk: 'Minuman',
    foto_produk: null
  },
  {
    id: crypto.randomUUID(), 
    nama_produk: 'Batagor',
    harga_produk: 5000,
    jenis_produk: 'Makanan',
    foto_produk: null
  }
  ]);
};
