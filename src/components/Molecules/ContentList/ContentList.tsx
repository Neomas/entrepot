import { getStories } from "@services/storyblok.service";
import StoryblokLoader from "../StoryblokLoader/StoryblokLoader";

// function that gets content items from storyblok api, based on the content type, filter, and sort, returns x amount of items
export const getData = async (
  contentType: string,
  filter: string,
  amount: number,
  locale: string,
  excludeUid: string = "",
  preview?: boolean
) => {
  const queryOptions = {
    content_type: contentType,
    per_page: amount,
  };
  if (filter) {
    queryOptions["filter_query"] = {
      categories: {
        any_in_array: filter,
      },
    };
  }
  // const { isEnabled } = draftMode();

  const data = getStories({ ...queryOptions });

  // const data = await Storyblok.get(`cdn/stories`, {
  //   // version: isEnabled ? "draft" : "published",
  //   version: preview ? "draft" : "published",
  //   resolve_relations: ["EventPage.categories", "JobPage.categories", "BlogPage.categories"],
  //   resolve_links: "url",
  //   language: locale === "nl" ? "default" : locale,
  //   cv: new Date().getTime(),
  //   ...queryOptions,
  // });

  //await wait(3000);

  //const data = await res.json();
  return data;
};

const ContentList = ({ blok, locale, preview }) => {
  const categories = blok?.contentCategories?.join(",") || "";
  const amount = blok?.contentAmount || 3;
  const contentType = blok?.contentType || "";

  return (
    <div>
      <h3>
        {blok?.title}
        {contentType}
      </h3>
      <StoryblokLoader
        preview={preview}
        getData={async () => {
          // load and return data from storyblok
          const data = await getData(contentType, categories, amount, locale, blok?._uid, preview);
          return data;
        }}>
        <ContentListData locale={locale} />
      </StoryblokLoader>
    </div>
  );
};

type ContentListDataProps = {
  data?: any;
  locale: string;
};
const ContentListData = ({ data, locale }: ContentListDataProps) => {
  return (
    <div>
      {data?.map((item) => (
        <div key={item._uid}>
          <div>
            <h4>--{item?.content?.title}</h4>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;
