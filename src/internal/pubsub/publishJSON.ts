import type { ConfirmChannel } from "amqplib";

function publishJSON<T>(
  ch: ConfirmChannel,
  exchange: string,
  routingKey: string,
  value: T,
): Promise<void> {
  const jsonBytes = Buffer.from(JSON.stringify(value));
  return new Promise((resolve, reject) => {
    try {
      ch.publish(exchange, routingKey, jsonBytes, {
        contentType: "application/json",
      });
      resolve();
    } catch (err) {
      reject(err);
    }
  });
}

export { publishJSON };
