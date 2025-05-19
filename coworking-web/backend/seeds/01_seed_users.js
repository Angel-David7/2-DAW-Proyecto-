import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("users").del();
  await knex.raw("ALTER SEQUENCE users_id_seq RESTART WITH 1"); // Reinicia el contador

  const admin = {
    name: "Admin User",
    surname: "Admin",
    email: "admin@greenwork.com",
    password: "greenwork123",
    role: "user",
  };

  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.firstName(),
      surname: faker.person.lastName(),
      email: faker.internet.email(),
      password: "1234",
      role: "user",
    });
  }

  await knex("users").insert([admin, ...users]);
}
