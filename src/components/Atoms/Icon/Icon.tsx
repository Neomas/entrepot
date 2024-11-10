import classNames from "classnames";
import styles from "./Icon.module.scss";

import { type SVGProps } from "react";
import { type IconName } from "./types/name";

export { IconName };

export default function Icon({
  name,
  className,
  ...props
}: SVGProps<SVGSVGElement> & {
  name: IconName;
}) {
  return (
    <span className={classNames(styles.icon, className)}>
      <svg {...props}>
        <use href={`/icons/sprite.svg#${name}`} />
      </svg>
    </span>
  );
}
