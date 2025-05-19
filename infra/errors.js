class InternalServerError extends Error {
  constructor({ cause }) {
    super("Unexpected Internal Error Has Occurred");
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}
