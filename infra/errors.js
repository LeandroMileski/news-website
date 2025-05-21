export class InternalServerError extends Error {
  constructor({ cause, statusCode }) {
    super("Unexpected Internal Error Has Occurred", cause);
    this.name = "InternalServerError";
    this.action = "Contact the system administrator";
    this.statusCode = statusCode || 500;
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

export class ServiceError extends Error {
  constructor({ message, cause }) {
    super(message || "Service Is Unavailable", {
      cause,
    });
    this.name = "ServiceError";
    this.action = "Try again later";
    this.statusCode = 503;
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

export class MethodNotAllowedError extends Error {
  constructor() {
    super("Method Not Allowed");
    this.name = "MethodNotAllowed";
    this.action = "Verify if the request method is allowed";
    this.statusCode = 405;
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
