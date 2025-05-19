import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("notifications").del();
  await knex.raw("ALTER SEQUENCE notifications_id_seq RESTART WITH 1"); // Solo si usas PostgreSQL

  const reservationIds = await knex("reservations").pluck("id");
  const notifications = reservationIds.slice(0, 10).map((resId) => ({
    reservation_id: resId, // usa el nombre real de tu columna
    type: "email_confirmation",
  }));

  await knex("notifications").insert(notifications);
}
