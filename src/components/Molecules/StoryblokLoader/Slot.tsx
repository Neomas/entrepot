import classNames from "classnames";
import React from "react";

export type AsChildProps<DefaultElementProps> =
  | ({ asChild?: false } & DefaultElementProps)
  | { asChild: true; children: React.ReactNode };
function Slot({
  children,
  ...props
}: React.HTMLAttributes<HTMLElement> & {
  children?: React.ReactNode;
  data?: any;
}) {
  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      ...props,
      ...children.props,
      style: {
        ...props.style,
        ...children.props.style,
      },
      className: classNames(props.className, children.props.className),
    });
  }
  if (React.Children.count(children) > 1) {
    React.Children.only(null);
  }
  return null;
}

export default Slot;
