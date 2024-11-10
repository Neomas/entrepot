"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import { LazyMotion, domMax } from "framer-motion";
import IconSpritesheet from "@components/Atoms/Icon/IconSpritesheet";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <IconSpritesheet />
      <ReactLenis
        root
        options={{
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
          orientation: "vertical", // vertical, horizontal
          gestureOrientation: "vertical", // vertical, horizontal, both
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        }}>
        <LazyMotion features={domMax}>{children}</LazyMotion>
      </ReactLenis>
    </>
  );
};

export default Providers;
