/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
        return knex.schema.createTable('locations', function (table) {
        table.increments('id').primary();
        table.float('latitude').notNullable();
        table.float('longitude').notNullable();
        table.timestamps(true, true);
      });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('locations');
};
