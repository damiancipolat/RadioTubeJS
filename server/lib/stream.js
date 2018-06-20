/*
  Server de descarga directa
  por @Damcipolat / damian.cipolat@gmail.com
  http://www.damiancipolat.com
*/

const fs  = require('fs');

class Streamer{

  constructor(path, delay){

    this.file  = path;
    this.delay = delay;

    //Armo el stream en base al archivo.
    this.src   = fs.createReadStream(this.file);

  }

  start(res){

    //Uso el event handler del stream.
    this.src.on('data', (chunk) => {

      //Si el delay no es cero, genero un interval para simular la demora.
      if (this.delay > 0)
        setTimeout(() => res.write(chunk), this.delay);
      else
        res.write(chunk);

    });

    //Cuando finaliza el envio de streams.
    this.src.on('end', () => {

      if (this.delay > 0)
        setTimeout(() =>{

          res.end();

        }, this.delay);
      else{

        res.end();

      }
      
    });

  }
  
}

module.exports = Streamer;