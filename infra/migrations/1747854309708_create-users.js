exports.up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true, //notNull: true -> this is the default for primaryKey
      default: pgm.func("gen_random_uuid()"),
    },
    username: {
      // for reference GitHub uses 39 char max.
      type: "varchar(30)", //We use 30 to be safe
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(255)",
      notNull: true,
      unique: true,
    },
    password: {
      //bcrypt hash output is 60 char long
      type: "varchar(60)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
      notNull: true,
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("timezone('UTC', now())"),
      notNull: true,
    },
  });
};

exports.down = false;
