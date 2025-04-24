const { execSync } = require("child_process");
const path = require("path");

// Handle SIGINT on Windows
if (process.platform === "win32") {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("SIGINT", () => {
    stopServices();
  });
}

function stopServices() {
  try {
    console.log("Stopping services...");
    const composePath = path.resolve(__dirname, "../compose.yaml");
    execSync(`docker compose -f "${composePath}" stop`, { stdio: "inherit" });
    console.log("Services stopped successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error stopping services:", error.message);
    process.exit(1);
  }
}

// Handle SIGINT (CTRL+C)
process.on("SIGINT", stopServices);

// Handle SIGTERM
process.on("SIGTERM", stopServices);

// Keep the process running
setInterval(() => {}, 1000);
