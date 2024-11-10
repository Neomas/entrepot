"use client";

import ReactDOM from "react-dom";

export default function IconSpritesheet() {
  ReactDOM.preload("/icons/sprite.svg", {
    as: "image",
  });

  return null;
}
