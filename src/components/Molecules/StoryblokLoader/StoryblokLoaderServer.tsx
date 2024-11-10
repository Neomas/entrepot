import Slot from "./Slot";

const StoryblokLoaderServer = async ({ getData, ...props }: { getData: any }) => {
  const data = await getData();

  return <Slot {...props} data={data} />;
};

export default StoryblokLoaderServer;
