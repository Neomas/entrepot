import { NextResponse } from "next/server";

// import i18n from "i18n";
let locales = ["nl", "en", "fr"];
let defaultLocale = "nl";

export async function middleware(request) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  let currentPath = pathname;

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = defaultLocale;

    // remove starting slash from pathname
    const path = pathname.replace(/^\//, "");
    // e.g. incoming request is /products
    // The new URL is now /nl/products
    const newPath = `/${locale}/${path}`;

    currentPath = newPath;

    // rewrite to new URL
    //return NextResponse.rewrite(new URL(newPath, request.url));
  }

  // rewrite currentPath to locale + "pages" + rest of path
  // except is path is exposanten-en-merken, then rewrite to locale + "search" + rest of path(without exposanten-en-merken)
  // e.g. /products -> /nl/products
  // e.g. /en/products -> /en/products
  const locale = currentPath.split("/")[1];
  let path = currentPath.split("/").slice(2).join("/");
  const newPath = `/${locale}/${path}`;

  return NextResponse.rewrite(new URL(newPath, request.url));
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    //"/((?!_next).*)",

    /*
     * Match all request paths except for the ones starting with:
     * - fonts (font files)
     * - editor.html (page builder)
     * - sitemap folder
     * - robots.txt
     * - favicons folder

     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - no files: ending with .json .svg .png .jpg .jpeg .webp .gif .ico .css .js .woff .woff2 .ttf .eot
     */

    "/((?!fonts|editor.html|google|img|sitemap|robots.txt|favicon|api|_next|favicon.ico|\\.svg|.*\\.json|.*\\.svg|.*\\.png|.*\\.jpg|.*\\.jpeg|.*\\.webp|.*\\.gif|.*\\.ico|.*\\.css|.*\\.js|.*\\.woff|.*\\.woff2|.*\\.ttf|.*\\.eot).*)",
  ],
};
