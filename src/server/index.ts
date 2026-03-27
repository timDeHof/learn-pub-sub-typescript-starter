import amqp from "amqplib";
import type { PlayingState } from "../internal/gamelogic/gamestate.js";
import { publishJSON } from "../internal/pubsub/publishJSON.js";
import { ExchangePerilDirect, PauseKey } from "../internal/routing/routing.js";

async function main() {
  const rabbitConnString = "amqp://guest:guest@localhost:5672/";
  const connection = await amqp.connect(rabbitConnString);
  console.log("Starting Peril server...");
  const confirmChannel = await connection.createConfirmChannel();

  // Publish a pause message
  const pauseState: PlayingState = { isPaused: true };
  await publishJSON(confirmChannel, ExchangePerilDirect, PauseKey, pauseState);

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
