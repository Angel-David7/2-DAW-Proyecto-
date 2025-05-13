import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("reservations").del();

  const users = await knex("users").pluck("id");
  const spaces = await knex("spaces").pluck("id");

  for (let i = 0; i < 20; i++) {
    const userID = faker.random.arrayElement(users);
    const spaceID = faker.random.arrayElement(spaces);
    const start = faker.date.future();
    const end = new Date(
      start.getTime() + faker.datatype.number({ min: 1, max: 4 }) * 3600000
    );
    reservations.push({
      name: faker.commerce.productName(),
      location: faker.location.city(),
      description: faker.lorem.sentence(),
      capacity: faker.datatype.number({ min: 5, max: 50 }),
    });
  }
  await knex("reservations").insert(reservations);
};
