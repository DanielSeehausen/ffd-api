const os = require('os');
const argv = require('minimist')(process.argv.slice(2));

// TODO: add default object to draw from so this isn't an eyesore to read
module.exports = {
  WORKERCOUNT: argv.w || argv.workers || process.env.WORKERCOUNT || os.cpus().length,
  ROWS: process.env.ROWS || 500,
  COLUMNS: process.env.COLUMNS || 500,
  HTTPPORT: process.env.HTTPPORT || 3000,
  WSPORT: process.env.WSPORT || 8080,
  IDLIMIT: argv.g || argv.groups || 10,
  ADMIN_SECRET: '0' // TODO: make secret, add to .gitignore - rip security
}
