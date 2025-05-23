exports.up = (knex) =>
  knex.schema.alterTable("users", (table) => {
    table.boolean("validated").notNullable().defaultTo(false);
  });

exports.down = (knex) =>
  knex.schema.alterTable("users", (table) => {
    table.dropColumn("validated");
  });
