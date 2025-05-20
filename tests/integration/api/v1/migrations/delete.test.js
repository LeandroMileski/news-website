const { request } = require("http");

describe("DELETE /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "DELETE",
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
