"use client";

import { useEffect, useState } from "react";
import Slot from "./Slot";

const StoryblokLoaderClient = ({ getData, ...props }: { getData: any }) => {
  const [data, setData] = useState<any | null>(null);
  useEffect(() => {
    // async getData and setData
    const load = async () => {
      const data = await getData();

      setData(data);
    };
    load();
  }, [getData]);

  return <Slot {...props} data={data} />;
};

export default StoryblokLoaderClient;
