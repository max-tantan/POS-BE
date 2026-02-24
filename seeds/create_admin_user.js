  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  const {hash} = require("bcrypt");

  exports.seed = async function (knex) {
    const hashedPassword = await hash('1', 10)
    await knex('users').insert([
      {
        id: "10000000-0000-0000-0000-000000000001",
        username: 'admin',
        password: hashedPassword,
        role: 'admin'
      }
    ])
  };
