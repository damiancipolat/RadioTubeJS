const downloadTube = require('./lib/youtubeProcess.js');
const fs           = require('fs');

//Load video list file.
let videoListJson = fs.readFileSync('video_list.json','utf8');

//Parse video list.
let videoList     = JSON.parse(videoListJson);

//Output.
console.log('> Download total: '+videoList.length);
console.log('> Starting...');
console.log('');

//Start the download process.
downloadTube.downloadAll(videoList,'./mp3/').then((result)=>{

  console.log('');
  console.log('* DOWNLOAD status *');
  console.log('');  
  console.log(result);

}).catch((error)=>{

  console.log('');
  console.log('* ERROR in download *');
  console.log('');  
  console.log(error);

});