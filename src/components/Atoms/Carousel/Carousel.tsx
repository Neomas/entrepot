"use client";

import Icon from "@components/Atoms/Icon/Icon";
import classNames from "classnames";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import styles from "./Carousel.module.scss";

function Carousel({ children, slidesPerPage = 4 }: { children: React.ReactNode[]; slidesPerPage?: number }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesToScroll, setSlidesToScroll] = useState(slidesPerPage);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: "start",
      slidesToScroll: slidesToScroll,
      watchResize: true,
    },
    []
  );

  const calcSlidesToScroll = () => {
    // set slidesToScroll to 1 when the carousel is below 768px
    if (window.innerWidth < 768) {
      setSlidesToScroll(1);
    } else {
      setSlidesToScroll(slidesPerPage);
    }
  };

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      });

      emblaApi.on("resize", () => {
        calcSlidesToScroll();
      });
    }
  }, [emblaApi, selectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [slidesToScroll]);

  useEffect(() => {
    if (!emblaApi) return;
    calcSlidesToScroll();
  }, [emblaApi, setScrollSnaps]);

  return (
    <div className={styles.carouselWrapper}>
      <div className={styles.carousel} ref={emblaRef}>
        <div className={classNames(styles.carousel__container, "carousel__container")}>
          {children.map((child, i) => (
            <div
              className={classNames(styles.carousel__item, styles[`items-${slidesPerPage}`])}
              key={`slide-${i}`}>
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.dotWrapper}>
        {scrollSnaps?.map((dot, i) => (
          <div
            className={classNames(styles.dot, selectedIndex === i && styles.selected)}
            key={`dot-${i}`}
            onClick={() => {
              emblaApi?.scrollTo(i);
              setSelectedIndex(i);
            }}
          />
        ))}
      </div>

      <button
        className={classNames(styles.emblabutton, styles.prev)}
        onClick={() => emblaApi?.scrollPrev()}
        aria-label={"carouselbutton previous"}>
        <Icon name={"arrowRight"} />
      </button>
      <button
        className={classNames(styles.emblabutton, styles.next)}
        onClick={() => emblaApi?.scrollNext()}
        aria-label={"carouselbutton next"}>
        <Icon name={"arrowRight"} />
      </button>
    </div>
  );
}

export default Carousel;
