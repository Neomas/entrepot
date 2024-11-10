import "@styles/global.scss";
import React from "react";
import localFont from "next/font/local";
import ExitPreviewButton from "@components/ExitPreviewButton";
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";
import Providers from "@components/Providers";
import Navigation from "@components/Molecules/Navigation/Navigation";
import Footer from "@components/Molecules/Footer/Footer";

storyblokInit({
  accessToken: process.env.SB_ACCESS_TOKEN,
  use: [apiPlugin],
});

const gilroy = localFont({
  src: [
    {
      path: "../../../../public/fonts/Gilroy-Light/font.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Gilroy-Regular/font.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Gilroy-Medium/font.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Gilroy-SemiBold/font.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/Gilroy-Bold/font.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--gilroy",
  display: "swap",
});

const AppLayout = ({
  children,
  params,
}: {
  children: React.ReactElement;
  params: { locale: string; slug: string[] };
}) => {
  return (
    <html lang={params.locale} className={gilroy.variable}>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicons/favicon-16x16.png" />
        <link rel="manifest" href="/favicons/site.webmanifest" />
        <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#000000" />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-config" content="/favicons/browserconfig.xml" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body>
        <Providers>
          <Navigation slug={params.slug} locale={params.locale} />
          <main>{children}</main>
          <Footer locale={params.locale} slug={params.slug} />
          <ExitPreviewButton />
        </Providers>
      </body>
    </html>
  );
};

export default AppLayout;
