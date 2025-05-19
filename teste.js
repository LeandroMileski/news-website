class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

function saveUser(input) {
  if (!input) {
    throw new ReferenceError("Necessary to send 'input'");
    return;
  }

  if (input.name == undefined) {
    throw new ValidationError("Input your name");
    return;
  }

  if (input.username == undefined) {
    throw new ValidationError("Input your username");
    return;
  }

  if (input.age == undefined) {
    throw new ValidationError("Input your age");
    return;
  }
}

try {
  saveUser({});
} catch (error) {
  if (error instanceof ReferenceError) {
    throw error;
  }

  if (error instanceof ValidationError) {
    console.log(error);
    return;
  }

  console.log("Unknown error:");
  console.log(error.stack);
}
