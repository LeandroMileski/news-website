import database from "infra/database.js";
import { describe } from "node:test";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      await database.query({
        text: "INSERT INTO users (username, email, password, created_at, updated_at) VALUES ($1,$2,$3,$4,$5);",
        values: [
          "leandromileski",
          "leandrotin@gm.com",
          "123456",
          new Date(),
          new Date(),
        ],
      });
      const users = await database.query("SELECT * FROM users;");
      console.log(users.rows);

      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
      });
      expect(response.status).toBe(201);
    });
  });
});
