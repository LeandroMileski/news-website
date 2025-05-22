import { time } from "console";
import database from "infra/database.js";
import { describe } from "node:test";
import orchestrator from "tests/orchestrator";
import { version as uuidVersion } from "uuid";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/v1/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const users = await database.query("SELECT * FROM users;");

      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado",
          email: "email@duplicado.com",
          password: "123456",
        }),
      });
      expect(response1.status).toBe(201);
      const responseBody = await response1.json();
      console.log(responseBody);
      expect(responseBody).toEqual({
        id: expect.any(String),
        username: "emailduplicado",
        email: "email@duplicado.com",
        password: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    test("With duplicated 'email'", async () => {
      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "emailduplicado",
          email: "Email@duplicado.com",
          password: "123456",
        }),
      });
      expect(response2.status).toBe(400);

      const response2Body = await response2.json();

      expect(response2Body).toEqual({
        message: "This email is already in use.",
        action: "Try another email.",
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("With duplicated 'Username'", async () => {
      const response3 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "Emailduplicado",
          email: "email@unico.com",
          password: "123456",
        }),
      });
      expect(response3.status).toBe(400);

      const response3Body = await response3.json();

      expect(response3Body).toEqual({
        message: "This Username is already in use.",
        action: "Try another Username.",
        name: "ValidationError",
        status_code: 400,
      });
    });
  });
});
