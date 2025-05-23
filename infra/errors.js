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

export class NotFoundError extends Error {
  constructor({ message, cause, action }) {
    super(message || "NotFound error has occurred.", {
      cause,
    });
    this.name = "NotFoundError";
    this.action = action || "Try another resource";
    this.statusCode = 404;
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

export class ValidationError extends Error {
  constructor({ message, cause, action }) {
    super(message || "Validation error has occurred.", {
      cause,
    });
    this.name = "ValidationError";
    this.action = action || "Adjust the request data and try again";
    this.statusCode = 400;
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
