import { unstable_cache } from "next/cache";

export async function cachedFetch(url, init) {
  // remove the cv parameter from url
  const urlObj = new URL(url);
  urlObj.searchParams.delete("cv");
  url = urlObj.toString();

  // fetch the response
  const encodedUrl = encodeURIComponent(url);
  //const res = await fetch(`${process.env.NEXT_PUBLIC_SB_PROXY}?url=${encodedUrl}`, init);
  //const res = await fetch(url, init);
  //return res;

  // without a cv value SB automatically redirects to an url with a cv value.
  // remove http /  : ? & = . / from url
  const strippedUrl = url.replace(/(http|https|:|\?|&|=|\.|\/)/g, "");

  const res = await unstable_cache(
    async () => {
      const r = await fetch(url, { cache: "no-cache" });
      return r.json();
    },
    [strippedUrl],
    init?.next
  )();
  //console.log("GETTING DATA WITH", init);
  return new Response(JSON.stringify(res));
}
