module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/f2e2021-week4-salary/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/styles/app.scss";
        `,
      },
    },
  },
};
