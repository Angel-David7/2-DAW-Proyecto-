const { Knex } = require("knex");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("notifications", (table) => {
    table.increments("id").primary();

    table
      .integer("reservations_id")
      .unsigned()
      .references("id")
      .inTable("reservations")
      .onDelete("CASCADE");
    table.string("type").notNullable();
    table.timestamp("sent_at").defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("notifications");
};
