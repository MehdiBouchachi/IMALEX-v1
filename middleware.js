/* import { NextResponse } from "next/server";

export function middleware(request) {
  return NextResponse.redirect(new URL("/about", request.url));
}
 */ // hadi hna khedma ta3 middleware bla nextauthMiddleware

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config = {
  matcher: ["/account"],
};
