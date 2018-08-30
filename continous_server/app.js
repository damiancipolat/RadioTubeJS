//Include api modules.
const http       = require('http');
const express    = require('express');
const bodyParser = require('body-parser');
const es         = require('event-stream');
const fs         = require('fs');
const Duplex     = require('stream').Duplex;  

const bufferToStream = (buffer)=>{
  let stream = new Duplex();
  stream.push(buffer);
  stream.push(null);
  return stream;
}

const errorMsj = ()=>{

  console.log('error');
  process.exit();

}


//Start Express-js
const app    = express();
const server = http.createServer(app);

//Add bodyparser and CORS.
app.use(bodyParser.json());

//File path.
const file = './ping_pong.mp3';

//Buffer emitter.
const chunkSize = 500;

//Allocate buffer memory.
let buffer = {
  binary   : new Buffer(2500),
  counter  : 0
}

//Create the file stream.
let stream   = fs.createReadStream(file, {flags: 'r',highWaterMark: chunkSize});

//Handle each stream
stream.on('data', (chunk) => {

  if (buffer.counter<=buffer.binary.length-1){

    buffer.counter++;
    buffer.binary[buffer.counter] = chunk;

  } else {
    console.log('buffer lleno');
    stream.pause();
  }

  console.log('>>>',buffer.counter,chunk);  

});

//Handle stream events.
stream.on('error',()=>{
  console.log('error');
});

stream.on('end',()=>{
  console.log('end');
});

//Reverse the parameter name
app.get('*',(req,res)=>{

  bufferToStream(buffer.binary).pipe(res);
  
});

//Start listen mode.
app.listen(7000,'127.0.0.1',()=>{

  console.log('> Ready listen');

});

//Handle process server.
process.on('SIGTERM',errorMsj);
process.on('SIGINT',  errorMsj)
process.on('uncaughtException', errorMsj);
