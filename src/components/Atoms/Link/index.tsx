import NextLink, { LinkProps } from "next/link";
import React from "react";

// component that extendqs next/link
// to allow for setting default props
type LinkPropsWithChildren = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;
const Link = ({ children, href, ...props }: LinkPropsWithChildren) => {
  return (
    <NextLink href={href || "#"} {...props} key={`link-${href}`}>
      {children}
    </NextLink>
  );
};
export default Link;
