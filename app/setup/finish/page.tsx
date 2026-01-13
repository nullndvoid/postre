import { getConfig, setConfig } from "@/app/lib/config";
import { redirect } from "next/navigation";

export default async function Finish() {
  const oldCfg = await getConfig();
  const newCfg = { ...oldCfg, server_configured: true };

  await setConfig(newCfg);

  return redirect("/");
}
