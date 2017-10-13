const path = require('path')

// resolves path to root project folder
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // Webpack aliases
  aliases: {
    src: resolve('src'),
    assets: resolve('src/assets'),
    '@C': resolve('src/components'),
    '@L': resolve('src/layouts'),
    '@P': resolve('src/pages'),
    store: resolve('src/store')
  },

  // Default theme to build with ('ios' or 'mat')
  defaultTheme: 'mat',

  // Add support for IE browser
  supportIE: true
}
