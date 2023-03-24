
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    cssnano: { preset: 'default' },
    purgecss: {
      content: [ './src/**/*.jsx' ],
      defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
    }
  }

}
