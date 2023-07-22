/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // webpack: (config) => {
  //   config.resolve.fallback = { "utf-8-validate": false, bufferutil: false };
  //   config.experiments = {
  //     ...config.experiments,
  //   };
  //   return config;
  // },
};

module.exports = nextConfig;