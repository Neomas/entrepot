import dynamic from "next/dynamic";
import { storyblokEditable } from "@storyblok/react";

import Hero from "@components/Molecules/Hero/Hero";
import Page from "@components/Page";
import ContentBlock from "@components/Molecules/ContentBlock/ContentBlock";
import ContentList from "@components/Molecules/ContentList/ContentList";

const Components = {
  detailheader: Hero,
  Page: Page,
  ContentBlock: ContentBlock,
  ContentList: ContentList,
};

interface IDynamicComponent {
  blok: any;
  data?: any;
  index?: number;
  locale?: string;
  preview?: boolean;
  storyId?: string;
}

const DynamicComponent = ({ blok, storyId, index, locale, data, preview = false }: IDynamicComponent) => {
  // check if component is defined above
  if (typeof Components[blok?.component] !== "undefined") {
    const Component = Components[blok.component];

    return (
      <div
        {...(preview && !["Page"].includes(blok.component) ? storyblokEditable(blok) : {})}
        key={blok._uid}>
        <Component
          blok={blok}
          data={data}
          preview={preview}
          locale={locale}
          index={index}
          storyId={storyId}
        />
      </div>
    );
  }

  // fallback if the component doesn't exist
  return (
    <p>
      The component <strong>{blok?.component}</strong> has not been created yet.
    </p>
  );
};

export default DynamicComponent;
