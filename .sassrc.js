const path = require('path')
const fs = require('fs')

const file = path.resolve(__dirname, 'src/styles/global.scss')

module.exports = {
  data: fs.readFileSync(file).toString()
}
