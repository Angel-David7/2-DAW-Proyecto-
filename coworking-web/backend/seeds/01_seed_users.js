import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();

  const admin = {
    name: "Admin User",
    surname: "Admin",
    email: "admin@greenwork.com",
    password: "greenwork123",
    role: "user",
  };
  await knex("users").insert(admin);

  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push({
      name: faker.person.firstName(),
      surname: faker.person.surname(),
      email: faker.internet.email(),
      password: "1234",
      role: "user",
    });
  }
  await knex("users").insert(users);
};
