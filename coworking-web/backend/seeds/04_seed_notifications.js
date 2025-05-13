import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("notifications").del();

  const reservationIds = await knex("reservations").pluck("id");
  const notifications = reservationIds.slice(0, 10).map((resId) => ({
    reservations_id: resId,
    type: "email_confirmation",
  }));

  await knex("notifications").insert(notifications);
};
