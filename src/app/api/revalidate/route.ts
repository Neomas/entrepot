export const dynamic = "force-dynamic";
export const maxDuration = 300;

import Bottleneck from "bottleneck";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest } from "next/server";
const crypto = require("crypto");
const StoryblokClient = require("storyblok-js-client");

const Storyblok = new StoryblokClient({
  accessToken: process.env.SB_ACCESS_TOKEN,
  oauthToken: process.env.SB_OAUTH_TOKEN,
});

export async function POST(request: NextRequest) {
  // Check the secret and next parameters
  // This secret should only be known to this API route and the CMS
  const headerinfo = headers();
  const body = await request.json();

  // let secretHmac = crypto
  //   .createHmac("sha1", process.env.BUILD_SECRET)
  //   .update(JSON.stringify(body))
  //   .digest("hex");

  // if (headerinfo.get("webhook-signature") !== secretHmac) {
  //   // return new Response(`Invalid token ${JSON.stringify(body)}`, {
  //   //   status: 401,
  //   // });
  // }

  if (body.action === "published" || body.action === "unpublished") {
    let message = "";
    // if settings are changed revalidate all pages
    const storyTag = body?.full_slug?.replace("/", "");
    revalidateTag(storyTag);

    message = `${body.action} on ${body.full_slug} => rebuild(${storyTag})`;
    console.log(message);

    return new Response(message, {
      status: 200,
    });
  }

  return new Response(`Ok`, {
    status: 200,
  });
}
