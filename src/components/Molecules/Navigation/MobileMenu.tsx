"use client";

import Icon from "@components/Atoms/Icon/Icon";
import { IconsEnum } from "@components/enums";
import styles from "./MobileMenu.module.scss";
import { usePathname } from "next/navigation";
import { useAtomValue, useSetAtom } from "jotai";
import { menuAtom } from "./MenuPane";
import { useEffect } from "react";

function MobileMenu() {
  const setMenu = useSetAtom(menuAtom);
  const { isOpen } = useAtomValue(menuAtom);
  const pathName = usePathname();

  const toggleMenu = () => {
    setMenu({ isOpen: !isOpen });
  };

  useEffect(() => {
    setMenu({ isOpen: false });
  }, [pathName, setMenu]);

  return (
    <div className={styles.hamburger} onClick={() => toggleMenu()}>
      <Icon name={isOpen ? "Close" : "HamburgerMenu"} />
    </div>
  );
}

export default MobileMenu;
