import { draftMode } from "next/headers";

export async function GET(request: Request) {  
  // Enable Draft Mode by setting the cookie
  draftMode().disable();

  // Redirect to the path from the fetched post
    return new Response(null, {
    status: 307,
    headers: {
      Location: "/",
    },
  });
}