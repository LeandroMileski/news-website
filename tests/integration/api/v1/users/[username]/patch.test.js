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

describe("PATCH /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With no existent 'username'", async () => {
      const response = await fetch(
        "http://localhost:3000/api/v1/users/nonexistentuser",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "rec@email.com",
          }),
        },
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
    test("With duplicated 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user1",
          email: "user1@email.com",
          password: "123456",
        }),
      });
      expect(response1.status).toBe(201);
      const responseBody = await response1.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "user1",
        email: "user1@email.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user2",
          email: "user2@email.com",
          password: "123456",
        }),
      });
      expect(response2.status).toBe(201);
      const response2Body = await response2.json();
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "user2",
        email: "user2@email.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });

      const response3 = await fetch(
        "http://localhost:3000/api/v1/users/user2",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "user1",
          }),
        },
      );
      expect(response3.status).toBe(400);
      const response3Body = await response3.json();
      expect(response3Body).toEqual({
        message: "This Username is already in use.",
        action: "Try another Username.",
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("With duplicated 'email'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "useremail1",
          email: "teste@email.com",
          password: "123456",
        }),
      });
      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "useremail2",
          email: "teste@email2.com",
          password: "123456",
        }),
      });
      expect(response2.status).toBe(201);

      const response3 = await fetch(
        "http://localhost:3000/api/v1/users/user2",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "teste@email.com",
          }),
        },
      );
      expect(response3.status).toBe(400);
      const response3Body = await response3.json();
      expect(response3Body).toEqual({
        message: "This email is already in use.",
        action: "Try another email.",
        name: "ValidationError",
        status_code: 400,
      });
    });

    test("With unique 'username'", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "u1",
          email: "u1@email.com",
          password: "123456",
        }),
      });

      expect(response1.status).toBe(201);
      const responseBody = await response1.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "u1",
        email: "u1@email.com",
        password: responseBody.password,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });
      const response2 = await fetch("http://localhost:3000/api/v1/users/u1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "u2",
          email: "u3@gmail.com",
        }),
      });
      expect(response2.status).toBe(200);
      const response2Body = await response2.json();
      console.log("NOVO TESTE\n*\n*\n*\n*\n*\n*\n*");
      expect(response2Body).toEqual({
        id: response2Body.id,
        username: "u2",
        email: "u3@gmail.com",
        password: response2Body.password,
        created_at: response2Body.created_at,
        updated_at: response2Body.updated_at,
      });
    });
  });
});
