import { NextRequest, NextResponse } from "next/server";

export default function proxy(request: NextRequest) {
  // TODO: Check DB.
  //   const isSetupComplete = process.env.SETUP_COMPLETE === "true";
  const { pathname } = request.nextUrl;

  //   if (!isSetupComplete && !pathname.startsWith("/setup")) {
  //     return NextResponse.redirect(new URL("/setup", request.url));
  //   }
  // if (!pathname.startsWith("/login"))
  //   return NextResponse.redirect(new URL("/login", request.url));

  return NextResponse.next();
}

// Avoid applying middleware to static files.
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
