// storyblok helper, checks if (link) component has a valid link and returns the link
const linkResolver = (component, sitePrefix = "") => {
  const prefix = sitePrefix ? sitePrefix : "";
  // console.log({ component, sitePrefix });

  if (typeof component === "string") {
    return startLinkWithSlash(component, prefix);
  }
  if (!component?.linktype) return component?.url || component?.cached_url || "#";
  if (component.linktype === "story" && !component?.id && !component?.href) return "#";
  if (component.linktype === "story" && component.story) {
    return component?.anchor
      ? startLinkWithSlash(component.story.full_slug + "#" + component.anchor, prefix)
      : startLinkWithSlash(component.story.full_slug, prefix);
  }
  if (component.linktype === "story" && component.cached_url)
    return component?.anchor
      ? startLinkWithSlash(component.cached_url + "#" + component.anchor, prefix)
      : startLinkWithSlash(component.cached_url, prefix);
  if (component.linktype === "url" && component.url) return component.url;
  if (component.linktype === "email" && component.url) return `mailto:${component.url}`;
  if (component.linktype === "asset" && component.url) return component.url;
  if (component.href) return startLinkWithSlash(component.href, prefix);

  return "#";
};

const startLinkWithSlash = (link, sitePrefix) => {
  let l = link;
  if (link.startsWith("tel:") || link.startsWith("mailto:") || link.startsWith("http")) {
    return link;
  }

  if (!link.startsWith("/")) l = `/${link}`;
  return sitePrefix && !l.startsWith(`/${sitePrefix}`) ? `/${sitePrefix}` + l : l;
};

export default linkResolver;
