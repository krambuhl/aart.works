/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  eslint: {
    dirs: ['app', 'components', 'data', 'hooks', 'lib', 'styles', 'tokens', 'types'],
  },
}
