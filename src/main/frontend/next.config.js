module.exports = {
    env: {
      APP_NAME: 'OurAirbnb',
      API_BASE_URL: 'http://localhost:9090',
      IMAGE_BASE_URL: 'http://localhost:9090/uploads/files/'
    },
    images: {
      domains: ['localhost'],
    },
    eslint: {
      // Warning: This allows production builds to successfully complete even if
      // your project has ESLint errors.
      ignoreDuringBuilds: true,
    },
}