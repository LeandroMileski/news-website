import migrationRunner from "node-pg-migrate";
import { join } from "path";
import database from "infra/database";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  let dbClient;
  try {
    if (!allowedMethods.includes(request.method)) {
      return response.status(405).json({
        error: `Method ${request.method} Not Allowed`,
      });
    }

    dbClient = await database.getNewClient();

    const defaultMigrationOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationOptions);
      //await dbClient.end();
      response.status(200).json(pendingMigrations);
    }
    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationOptions,
        dryRun: false,
      });
      //await dbClient.end();

      if (migratedMigrations.length > 0) {
        return response.status(201).json(migratedMigrations);
      }

      return response.status(200).json(migratedMigrations);
    }
  } catch (error) {
    console.error("Error in migrations API:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
