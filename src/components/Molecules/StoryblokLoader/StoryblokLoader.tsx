import { ReactNode } from "react";
import StoryblokLoaderClient from "./StoryblokLoaderClient";
import StoryblokLoaderServer from "./StoryblokLoaderServer";

const StoryblokLoader = ({ getData, ...props }: { getData: any; preview: boolean; children: ReactNode }) => {
  return props.preview ? (
    <StoryblokLoaderClient getData={getData} {...props} />
  ) : (
    <StoryblokLoaderServer getData={getData} {...props} />
  );
};

export default StoryblokLoader;
