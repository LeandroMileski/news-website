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

describe("GET /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      await orchestrator.createUser({
        username: "MesmoCase",
        email: "mesmo.case@gmail.com",
        password: "123456",
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/MesmoCase",
      );
      expect(response2.status).toBe(200);

      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: expect.any(String),
        username: "MesmoCase",
        email: "mesmo.case@gmail.com",
        password: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    test("With case mismatch", async () => {
      await orchestrator.createUser({
        username: "DifferentCase",
        email: "diff.case@gmail.com",
        password: "123456",
      });

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/differentcase",
      );
      expect(response2.status).toBe(200);
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: expect.any(String),
        username: response2Body.username,
        email: response2Body.email,
        password: expect.any(String),
        created_at: expect.any(String),
        updated_at: expect.any(String),
      });
    });

    test("With no existent user", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/NonExistentUser",
      );
      expect(response.status).toBe(404);
      const responseBody = await response.json();
      expect(responseBody).toEqual({
        message: "NotFound error has occurred.",
        action: "Try another resource.",
        name: "NotFoundError",
        status_code: 404,
      });
    });
  });
});
