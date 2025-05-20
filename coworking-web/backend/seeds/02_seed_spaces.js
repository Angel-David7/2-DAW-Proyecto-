import { faker } from "@faker-js/faker";
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("spaces").del();
  await knex.raw("ALTER SEQUENCE spaces_id_seq RESTART WITH 1"); // Reinicia el contador de IDs

  const spaces = [];
  for (let i = 0; i < 5; i++) {
    spaces.push({
      name: faker.commerce.productName(),
      location: faker.location.city(),
      description: faker.lorem.sentence(),
      capacity: faker.number.int({ min: 5, max: 50 }),
    });
  }
  await knex("spaces").insert(spaces);
}
