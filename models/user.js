import database from "infra/database.js";
import password from "models/password.js";
import { ValidationError, NotFoundError } from "infra/errors.js";
import { validate } from "uuid";

async function findOneByUsername(username) {
  const results = await database.query({
    text: `
      SELECT
        *
      FROM
        users
      WHERE
        LOWER(username) = LOWER($1)
      ;`,
    values: [username],
  });
  if (results.rowCount === 0) {
    throw new NotFoundError({
      message: "NotFound error has occurred.",
      action: "Try another resource.",
    });
  }
  return results.rows[0];
}
async function validateUniqueUsername(username) {
  const results = await database.query({
    text: `
        SELECT
          username
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
        ;`,
    values: [username],
  });
  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "This Username is already in use.",
      action: "Try another Username.",
    });
  }
  return results.rows[0];
}
async function validateUniqueEmail(email) {
  const results = await database.query({
    text: `
        SELECT
          email
        FROM
          users
        WHERE
          LOWER(email) = LOWER($1)
        ;`,
    values: [email],
  });
  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "This email is already in use.",
      action: "Try another email.",
    });
  }
  return results.rows[0];
}

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);
  await validateUniqueUsername(userInputValues.username);
  await hashPasswordInObject(userInputValues);

  const newUser = await insertQuery(userInputValues);
  return newUser;

  async function hashPasswordInObject(userInputValues) {
    const hashedPassword = await password.hash(userInputValues.password);
    userInputValues.password = hashedPassword;
    return userInputValues;
  }

  async function insertQuery(userInputValues) {
    const results = await database.query({
      text: `
        INSERT INTO
          users (username, email, password)
        VALUES
          ($1, $2, $3)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });
    return results.rows[0];
  }
}

async function update(username, userInputValues) {
  const currentUser = await findOneByUsername(username);
  if ("username" in userInputValues) {
    await validateUniqueUsername(userInputValues.username);
  }
  if ("email" in userInputValues) {
    await validateUniqueEmail(userInputValues.email);
  }
  const userWithNewValues = { ...currentUser, ...userInputValues };

  const updatedUser = await runUpdateQuery(userWithNewValues);
  return updatedUser;

  async function runUpdateQuery(userWithNewValues) {
    const results = await database.query({
      text: `
      UPDATE
        users
      SET
        email = $2,
        username = $1,
        updated_at = timezone('utc', now())
      WHERE
        id = $3
      RETURNING
        *
      ;`,
      values: [
        userWithNewValues.username,
        userWithNewValues.email,
        currentUser.id,
      ],
    });
    return results.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
  update,
};
export default user;
