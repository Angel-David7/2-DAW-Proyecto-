/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("spaces", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("location").notNullable();
    table.text("description");
    table.integer("capacity").unsigned().notNullable();
    table.decimal("price", 10, 2).notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("spaces");
};
