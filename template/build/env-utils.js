const config = require('../config')

const theme = process.argv[2] || config.defaultTheme

module.exports = {
  dev: process.env.NODE_ENV === 'development',
  prod: process.env.NODE_ENV === 'production',

  platform: {
    theme: theme
  }
}
