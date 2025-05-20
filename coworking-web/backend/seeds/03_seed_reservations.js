import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("reservations").del();
  await knex.raw("ALTER SEQUENCE reservations_id_seq RESTART WITH 1");

  const users = await knex("users").pluck("id");
  const spaces = await knex("spaces").pluck("id");

  if (users.length === 0 || spaces.length === 0) {
    throw new Error("No users or spaces found. Seed users and spaces first.");
  }

  const reservations = [];
  for (let i = 0; i < 20; i++) {
    const userID = faker.helpers.arrayElement(users);
    const spaceID = faker.helpers.arrayElement(spaces);
    const start = faker.date.future();
    const end = new Date(
      start.getTime() + faker.number.int({ min: 1, max: 4 }) * 3600000
    );
    reservations.push({
      user_id: userID,
      space_id: spaceID,
      start_time: start,
      end_time: end,
    });
  }
  await knex("reservations").insert(reservations);
}
