test("GET /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data).toEqual({ desc: "são acima da media" });
});
