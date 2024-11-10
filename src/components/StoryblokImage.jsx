import Image from "next/image";

export default function StoryblokImage({ width, height, focus, crop, ...nextImageProps }) {
  const aspectRatio = height / width;
  const storyblokLoader = ({ src, width, quality = 80 }) => {
    let height = Math.round(width * aspectRatio);
    if (!crop) height = 0;
    if (isNaN(height)) height = 0;

    return src + `/m/${width}x${height}/filters:quality(${quality}):focal(${focus})`;
  };
  const isStoryBlokImage = nextImageProps.src.includes("storyblok.com");

  return (
    <Image
      {...nextImageProps}
      // width={width}
      // height={height}
      loader={isStoryBlokImage ? storyblokLoader : undefined}
    />
  );
}
