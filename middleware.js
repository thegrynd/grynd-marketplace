import { NextRequest, NextResponse } from "next/server";

export async function middleware(req) {
  const url = process.env.NEXT_PUBLIC_GRYND_URL;

  let authToken = req.cookies.get("authToken");

  const headerConfig = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${authToken}`,
    },
    credentials: "include",
  };

  const authResponse = await fetch(`${url}/api/v1/auth/me`, headerConfig);

  const authUser = await authResponse.json();

  if (
    (!authToken && req.nextUrl.pathname.startsWith("/admin")) ||
    (!authToken && req.nextUrl.pathname.startsWith("/vendor"))
  ) {
    const loginUrl = new URL("/login-user", req.url);
    return NextResponse.redirect(loginUrl);
  } else if (
    authUser.data?.role !== "admin" &&
    req.nextUrl.pathname.startsWith("/admin")
  ) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  if (
    authUser.data?.isSeller === false &&
    req.nextUrl.pathname.startsWith("/vendor")
  ) {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers

// export const config = {
//   matcher: ["/admin/:path*", ],
// };
