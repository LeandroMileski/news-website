class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu.");
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}
