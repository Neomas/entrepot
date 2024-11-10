//import { useTranslation } from "next-i18next";
// import { useRouter } from "next/router";

import Link from "@components/Atoms/Link";
import linkResolver from "@lib/linkResolver";
import textResolver from "@lib/textResolver";
import classNames from "classnames";
import Image from "next/image";
import styles from "./Footer.module.scss";

import Icon from "@components/Atoms/Icon/Icon";
import { getStory } from "@services/storyblok.service";
import { draftMode } from "next/headers";

async function getData(params: any) {
  const { isEnabled } = draftMode();

  const sbSlug = "settings/footersettings";

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

export default async function Footer({ slug, locale = "nl" }) {
  const footerSettings = await getData({ slug, locale });

  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <div className={styles.footerTopContainer}>
            <div className={styles.logoWrapper}>
              <Link href={linkResolver("/")} aria-label="Homepage link">
                <Image src="/Logo.svg" width={300} height={90} alt="logo" className={styles.logo} />
              </Link>
            </div>

            <div className={classNames(styles.contentCol, styles.contact)}>
              <div className={styles.contactGroup}>
                <div className={classNames(styles.text, styles.address)}>
                  {textResolver(footerSettings?.content?.address)}
                </div>

                {footerSettings?.content?.mail && (
                  <Link
                    href={linkResolver(footerSettings?.content?.mail)}
                    aria-label={linkResolver(footerSettings?.content?.mail)}>
                    <p className={classNames(styles.link, styles.underline)}>
                      {footerSettings?.content?.mail.url}
                    </p>
                  </Link>
                )}

                {footerSettings?.content?.tel && (
                  <Link
                    href={`tel:${footerSettings?.content?.tel
                      .replaceAll(" ", "")
                      .replaceAll(".", "")
                      .replaceAll("/", "")}`}
                    aria-label={
                      "tel:" +
                      footerSettings?.content?.tel.replaceAll(" ", "").replaceAll(".", "").replaceAll("/", "")
                    }>
                    <p className={classNames(styles.link, styles.underline)}>
                      {footerSettings?.content?.tel}
                    </p>
                  </Link>
                )}
              </div>

              <div className={styles.contactGroup}>
                <div className={styles.socials}>
                  {linkResolver(footerSettings?.content?.facebook) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.facebook, locale)}
                      aria-label={"facebook link"}>
                      <Icon name={"Facebook"} className={styles.socialIcon} />
                    </Link>
                  )}
                  {linkResolver(footerSettings?.content?.youtube) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.youtube, locale)}
                      aria-label={"youtube link"}>
                      <Icon name={"Youtube"} className={styles.socialIcon} />
                    </Link>
                  )}
                  {linkResolver(footerSettings?.content?.linkedIn) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.linkedIn, locale)}
                      aria-label={"LinkedIn link"}>
                      <Icon name={"LinkedIn"} className={styles.socialIcon} />
                    </Link>
                  )}
                  {linkResolver(footerSettings?.content?.whatsapp) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.whatsapp, locale)}
                      aria-label={"Whatsapp link"}>
                      <Icon name={"Whatsapp"} className={styles.socialIcon} />
                    </Link>
                  )}
                  {linkResolver(footerSettings?.content?.instagram) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.instagram, locale)}
                      aria-label={"Instagram link"}>
                      <Icon name={"Instagram"} className={styles.socialIcon} />
                    </Link>
                  )}
                  {linkResolver(footerSettings?.content?.tiktok) != "#" && (
                    <Link
                      href={linkResolver(footerSettings?.content?.tiktok, locale)}
                      aria-label={"tiktok link"}>
                      <Icon name={"Tiktok"} className={styles.socialIcon} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
