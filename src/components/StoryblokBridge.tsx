"use client";
import DynamicComponent from "@components/DynamicComponent";
import resolve_relations from "@config/storyblok.config";
import { loadStoryblokBridge, SbBlokData } from "@storyblok/js";
import { useState } from "react";

const StoryblokBridge = ({
  blok,
  storyId,
  data,
  locale,
}: {
  blok: any;
  data?: any;
  locale?: string;
  storyId?: string;
}) => {
  const [blokState, setBlokState] = useState(blok);

  loadStoryblokBridge()
    .then(() => {
      const { StoryblokBridge, location } = window;
      const storyblokInstance = new StoryblokBridge({
        resolveRelations: resolve_relations,
      });
      storyblokInstance.on(["published", "change"], () => {
        location.reload();
      });
      storyblokInstance.on(["input"], (e) => {
        const newStory = e?.story?.content;
        setBlokState(newStory);
      });
    })
    .catch((err) => console.error(err));

  return <DynamicComponent blok={blokState} data={data} locale={locale} preview={true} storyId={storyId} />;
};

export default StoryblokBridge;
