import { draftMode } from "next/headers";
import DynamicComponent from "../../../components/DynamicComponent";

import { Metadata } from "next";
//import simpleTextResolver from "@lib/simpleTextResolver";

import { getLinks, getStory } from "@services/storyblok.service";
import StoryblokBridge from "@components/StoryblokBridge";
import { notFound } from "next/navigation";

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
    if (!data) notFound();
    return data;
  } catch (e) {
    console.error(e);
    notFound();
    return null;
  }
}

export default async function Page({ params }) {
  const { isEnabled } = draftMode();
  const data = await getData(params);

  return (
    <>
      {isEnabled ? (
        <StoryblokBridge
          blok={data?.content}
          data={data}
          locale={params.locale}
          key={data?.uuid}
          storyId={`${data?.id}`}
        />
      ) : (
        <DynamicComponent
          blok={data?.content}
          data={data}
          preview={isEnabled}
          locale={params.locale}
          key={data?.uuid}
          storyId={`${data?.id}`}
        />
      )}
    </>
  );
}

export async function generateMetadata({ params }): Promise<Metadata> {
  const data = await getData(params);

  const image = data?.content?.metadata?.og_image || data?.content?.image?.filename || "";
  const title =
    data?.content?.metadata?.og_title ||
    data?.content?.metadata?.title ||
    data?.content?.title ||
    data?.name ||
    "geen titel";

  const sbSlug = params.slug.join("/");
  let canonicalurl =
    sbSlug === "home"
      ? `${process.env.SITE_URL}/${params.locale}`
      : `${process.env.SITE_URL}/${params.locale}/${sbSlug}`;

  return {
    title: title,
    description: data?.content?.metadata?.description,
    openGraph: {
      title: data?.content?.metadata?.og_title,
      description: data?.content?.metadata?.og_description,
      url: data?.content?.metadata?.og_url,

      images: [
        {
          url: `/api/og-image/?title=${title}${image && `&image=${image}`}`,
        },
      ],
    },
    twitter: {
      title: data?.content?.metadata?.twitter_title,
      description: data?.content?.metadata?.twitter_description,
      images: [
        {
          url: `/api/og-image/?title=${title}${image && `&image=${image}`}`,
        },
      ],
      card: "summary_large_image",
    },

    alternates: {
      canonical: canonicalurl,
    },
  };
}

// ssg not supported yet by next-intl :
// https://next-intl-docs.vercel.app/docs/next-13/server-components#roadmap
export async function generateStaticParams() {
  const { data } = await getLinks();

  // loop all in object data.links
  const urls: { locale: string; slug: string }[] = [];

  Object.values(data.links).forEach((link: any) => {
    // exclude from build at deploy time
    if (link.is_folder || link.slug?.includes("settings")) return;

    if (link.slug === "home") {
      urls.push({
        locale: "fr",
        slug: ``,
      });
      urls.push({
        locale: "nl",
        slug: ``,
      });
      urls.push({
        locale: "en",
        slug: ``,
      });
    }

    link?.alternates?.forEach((alternate) => {
      urls.push({
        locale: alternate.lang,
        slug: `${alternate.path}`,
      });
    });
    urls.push({
      locale: "",
      slug: `${link.slug}`,
    });
  });

  const links = urls.map((url) => ({
    slug: [...url.slug.split("/")],
    locale: url.locale || "nl",
  }));

  return links;
}
