import { getValkeyClient } from "./valkey";

const CONFIG_KEY = "config";

export type Config = {
  captcha?: {
    service_api_key?: string;
  };
  theme: {
    name: string;
  };
  comments: {
    allow: boolean;
    require_approval?: boolean;
    require_auth?: boolean;
    auth_providers?: AuthProviders[];
  };
  view?: {
    show_reading_time?: boolean;
    share_to?: string[];
  };
  server_configured: boolean;
};

export enum AuthProviders {
  None,
  OAuth,
}

const defaultConfig: Config = {
  server_configured: false,
  comments: {
    allow: false,
    require_approval: false,
    require_auth: false,
    auth_providers: [AuthProviders.None],
  },
  theme: {
    name: "default",
  },
  view: {
    show_reading_time: true,
    share_to: [],
  },
};

export async function getConfig(): Promise<{ cfg: Config; exists: boolean }> {
  const client = await getValkeyClient();
  const raw = await client.get(CONFIG_KEY);

  if (!raw) {
    return { cfg: defaultConfig, exists: false };
  }

  return { cfg: { ...defaultConfig, ...JSON.parse(raw) }, exists: true };
}

export async function setConfig(config: Partial<Config>): Promise<void> {
  const client = await getValkeyClient();
  const current = await getConfig();
  const merged = { ...current, ...config };
  await client.set(CONFIG_KEY, JSON.stringify(merged));
}

export async function setDefaultConfig(): Promise<void> {
  const client = await getValkeyClient();
  await client.set(CONFIG_KEY, JSON.stringify(defaultConfig));
}

export async function resetConfig(): Promise<void> {
  const client = await getValkeyClient();
  await client.del(CONFIG_KEY);
}
