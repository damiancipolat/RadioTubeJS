const fs     = require('fs');
const concat = require('concat-files');

//Load file list.
const getFileList = (path)=>{

  return new Promise((resolve,reject)=>{    

    fs.readdir(path, (err, files) =>{

      let list = [];

      files.forEach(fileName => {
        list.push(fileName);
      });

      resolve(list);

    });

  });

}

//Make a file name with timestamp.
const getFileTimestamp = (filename)=>{

  return Math.floor(Date.now())+'-'+filename;

}

//Concat a list of files, creating a bundle file.
const concatFiles = (fileList,outputFile)=>{

  return new Promise((resolve,reject)=>{

    concat(fileList,outputFile, (err)=>{

        if (err)
          reject(err);
        else
          resolve(outputFile);        

      });

  });

}

module.exports.getFileList      = getFileList;
module.exports.getFileTimestamp = getFileTimestamp;
module.exports.concatFiles      = concatFiles;