// bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  reactStrictMode: true,
  swcMinify: true,

  env: {
    SB_ACCESS_TOKEN: process.env.SB_ACCESS_TOKEN,
  },

  // Images Options
  images: {
    domains: ["images.unsplash.com", "a.storyblok.com", "webwereld.nl", "img.youtube.com"],
    deviceSizes: [320, 450, 600, 768, 1024, 1360, 1720],
  },

  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://app.storyblok.com",
          },
        ],
      },
    ];
  },

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },

  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false,
    };

    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
