
exports.seed = async function (knex) {
  await knex('siswa').insert([
    { kode_kelas: "X-PPLG-1", id: '10000000-0000-0000-0000-000000000001',nama:"siswa 1"},
    { kode_kelas: "X-PPLG-1", id: '10000000-0000-0000-0000-000000000002',nama:"siswa 2"},
    { kode_kelas: "X-PPLG-1", id: '10000000-0000-0000-0000-000000000003',nama:"siswa 3"},
  ])
};
