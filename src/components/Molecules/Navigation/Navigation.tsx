import Link from "@components/Atoms/Link";
import linkResolver from "@lib/linkResolver";
import { getStory } from "@services/storyblok.service";
import { draftMode } from "next/headers";
import LanguageSwitch from "./LanguageSwitch";
import MenuPane from "./MenuPane";
import MobileMenu from "./MobileMenu";
import styles from "./Navigation.module.scss";
import NavigationWrapper from "./NavigationWrapper";
import Image from "next/image";

async function getData(params: any) {
  const { isEnabled } = draftMode();

  const sbSlug = "settings/menusettings";

  try {
    const data = await getStory(sbSlug, {
      version: isEnabled ? "draft" : "published",
      language: params.locale,
    });
    if (!data) return null;
    return data;
  } catch (e) {
    console.error(e);

    return null;
  }
}

export default async function Navigation({ slug, locale }) {
  const navigationSettings = await getData({ slug, locale });

  return (
    <NavigationWrapper>
      <Link href={linkResolver("/")} className={styles.logoLink} aria-label="Homepage link">
        <Image src="/Logo.svg" width={300} height={90} alt="logo" className={styles.logo} priority />
      </Link>
      <MenuPane>
        <div className={styles.linkWrapper}>
          {navigationSettings?.content?.menuButtons?.map((button, i) => (
            <Link key={`navitem${i}`} href={linkResolver(button.link)}>
              {button.title}
            </Link>
          ))}
        </div>

        <div className={styles.buttonWrapper}>
          <LanguageSwitch slug={slug} locale={locale} />
        </div>
      </MenuPane>
      <MobileMenu />
    </NavigationWrapper>
  );
}
