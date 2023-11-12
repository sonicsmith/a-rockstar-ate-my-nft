module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};
