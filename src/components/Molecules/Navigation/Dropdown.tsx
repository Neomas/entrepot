"use client";
import { useEffect, useState } from "react";
import styles from "./Dropdown.module.scss";
import Link from "@components/Atoms/Link";
import Icon from "@components/Atoms/Icon/Icon";
import { IconsEnum } from "@components/enums";
import classNames from "classnames";
import linkResolver from "@lib/linkResolver";

export default function DropDown({ options, value }) {
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    const option = options.find((option) => option.label === value);

    if (option) {
      setLabel(option.label);
    }
  }, [value]);

  return (
    <div
      className={classNames(styles.dropdown, { openDropdown: styles.open })}
      onClick={() => {
        setOpenDropdown(!openDropdown);
      }}>
      <div className={styles.current}>
        <p>{label}</p>
        <Icon className={styles.icon} name="arrowRight" />
      </div>

      <div className={styles.options}>
        {options?.map((option, i) => {
          return (
            <Link
              href={linkResolver(option.value)}
              passHref
              className={styles.option}
              key={i}
              aria-label={option.label}>
              {option.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
