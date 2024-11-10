"use client";
import classNames from "classnames";
import Image, { ImageProps } from "next/image";
import { useState } from "react";

import styles from "./Image.module.scss";

type StoryblokImageProps = {
  width?: number;
  height?: number;
  focus?: string;
  crop?: boolean;
  className?: string;
};
export default function StoryblokImage({
  width = 400,
  height,
  focus,
  crop = false,
  className,
  ...nextImageProps
}: StoryblokImageProps & ImageProps) {
  const [loaded, setloaded] = useState(false);
  const isStoryBlokImage =
    typeof nextImageProps.src === "string" ? nextImageProps.src.includes("storyblok.com") : false;

  // get aspect ratio
  let aspectRatio = 1;
  if (height) aspectRatio = height / width;
  if (!height && isStoryBlokImage) {
    let proportionsRegEx = new RegExp("/([0-9]*)x([0-9]*)/");
    let myMatch = String(nextImageProps.src).match(proportionsRegEx);
    if (!myMatch) return null;
    const [match, originWidth, originHeight] = myMatch;
    aspectRatio = Number(originHeight) / Number(originWidth);
  }

  if (!height) {
    height = Math.round(width * aspectRatio);
  }

  const storyblokLoader = ({ src, width, quality = 80 }) => {
    let height = Math.round(width * aspectRatio);
    if (!crop) height = 0;
    if (isNaN(height)) height = 0;

    return src + `/m/${width}x${height}/filters:quality(${quality}):focal(${focus})`;
  };

  const imageLoaded = () => {
    setloaded(true);
  };
  // console.log("WIDHTHEIGHT", width, height, aspectRatio);
  const blurDataURL =
    nextImageProps.src + `/m/50x${String(Math.round(50 * aspectRatio))}/filters:blur(10):focal(${focus})`;

  return (
    <Image
      {...nextImageProps}
      blurDataURL={blurDataURL}
      placeholder="blur"
      width={width}
      height={height || 0}
      loader={isStoryBlokImage ? storyblokLoader : undefined}
      onLoad={imageLoaded}
      className={classNames(className, { [styles["storyblok-image"]]: true, [styles["is-loaded"]]: loaded })}
      style={{ aspectRatio: `1/${aspectRatio}` }}
    />
  );
}
