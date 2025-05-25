import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = getNumberofRounds();
  return await bcryptjs.hash(password, rounds);
}

function getNumberofRounds() {
  const env = process.env.NODE_ENV;
  if (env === "development") {
    return 1;
  }
  if (env === "production") {
    return 14;
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
