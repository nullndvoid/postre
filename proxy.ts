import { NextRequest, NextResponse } from "next/server";
import { getConfig, setConfig, setDefaultConfig } from "@/app/lib/config";

export default async function proxy(request: NextRequest) {
  const setupComplete = await checkSetup();
  const { pathname } = request.nextUrl;

  if (!setupComplete && !pathname.startsWith("/setup")) {
    return NextResponse.redirect(new URL("/setup", request.url));
  }

  // if (!pathname.startsWith("/login"))
  //   return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

async function checkSetup(): Promise<boolean> {
  const config = await getConfig();

  if (!config.exists || !config.cfg) {
    console.log("Setting default config.");
    await setDefaultConfig();
    return false;
  }

  return config.cfg.server_configured;
}

// Avoid applying middleware to static files.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
