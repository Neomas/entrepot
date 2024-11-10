import { ISbStoriesParams } from "@storyblok/react";
import { cache } from "react";
import StoryblokClient from "storyblok-js-client";
import { cachedFetch } from "./cachedFetch";
//import resolve_relations from "../storyblok.config.js";

const getStoryBlokClient = () => {
  let Storyblok = new StoryblokClient({
    accessToken: process.env.SB_ACCESS_TOKEN,
    cache: {
      clear: "auto",
      type: "memory",
    },

    fetch: cachedFetch,

    responseInterceptor: (response) => {
      if (response.status === 404) {
        console.error("StoryblokClient failed 404", response);
      }
      //console.error("response status", response);
      // return the response
      return response;
    },
  });

  return Storyblok;
};

export const getStory = cache(async (id: string, params: ISbStoriesParams) => {
  const { version = "published", language = "default" } = params;
  const Storyblok = getStoryBlokClient();
  try {
    const url = `cdn/stories/${id}`;

    const story = await Storyblok.get(
      url,
      {
        version: "draft", //version,
        cv: new Date().getTime(),
        language: language,
      },
      {
        next: {
          revalidate: false,
          tags: ["stories", id.replace("/", "")],
        },
      }
    );

    return story.data.story;
  } catch (e) {
    console.error(e);
    return null;
  }
});

export const getStories = cache(async (params: ISbStoriesParams) => {
  const { version = "published", language = "default", ...filters } = params;
  const Storyblok = getStoryBlokClient();
  const stories = await Storyblok.get(
    "cdn/stories",
    {
      version: "draft", //version,
      //cv: new Date().getTime(),
      language: language,
      ...filters,
    },
    { next: { revalidate: false, tags: ["stories", "list"] } }
  );

  const slugs = stories.data.stories.map((story) => story.full_slug);
  // await all separate stories
  const storyPromises = slugs.map((slug) => getStory(slug, params));
  const storyData = await Promise.all(storyPromises);

  return storyData;
});

export async function getLinks() {
  const Storyblok = getStoryBlokClient();
  const links = Storyblok.get("cdn/links", {
    version: "published",
    cv: Date.now(),
  });

  return links;
}
