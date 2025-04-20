import retry from "async-retry";

async function waitForAllServices() {
  await waitForWebservice();

  async function waitForWebservice() {
    return retry(fetchStatusPage, {
      retries: 10,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
    }
  }
}

export default {
  waitForAllServices,
};
