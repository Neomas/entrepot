"use client";
import classNames from "classnames";
import { Variants, m, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import styles from "./Navigation.module.scss";

const NavigationWrapper = ({ children }) => {
  const [navigationHidden, setNavigationHidden] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current !== "number") return;

    let direction = current! - scrollYProgress.getPrevious()!;

    if (scrollY.get() < 100) {
      setNavigationHidden(false);
    } else {
      if (direction < 0) {
        setNavigationHidden(false);
      } else {
        setNavigationHidden(true);
      }
    }
  });

  const navigationAnim: Variants = {
    show: {
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        type: "tweeen",
      },
    },
    hidden: {
      y: "-100%",

      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "tween",
      },
    },
  };

  return (
    <m.nav
      className={classNames(styles.navigationWrapper)}
      data-hiden={navigationHidden}
      animate={navigationHidden ? "hidden" : "show"}
      initial="show"
      variants={navigationAnim}>
      {children}
    </m.nav>
  );
};

export default NavigationWrapper;
