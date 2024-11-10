import { StoryblokStory } from "storyblok-generate-ts";

export type MultilinkStoryblok =
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface BrandblockStoryblok {
  title?: string;
  brands?: BrandcomponentStoryblok[];
  buttontext?: string;
  buttonlink?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "Brandblock";
  [k: string]: any;
}

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface BrandcomponentStoryblok {
  image?: AssetStoryblok;
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "Brandcomponent";
  [k: string]: any;
}

export interface CategoryHeaderStoryblok {
  title?: string;
  icon?: "" | "baby" | "fashion" | "home" | "retail" | "sports";
  _uid: string;
  component: "CategoryHeader";
  [k: string]: any;
}

export interface CategoryLabelsStoryblok {
  title?: string;
  category?: (StoryblokStory<CategoryPageStoryblok> | string)[];
  _uid: string;
  component: "CategoryLabels";
  [k: string]: any;
}

export interface CategoryLinkStoryblok {
  Icon: IconStoryblok[];
  Theme: string;
  link: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "CategoryLink";
  [k: string]: any;
}

export interface CategoryPageStoryblok {
  metadata?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  title?: string;
  icon?: "" | "baby" | "fashion" | "home" | "retail" | "sports";
  body?: (
    | BrandblockStoryblok
    | BrandcomponentStoryblok
    | CategoryHeaderStoryblok
    | CategoryLabelsStoryblok
    | CategoryLinkStoryblok
    | CategoryPageStoryblok
    | DetailheaderStoryblok
    | DetailPageStoryblok
    | FeatureStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | IconStoryblok
    | LabelStoryblok
    | LandingStoryblok
    | ListStoryblok
    | ListItemStoryblok
    | NewsletterStoryblok
    | PageStoryblok
    | PopularCategoriesStoryblok
    | PostStoryblok
    | PostHeaderStoryblok
    | PostHeaderCopyStoryblok
    | ProductStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TeaserStoryblok
    | TextContentStoryblok
    | TextMediaBlockStoryblok
    | ThemeStoryblok
  )[];
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "CategoryPage";
  [k: string]: any;
}

export interface DetailheaderStoryblok {
  title?: string;
  image?: AssetStoryblok;
  label?: LabelStoryblok[];
  date?: string;
  author?: string;
  _uid: string;
  component: "detailheader";
  [k: string]: any;
}

export interface DetailPageStoryblok {
  title?: string;
  category?: LabelStoryblok[];
  image?: AssetStoryblok;
  date?: string;
  author?: string;
  body?: (
    | BrandblockStoryblok
    | BrandcomponentStoryblok
    | CategoryHeaderStoryblok
    | CategoryLabelsStoryblok
    | CategoryLinkStoryblok
    | CategoryPageStoryblok
    | DetailheaderStoryblok
    | DetailPageStoryblok
    | FeatureStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | IconStoryblok
    | LabelStoryblok
    | LandingStoryblok
    | ListStoryblok
    | ListItemStoryblok
    | NewsletterStoryblok
    | PageStoryblok
    | PopularCategoriesStoryblok
    | PostStoryblok
    | PostHeaderStoryblok
    | PostHeaderCopyStoryblok
    | ProductStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TeaserStoryblok
    | TextContentStoryblok
    | TextMediaBlockStoryblok
    | ThemeStoryblok
  )[];
  _uid: string;
  component: "DetailPage";
  [k: string]: any;
}

export interface FeatureStoryblok {
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  image: AssetStoryblok;
  label?: "" | "fashion" | "baby" | "retail" | "sports" | "home";
  title: string;
  date?: string;
  author?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface GlobalStoryblok {
  Global?: any;
  _uid: string;
  component: "Global";
  [k: string]: any;
}

export interface HighlightStoryblok {
  postReference: StoryblokStory<PostStoryblok> | string;
  _uid: string;
  component: "Highlight";
  [k: string]: any;
}

export interface IconStoryblok {
  icon: "" | "baby" | "retail" | "home" | "sports" | "fashion";
  size?: "sm" | "med" | "lg" | "xl";
  _uid: string;
  component: "Icon";
  [k: string]: any;
}

export interface LabelStoryblok {
  icon: IconStoryblok[];
  labeltext: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  _uid: string;
  component: "Label";
  [k: string]: any;
}

export interface LandingStoryblok {
  title?: string;
  body?: (
    | BrandblockStoryblok
    | BrandcomponentStoryblok
    | CategoryHeaderStoryblok
    | CategoryLabelsStoryblok
    | CategoryLinkStoryblok
    | CategoryPageStoryblok
    | DetailheaderStoryblok
    | DetailPageStoryblok
    | FeatureStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | IconStoryblok
    | LabelStoryblok
    | LandingStoryblok
    | ListStoryblok
    | ListItemStoryblok
    | NewsletterStoryblok
    | PageStoryblok
    | PopularCategoriesStoryblok
    | PostStoryblok
    | PostHeaderStoryblok
    | PostHeaderCopyStoryblok
    | ProductStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TeaserStoryblok
    | TextContentStoryblok
    | TextMediaBlockStoryblok
    | ThemeStoryblok
  )[];
  meta_description?: string;
  meta_keywords?: string;
  og_image?: string;
  _uid: string;
  component: "Landing";
  [k: string]: any;
}

export interface ListStoryblok {
  titlecenter?: boolean;
  itemFormat?: "" | "teaser" | "overlay" | "textual";
  itemFormatProduct?: "" | "centered" | "teaser" | "overlay";
  itemFormatItem?: "" | "overlay" | "stacked" | "teaser";
  format?: "" | "grid" | "carousel";
  formatColumns?: string;
  title?: string;
  readMore?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  linkText?: string;
  list?: (StoryblokStory<PostStoryblok> | string)[];
  listInternal?: (ListItemStoryblok | ProductStoryblok)[];
  prefillEnabled?: boolean;
  prefillCategory?: (StoryblokStory<CategoryPageStoryblok> | string)[];
  prefillTheme?: (StoryblokStory<ThemeStoryblok> | string)[];
  totalItems?: string;
  _uid: string;
  component: "List";
  [k: string]: any;
}

export interface ListItemStoryblok {
  title: string;
  tag?: string;
  image?: AssetStoryblok;
  summary?: string;
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  linkText?: string;
  _uid: string;
  component: "ListItem";
  [k: string]: any;
}

export interface NewsletterStoryblok {
  title?: string;
  buttontext?: string;
  buttonlink?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  clickdimensionsId?: string;
  _uid: string;
  component: "Newsletter";
  [k: string]: any;
}

export interface PageStoryblok {
  metadata?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  body?: (
    | BrandblockStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | ListStoryblok
    | PopularCategoriesStoryblok
    | PostHeaderStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TextMediaBlockStoryblok
  )[];
  _uid: string;
  component: "Page";
  [k: string]: any;
}

export interface PopularCategoriesStoryblok {
  title?: string;
  category?: (StoryblokStory<CategoryPageStoryblok> | string)[];
  _uid: string;
  component: "PopularCategories";
  [k: string]: any;
}

export interface PostStoryblok {
  title: string;
  author?: string;
  date?: string;
  category?: (StoryblokStory<CategoryPageStoryblok> | string)[];
  theme?: (StoryblokStory<ThemeStoryblok> | string)[];
  image?: AssetStoryblok;
  summary?: string;
  body?: (
    | BrandblockStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | ListStoryblok
    | PopularCategoriesStoryblok
    | PostHeaderStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TextMediaBlockStoryblok
  )[];
  metadata?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  _uid: string;
  component: "Post";
  [k: string]: any;
}

export interface PostHeaderStoryblok {
  mainPost: any;
  postList: any[];
  _uid: string;
  component: "PostHeader";
  [k: string]: any;
}

export interface PostHeaderCopyStoryblok {
  mainPost: string;
  postList: any[];
  _uid: string;
  component: "PostHeader_copy";
  [k: string]: any;
}

export interface ProductStoryblok {
  title: string;
  category?: (StoryblokStory<CategoryPageStoryblok> | string)[];
  image?: AssetStoryblok;
  link?: Exclude<MultilinkStoryblok, { linktype?: "email" } | { linktype?: "asset" }>;
  linkText?: string;
  minimumAmount?: string;
  msrp?: string;
  price?: string;
  _uid: string;
  component: "Product";
  [k: string]: any;
}

export interface QuoteblockStoryblok {
  quote?: string;
  author?: string;
  light?: boolean;
  _uid: string;
  component: "Quoteblock";
  [k: string]: any;
}

export interface ShareblockStoryblok {
  title?: string;
  _uid: string;
  component: "Shareblock";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}

export interface TextContentStoryblok {
  content?: (
    | BrandblockStoryblok
    | BrandcomponentStoryblok
    | CategoryHeaderStoryblok
    | CategoryLabelsStoryblok
    | CategoryLinkStoryblok
    | CategoryPageStoryblok
    | DetailheaderStoryblok
    | DetailPageStoryblok
    | FeatureStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | IconStoryblok
    | LabelStoryblok
    | LandingStoryblok
    | ListStoryblok
    | ListItemStoryblok
    | NewsletterStoryblok
    | PageStoryblok
    | PopularCategoriesStoryblok
    | PostStoryblok
    | PostHeaderStoryblok
    | PostHeaderCopyStoryblok
    | ProductStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TeaserStoryblok
    | TextContentStoryblok
    | TextMediaBlockStoryblok
    | ThemeStoryblok
  )[];
  _uid: string;
  component: "TextContent";
  [k: string]: any;
}

export interface RichtextStoryblok {
  type: string;
  content?: RichtextStoryblok[];
  marks?: RichtextStoryblok[];
  attrs?: any;
  text?: string;
  [k: string]: any;
}

export interface TextMediaBlockStoryblok {
  title?: string;
  paragraph?: RichtextStoryblok;
  image?: AssetStoryblok;
  image_position?: "left" | "right";
  url?: string;
  extra?: QuoteblockStoryblok[];
  design?: "" | "info";
  _uid: string;
  component: "TextMediaBlock";
  [k: string]: any;
}

export interface ThemeStoryblok {
  metadata?: {
    _uid?: string;
    title?: string;
    plugin?: string;
    og_image?: string;
    og_title?: string;
    description?: string;
    twitter_image?: string;
    twitter_title?: string;
    og_description?: string;
    twitter_description?: string;
    [k: string]: any;
  };
  title?: string;
  icon?: "" | "baby" | "fashion" | "home" | "retail" | "sports";
  body?: (
    | BrandblockStoryblok
    | BrandcomponentStoryblok
    | CategoryHeaderStoryblok
    | CategoryLabelsStoryblok
    | CategoryLinkStoryblok
    | CategoryPageStoryblok
    | DetailheaderStoryblok
    | DetailPageStoryblok
    | FeatureStoryblok
    | GlobalStoryblok
    | HighlightStoryblok
    | IconStoryblok
    | LabelStoryblok
    | LandingStoryblok
    | ListStoryblok
    | ListItemStoryblok
    | NewsletterStoryblok
    | PageStoryblok
    | PopularCategoriesStoryblok
    | PostStoryblok
    | PostHeaderStoryblok
    | PostHeaderCopyStoryblok
    | ProductStoryblok
    | QuoteblockStoryblok
    | ShareblockStoryblok
    | TeaserStoryblok
    | TextContentStoryblok
    | TextMediaBlockStoryblok
    | ThemeStoryblok
  )[];
  _uid: string;
  component: "Theme";
  [k: string]: any;
}
