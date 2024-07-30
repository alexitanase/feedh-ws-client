const argv = require('minimist')(process.argv.slice(2));
const libSocket = require("./Services/SocketIO")
var config = require('./config.js');

if(typeof argv['p'] === 'undefined'){
  console.error('Partner is required');
  process.exit(1);
}

config.partner_code = argv['p'];

console.info(`Starting service with Partner code: ${config.partner_code}`);

const Client = new libSocket();