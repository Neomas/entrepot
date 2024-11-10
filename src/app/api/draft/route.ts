import { draftMode } from "next/headers";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug");

  // Check the secret and next parameters
  // This secret should only be known to this route handler and the CMS
  if (secret !== process.env.SB_PREVIEW_SECRET || !slug) {
    return new Response("Invalid token", { status: 401 });
  }

  if (slug.includes("settings")) {
    return new Response("Settings page", { status: 401 });
  }

  const sbLink = slug;

  // Enable Draft Mode by setting the cookie
  draftMode().enable();

  // Redirect to the path from the fetched post  
  return new Response(null, {
    status: 307,
    headers: {
      Location: "/" + sbLink,
    },
  });
}