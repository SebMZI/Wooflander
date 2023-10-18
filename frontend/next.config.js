/** @type {import('next').NextConfig} */

// next.config.js
const path = require("path");

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  images: {
    domains: ["localhost"],
  },
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(mp4|webm)$/,
      use: [
        {
          loader: "file-loader",
          options: {
            publicPath: "/_next",
            name: "static/videos/[name].[ext]", // Répertoire de sortie pour les vidéos
          },
        },
      ],
    });

    return config;
  },
};
