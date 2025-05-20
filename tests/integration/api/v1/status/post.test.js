import { describe } from "node:test";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});
describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(response.status).toBe(405);

      const responseBody = await response.json();
      console.log(responseBody);
      expect(responseBody).toEqual({
        name: "MethodNotAllowed",
        message: "Method Not Allowed",
        action: "Verify if the request method is allowed",
        status_code: 405,
      });
    });
  });
});
