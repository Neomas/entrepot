const Translate = ({ locale, token }: { locale: string; token: string }) => {
  //   import the common.json file from the /locales [locale] folder
  const folder = locale ? locale : "nl";

  const common: string = require(`./${folder}/common.json`);
  const searchTerm = token.split(".");
  return searchTerm.length > 2
    ? common[`${searchTerm[0]}`][`${searchTerm[1]}`][`${searchTerm[2]}`]
    : searchTerm?.length > 1
      ? common[`${searchTerm[0]}`][`${searchTerm[1]}`]
      : common[`${searchTerm[0]}`];
};

export default Translate;
