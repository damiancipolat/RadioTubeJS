const fs = require('fs');

const loadConfig = (configFile)=>{

  let json = fs.readFileSync(configFile,'utf8');
  return JSON.parse(json);

}

module.exports.load = loadConfig;