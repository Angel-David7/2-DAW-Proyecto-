import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("spaces").del();

  const spaces = [];
  for (let i = 0; i < 5; i++) {
    spaces.push({
      name: faker.commerce.productName(),
      location: faker.location.city(),
      description: faker.lorem.sentence(),
      capacity: faker.datatype.number({ min: 5, max: 50 }),
    });
  }
  await knex("spaces").insert(spaces);
};