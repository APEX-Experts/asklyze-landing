import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";
const cookieName = "NEXT_LOCALE"; // Standard convention

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
    // 1. Check if the user has a saved language preference
    const cookieLocale = request.cookies.get(cookieName)?.value;

    // 2. Validate the cookie (ensure it's actually 'en' or 'ar')
    const preferredLocale = locales.includes(cookieLocale as string)
      ? cookieLocale
      : defaultLocale;

    let newPathname =
      pathname === "/" ? `/${preferredLocale}` : `/${preferredLocale}${pathname}`;

    newPathname = newPathname.replace(/\/+$/, "") || "/";

    return NextResponse.redirect(
      new URL(newPathname, request.url),
      302 
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|admin|favicon.ico).*)"],
};