import controller from "infra/controllers";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";
import { createRouter } from "next-connect";

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();
  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConnections = await database.query("SHOW max_connections;");
  const databaseMaxConnectionsValue =
    databaseMaxConnections.rows[0].max_connections;

  const databaseUsedConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1 ;",
    values: [process.env.POSTGRES_DB],
  });
  const databaseUsedConnectionsValue = databaseUsedConnections.rows[0].count;
  
    console.log("\n Error catched in the status API: ");
    console.error(publicErrorObject);

    response.status(500).json(publicErrorObject);
  }
}

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConnectionsValue),
        used_connections: databaseUsedConnectionsValue,
      },
    },
  });
}
