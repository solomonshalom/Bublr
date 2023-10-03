module.exports = {
  async redirects() {
    return [
      {
        source: '/@:username',
        destination: '/:username',
        permanent: true,
      },
    ]
  },
  reactStrictMode: false,
}

const withImages = require('next-images');
module.exports = withImages();