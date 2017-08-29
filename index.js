const fs = require('fs');
const debug = require('debug')('app:index');
const CONFIG_FILE_PATH = __dirname + '/configs.json';

global.CONFIG_FILE_PATH = CONFIG_FILE_PATH;

let configs;
let hasConfigsFile = () => fs.existsSync(CONFIG_FILE_PATH);

async function setConfig () {
  const rl = require('./libs/read-from-cli.js');
  let config = require('./configs.sample.js');

  for (let val in config) {
    if (typeof(config[val]) !== 'object') {
      let defaul = config[val];
      let defaulStr = (defaul) ? '(default: ' + defaul + ')' : '';

      config[val] = await rl.read(val + '? ' + defaulStr, defaul);
    } else {
      let keys = Object.keys(config[val]);
      
      if (keys.length > 0) {
        for (let i=0; i<keys.length; i++) {
          let defaul = config[val][keys[i]];
          let defaulStr = (defaul) ? '(default: ' + defaul + ')' : '';

          config[val][keys[i]] = await rl.read(val + '.' + keys[i] + '?' + defaulStr + ' ', defaul);
        }
      }
    }
  }

  debug(config);

  fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config));

  await rl.close();

  return config;
}

async function startServer() {
  if (!hasConfigsFile()) {
    try {
      await setConfig();
    } catch (e) {
      console.log(e);
      await process.exit();
    }
  }

  if (hasConfigsFile()) require('./server.js');
}

startServer();

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});