import StoryblokImage from "@components/Atoms/Image/Image";
import Video from "@components/Atoms/Video/Video";
import textResolver from "@lib/textResolver";
import classNames from "classnames";
import styles from "./ContentBlock.module.scss";

const ContentBlock = ({ blok, locale }) => {
  const noInfo = !blok.title && !textResolver(blok.info);
  const noMedia = !blok.videoLink && !blok?.image?.filename;

  return (
    <section className={styles.section}>
      {blok?.anchor && <a id={blok?.anchor}></a>}
      <div className={classNames(styles.container, !noInfo && !noMedia && styles[blok.imagePosition])}>
        {!noInfo && (
          <div className={classNames(styles.textWrapper, noMedia && styles.noMedia, "prose")}>
            {blok.title && <h3 className={styles.title}>{blok.title}</h3>}
            {blok.info && <div className={styles.info}>{textResolver(blok.info)}</div>}
          </div>
        )}
        {(blok?.image?.filename || blok.videoLink) && (
          <div className={classNames(styles.imageWrapper, noInfo && styles.noInfo)}>
            {blok.videoLink ? (
              <Video image={blok.image} videoLink={blok.videoLink} />
            ) : (
              blok?.image?.filename && (
                <StoryblokImage
                  src={blok.image?.filename}
                  alt={blok.image?.alt}
                  focus={blok.image?.focus}
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 100vw"
                />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ContentBlock;
