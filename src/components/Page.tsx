import DynamicComponent from "@components/DynamicComponent";
import { PageStoryblok } from "@/types/components-schema";

const Page = ({
  blok,
  preview = false,
  locale,
}: {
  blok: PageStoryblok;
  preview?: boolean;
  locale?: string;
}) => (
  <main>
    {blok.body
      ? blok.body.map((blok) => (
          <DynamicComponent blok={blok} preview={preview} key={blok._uid} locale={locale} />
        ))
      : null}
  </main>
);

export default Page;
