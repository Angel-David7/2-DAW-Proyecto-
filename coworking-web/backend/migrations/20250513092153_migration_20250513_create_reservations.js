/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("reservations", (table) => {
    table.increments("id").primary();
    table
      .integer("user_id")
      .unsigned()
      .references("id")
      .inTable("spaces")
      .onDelete("CASCADE");

    table
      .integer("space_id")
      .unsigned()
      .references("id")
      .inTable("spaces")
      .onDelete("CASCADE");
    table.timestamp("start_time").notNullable();
    table.timestamp("end_time").notNullable();
    table
      .enu("status", ["pending", "confirmed", "cancelled"])
      .defaultTo("pending");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.index(["space_id", "start_time", "end_time"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("reservations");
};
