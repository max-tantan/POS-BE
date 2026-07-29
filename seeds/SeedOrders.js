/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

  const crypto = require('crypto');

exports.seed = async function(knex) {
  // Menghapus seluruh data order yang ada sebelumnya
  await knex('orders').del();

  // Mengambil data produk dari tabel produk untuk mendapatkan id dan harganya
  const produkList = await knex('produk').select('id', 'harga_produk');

  if (produkList.length === 0) {
    console.log('Tabel produk masih kosong! Silahkan jalankan SeedProduk dahulu.');
    return;
  }

  // buat data pesanan tiruan
  const orders = [
    {
      id: crypto.randomUUID(),
      nama_pelanggan: 'Ali Al Haly',
      produk_id: produkList[0].id,
      jumlah: 3,
      total_harga: produkList[0].harga_produk * 3,
      status_pesanan: 'Proses'
    },
    {
      id: crypto.randomUUID(),
      nama_pelanggan: 'Fatan Nur Rizqi',
      produk_id: produkList[1] ? produkList[1].id : produkList[0].id,
      jumlah: 5,
      total_harga: produkList[0].harga_produk * 5,
      status_pesanan: 'Proses'
    },
    {
      id: crypto.randomUUID(),
      nama_pelanggan: 'Sadil Samuel',
      produk_id: produkList[2] ? produkList[2].id : produkList[0].id,
      jumlah: 4,
      total_harga: produkList[0].harga_produk * 4,
      status_pesanan: 'Proses'
    },
  ]

  await knex('orders').insert(orders);
  console.log('Berhasil menambahkan data orders ke database!');
};
