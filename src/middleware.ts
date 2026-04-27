import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const locales = ["en", "ar"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));

  const languages = new Negotiator({ headers }).languages();

  if (languages.includes("*")) return defaultLocale;

  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip non-page routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
  pathname.startsWith("/static") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if locale is missing
  const isMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (isMissingLocale) {
    const locale = getLocale(request);

    let newPathname =
      pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;

    // Prevent trailing slash issues
    newPathname = newPathname.replace(/\/+$/, "") || "/";

    const response = NextResponse.redirect(
      new URL(newPathname, request.url),
      308
    );

    // Critical for correct caching behavior
    response.headers.set("Vary", "Accept-Language");

    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico).*)"],
};