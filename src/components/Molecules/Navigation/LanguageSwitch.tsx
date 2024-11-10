import { getStory } from "@services/storyblok.service";
import { draftMode } from "next/headers";
import DropDown from "./Dropdown";

async function getData(params: any) {
  const { isEnabled } = draftMode();

  if (!params.slug) {
    params.slug = ["home"];
  }
  const slug = [...params.slug];
  const sbSlug = slug.join("/");

  try {
    const data = await getStory(sbSlug, {
      version: isEnabled ? "draft" : "published",
      language: params.locale,
    });

    if (!data) return null;
    return {
      full_slug: data?.default_full_slug,
      slug: data?.slug,
      translated_slugs: data?.translated_slugs,
    };
  } catch (e) {
    console.error(e);

    return null;
  }
}

export default async function LanguageSwitch(params) {
  const data = await getData(params);
  if (!data) return null;

  //const data = {};
  const localeOptions = ["nl", "en", "fr"];

  const options = localeOptions.map((loc) => {
    const lang = loc === "nl" ? "default" : loc;
    let translatedSlug = data?.translated_slugs?.find((slug) => slug.lang === lang)?.path;
    translatedSlug = translatedSlug ? translatedSlug : data?.full_slug;
    translatedSlug = translatedSlug === "home" ? "/" : translatedSlug;
    const url = lang === "default" ? translatedSlug : `${loc}/${translatedSlug}`;

    return {
      label: loc,
      value: url,
    };
  });

  return <DropDown options={options} value={params.locale} />;
}
