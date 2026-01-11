import { getValkeyClient } from "./valkey";

const CONFIG_PREFIX = "cfg:";

export interface ConfigValue {
  [key: string]: string | number | boolean | object;
}

export async function getConfig(key: string): Promise<string | null> {
  const client = await getValkeyClient();
  return client.get(`${CONFIG_PREFIX}${key}`);
}

export async function setConfig(
  key: string,
  value: string | number | boolean | object
): Promise<void> {
  const client = await getValkeyClient();
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  await client.set(`${CONFIG_PREFIX}${key}`, stringValue);
}

export async function getAllConfig(): Promise<Record<string, string>> {
  const client = await getValkeyClient();
  const keys = await client.keys(`${CONFIG_PREFIX}*`);

  const config: Record<string, string> = {};
  for (const key of keys) {
    const value = await client.get(key);
    if (value) {
      config[key.replace(CONFIG_PREFIX, "")] = value;
    }
  }
  return config;
}

export async function deleteConfig(key: string): Promise<void> {
  const client = await getValkeyClient();
  await client.del(`${CONFIG_PREFIX}${key}`);
}

export async function clearAllConfig(): Promise<void> {
  const client = await getValkeyClient();
  const keys = await client.keys(`${CONFIG_PREFIX}*`);
  if (keys.length > 0) {
    await client.del(keys);
  }
}

export async function configExists(): Promise<boolean> {
  const client = await getValkeyClient();
  const keys = await client.keys(`${CONFIG_PREFIX}*`);
  return keys.length > 0;
}

/** TODO: Patreon shit. */
const Config: {
  captcha?: {
    service_api_key?: string;
  };
  theme?: {
    name?: string;
  };
  comments?: {
    allow?: boolean;
    require_approval?: boolean;
    require_auth?: boolean;
    /** This should be checked using Zod schema? */
    auth_providers?: string[];
  };
  view?: {
    show_reading_time?: boolean;
    share_to?: string[];
  };
} = {};
