import { createClient } from "redis";

const client = createClient({
  url: process.env.VALKEY_URL || "redis://localhost:6379",
});

client.on("error", (err) => console.log("Valkey Client Error", err));

export async function getValkeyClient() {
  if (!client.isOpen) {
    await client.connect();
  }

  return client;
}

export async function closeValkey() {
  if (client.isOpen) {
    await client.quit();
  }
}
