//eslint-disable-next-line
const dotenv = require("dotenv");
//eslint-disable-next-line
const fs = require("fs");
//eslint-disable-next-line
const path = require("path");

try {
  const envPath = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
  const envConfig = dotenv.parse(
    fs.readFileSync(path.join(__dirname, envPath))
  );

  for (const config in envConfig) {
    process.env[config] = envConfig[config];
  }
} 
//eslint-disable-next-line no-empty
catch (err) {}

module.exports = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrationsTableName: "migrations",
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
    entitiesDir: "dist/entities/*.js",
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
