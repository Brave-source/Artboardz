const nextConfig = {
  reactStrictMode: true,
  webpack: function (config, options) {
    config.experiments = {
      asyncWebAssembly: true,
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  images: {
    domains: ["encrypted-tbn0.gstatic.com", "images.unsplash.com", "firebasestorage.googleapis.com","cloudflare-ipfs.com", "gerowallet.io","kfdniefadaanbjodldohaedphafoffoh"],
  }
};
module.exports = nextConfig;
