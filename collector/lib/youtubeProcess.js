const fs            = require("fs");
const youtubeStream = require("youtube-audio-stream");
const sequential    = require("./seq.js");

//Process the download of the audio file.
const getAudio = (urlVideo,fileOutput)=>{

  return new Promise((resolve,reject)=>{

    try {

      //Create file to stream.
      let fileSaved = fs.createWriteStream(fileOutput);

      //Get stream object.
      let stream    = youtubeStream(urlVideo).pipe(fileSaved);

      console.log('-> Downloading:',urlVideo);

      //When the streaming finish.   
      stream.on('finish', ()=>{

        console.log('-> '+fileOutput+' OK!');
        resolve({'file':fileOutput,'video':urlVideo,'status':'ok'});

      });

    } catch (exception) {

        console.log('-> '+fileOutput+' ERROR!');
        reject({'file':fileOutput,'video':urlVideo,'status':'error','detail':exception});        

    }

  });

}

//Create youtube url.
const getUrlVideo = (vId)=>{

  return 'https://www.youtube.com/watch?v='+vId;

}

//Masive download.
const downloadAll = (videoList,destiny)=>{

  return new Promise((resolve,reject)=>{

    //Create a promise list.
    let funcs = videoList.map((vId)=>()=>getAudio(getUrlVideo(vId),destiny+vId+'.mp3'));

    //Process sequential download.
    sequential.run(funcs)  
      .then((result) => resolve(result))
      .catch((error) => reject(error));

  });

}

module.exports.getAudio    = getAudio;
module.exports.getUrlVideo = getUrlVideo;
module.exports.downloadAll = downloadAll;