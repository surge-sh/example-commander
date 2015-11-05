var chalk = require('chalk')

module.exports = function (msg) {
  if (msg) {
    console.log('')
    console.log('      ' + chalk.white.bgMagenta(' ' + msg + ' '))
    console.log('')
  }
}
