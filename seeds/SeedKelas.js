
exports.seed = async function (knex) {
  await knex('kelas').insert([
    { kode_kelas: "X-PPLG-1", nama_kelas: 'X PPLG 1',},
    { kode_kelas: "X-PPLG-2", nama_kelas: 'X PPLG 2',},
    { kode_kelas: "X-PPLG-3", nama_kelas: 'X PPLG 3',},
    { kode_kelas: "XI-PPLG-1", nama_kelas: 'XI PPLG 1',},
    { kode_kelas: "XI-PPLG-2", nama_kelas: 'XI PPLG 2',},
    { kode_kelas: "XI-PPLG-3", nama_kelas: 'XI PPLG 3',},
    { kode_kelas: "XII-PPLG-1", nama_kelas: 'XII PPLG 1',},
    { kode_kelas: "XII-PPLG-2", nama_kelas: 'XII PPLG 2',},
    { kode_kelas: "XII-PPLG-3", nama_kelas: 'XII PPLG 3',},
  ])
};
