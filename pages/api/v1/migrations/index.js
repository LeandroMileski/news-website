import migrationRunner from "node-pg-migrate";
import { createRouter } from "next-connect";
import controller from "infra/controllers";
import database from "infra/database";
import { resolve } from "path";

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

const defaultMigrationOptions = {
  dbClient: null,
  dryRun: true,
  dir: resolve("infra", "migrations"),
  direction: "up",
  verbose: true,
  migrationsTable: "pgmigrations",
};

async function getHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const pendingMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
    });
    //await dbClient.end();
    response.status(200).json(pendingMigrations);
  } catch (error) {
    console.error("Error in migrations API:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}

async function postHandler(request, response) {
  let dbClient;
  try {
    dbClient = await database.getNewClient();
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });
    //await dbClient.end();
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }
    return response.status(200).json(migratedMigrations);
  } catch (error) {
    console.error("Error in migrations API:", error);
    return response.status(500).json({ error: "Internal Server Error" });
  } finally {
    if (dbClient) {
      await dbClient.end();
    }
  }
}
