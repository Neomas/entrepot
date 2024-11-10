export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  // Parse query string parameters
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (url) {
    const decodedUrl = decodeURIComponent(url);
    const result = await fetch(decodedUrl, { cache: "no-store" });
    console.log("PROXY GET", url);
    // return the json response
    const response = new Response(JSON.stringify(await result.json()), {
      status: result.status,
      statusText: result.statusText,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
      },
    });

    return response;
  }
}
