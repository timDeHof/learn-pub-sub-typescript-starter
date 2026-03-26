import amqp from "amqplib";

async function main() {
  const rabbitConnString = "amqp://guest:guest@localhost:5672/";
  const connection = await amqp.connect(rabbitConnString);
  console.log("Starting Peril server...");
  // Wait for a signal
  process.on("SIGINT", async () => {
    console.log("Shutting down Peril server...");
    await connection.close();
    process.exit(0);
  });
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
