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
      //safe length for bcrypt
      type: "varchar(72)",
      notNull: true,
    },
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
  });
};

exports.down = false;
