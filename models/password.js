import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberofRounds();
  return await bcryptjs.hash(password, rounds);
}

function getNumberofRounds() {
  const env = process.env.NODE_ENV;
  switch (env) {
    case "development":
      return 1;
    case "test":
      return 1;
    case "production":
      return 14;
    default:
      return 10; // Safe default for unknown environments
  }
}

async function compare(providedPassword, storedPassword) {
  return await bcryptjs.compare(providedPassword, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;
