import { render } from "storyblok-rich-text-react-renderer-ts";
import linkResolver from "@lib/linkResolver";
import Link from "next/link";

// storyblok helper, turns rich text into html
// default richtext renderer has problems with translated links to internal stories

const textResolver = (text) => {
  const renderedText = render(text, {
    markResolvers: {
      link: (children, props) => {
        const href = linkResolver(props) || "";
        const target = props.target === "_blank" && !href.startsWith("/") ? "_blank" : "_self";
        return (
          <Link href={href}>
            <a target={target}>{children}</a>
          </Link>
        );
      },
    },
  });

  return renderedText;
};

export default textResolver;
