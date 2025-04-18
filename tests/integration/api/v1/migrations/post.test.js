import database from "infra/database.js";

beforeAll(cleanDatabase);
//explain beforeAll
// beforeAll is a Jest function that runs once before all tests in the file.
// This is useful for setting up a clean state before running tests, such as resetting the database.

async function cleanDatabase() {
  await database.query("drop schema public cascade; create schema public");
}

test("POST /api/v1/migrations should return 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });

  expect(response1.status).toBe(201);

  const response1Body = await response1.json();
  //expect response1Body to be an array
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const response2Body = await response2.json();
  //expect response2Body to be an array
  expect(Array.isArray(response2Body)).toBe(true);
  expect(response2Body.length).toBe(0);
});
