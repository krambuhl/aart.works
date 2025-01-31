/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  // webpack: async (config) => {
  //   const { default: UnoCSS } = await import('@unocss/webpack');

  //   config.cache = false;
  //   config.plugins.push(UnoCSS());
  //   // config.optimization.realContentHash = true;
  //   return config;
  // },
  eslint: {
    dirs: ['app', 'components', 'data', 'hooks', 'lib', 'styles', 'tokens', 'types'],
  },
};
