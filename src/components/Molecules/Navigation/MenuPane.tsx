"use client";
import { useLenis } from "@studio-freight/react-lenis";
import styles from "./MenuPane.module.scss";

import classNames from "classnames";
import { atom, useAtomValue } from "jotai";
import { useEffect } from "react";
export const menuAtom = atom({ isOpen: false });

function MenuPane({ children }) {
  const { isOpen } = useAtomValue(menuAtom);

  return <div className={classNames(styles.pane, { open: isOpen })}>{children}</div>;
}

export default MenuPane;
