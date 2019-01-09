const os = require('os');
const argv = require('minimist')(process.argv.slice(2));
const cpus =
module.exports = {
  WORKERCOUNT: (argv.w <= cpus && argv.w) || os.cpus().length,
  ROWS: 500,
  COLUMNS: 500,
  HTTPPORT: 3000,
  WSPORT: 8080,
  IDLIMIT: argv.g || argv.groups || 10,
  ADMIN_SECRET: '0' // TODO: make secret, add to .gitignore - rip security
}
