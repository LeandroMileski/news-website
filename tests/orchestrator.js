import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebservice();

  async function waitForWebservice() {
    return retry(fetchStatusPage, {
      retries: 10,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw new Error(`Status page not ready, got ${response.status}`);
      }
    }
  }
}

async function clearDatabase() {
  await database.query(
    "drop schema if exists public cascade; create schema public;",
  );
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
};

export default {
  waitForAllServices,
  clearDatabase,
};
