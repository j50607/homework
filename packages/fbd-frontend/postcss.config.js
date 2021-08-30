module.exports = {
  plugins: {
    tailwindcss: {},
    'postcss-nested': {},
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 16,
      propList: [
        '*',
        '!background-position',
      ],
      selectorBlackList: [
        'px-',
        'html',
      ],
    },
  },
};
