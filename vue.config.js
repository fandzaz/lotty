module.exports = {
  css: {
    extract: true,
  },
  baseUrl: process.env.NODE_ENV === "production" ? "/" : "/",
  lintOnSave: false,
};
