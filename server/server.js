const configHelper  = require('./lib/config.js');
const Streaming     = require('./lib/stream.js');

//Load config.
const config   = configHelper.load('./config/config.json');

//Create a streamer.
const streamer = new Streaming(config.stream.bundle,0);

//Define constant.
const http    = require('http');
const express = require("express");

//Start expressjs.
const app     = express();
const server  = http.createServer(app);
const args    = process.argv;

//Bind routes.
app.get(/^(.+)$/,(req, res)=>{

  //Start streaming to response.
  streamer.start(res);

});

//Start listen mode.
app.listen(config.server.port,config.server.ip,() => {

  console.log('');
  console.log('> RADIO JS');  
  console.log('> Streaming file:',config.stream.bundle);
  console.log('> Waiting connections ...');
  console.log('');

});

