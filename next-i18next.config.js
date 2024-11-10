const path = require("path");

module.exports = {
  i18n: {
    localeDetection: false,
    defaultLocale: "default",
    locales: ["default", "en", "fr"],
  },
  localePath: path.resolve("./public/locales"),
  reloadOnPrerender: true,
};
