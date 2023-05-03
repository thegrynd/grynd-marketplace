import { NextRequest, NextResponse } from "next/server";
import { parseCookies } from "./helpers/validation";

export async function middleware(req) {
  // let cookie = req.headers.get("authToken");
  // console.log("cookie1", cookie); // => 'fast'

  const { authToken } = parseCookies(req);
  const url = process.env.NEXT_PUBLIC_GRYND_URL;

  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: `token=${authToken}`,
    },
    credentials: "include",
  };

  // const authResponse = await axios.get(`${url}/api/v1/auth/me`, config);
  const authResponse = await (
    await fetch(`${url}/api/v1/auth/me`, config)
  ).json();

  const authUser = authResponse.data;

  // const userIsAuthenticated = true; // TODO: check if user is authenticated

  if (!authToken) {
    const signinUrl = new URL("/vendor/login-user", req.url);
    return NextResponse.redirect(signinUrl);
  } else if (authUser.role !== "admin") {
    const homeUrl = new URL("/", req.url);
    return NextResponse.redirect(homeUrl);
  }

  return NextResponse.next();
}

// Here you can specify all the paths for which this middleware function should run
// Supports both a single string value or an array of matchers
export const config = {
  matcher: ["/admin/:path*"],
};
