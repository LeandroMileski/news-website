import { describe } from "node:test";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);
      const responseBody = await response.json();
      console.log(responseBody);

      const parsedDate = new Date(responseBody.updated_at);
      expect(parsedDate.toISOString()).toEqual(responseBody.updated_at);

      //expect(responseBody.dependencies.database.version).toEqual("16.8");
      expect(responseBody.dependencies.database.max_connections).toBeDefined();
      expect(responseBody.dependencies.database.used_connections).toBeDefined();
      // expect to be a number
      expect(responseBody.dependencies.database.used_connections).toEqual(
        expect.any(Number),
      );
    });
  });
});
