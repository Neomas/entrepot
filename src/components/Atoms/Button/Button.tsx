import React from "react";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { ButtonVariantsEnum, IconsEnum, iconsPlacementEnum } from "@components/enums";
import Link from "next/link";
import Icon from "../Icon/Icon";
import { type IconName } from "@components/Atoms/Icon/types/name";

interface IButton {
  title: string;
  link?: string;
  variant?: ButtonVariantsEnum;
  icon?: IconName;
  iconPosition?: iconsPlacementEnum;
  className?: string;
  darkmode?: boolean;
  onClick?: () => void;
}

const Button = ({
  title,
  link,
  variant = ButtonVariantsEnum.PRIMARY,
  className,
  onClick,
  icon,
  iconPosition,
  darkmode,
}: IButton) => {
  return (
    <Link
      href={link || "#"}
      className={classNames(
        styles.button,
        styles[variant],
        darkmode && styles.darkmode,
        iconPosition && styles[iconPosition],
        icon && styles.iconButton,
        className
      )}>
      {icon && iconPosition === iconsPlacementEnum.FRONT && (
        <div className={styles.icon}>
          <Icon name={icon} />
        </div>
      )}

      {title}

      {icon && iconPosition === iconsPlacementEnum.BACK && (
        <div className={styles.icon}>
          <Icon name={icon} />
        </div>
      )}
    </Link>
  );
};

export default Button;
