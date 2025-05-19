export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Unexpected Internal Error Has Occurred", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Please contact the support team.";
    this.statusCode = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
