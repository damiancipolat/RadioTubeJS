const fileHelper = require('./lib/fileHelper.js');
const fs         = require('fs');

//Output folder.
const mp3Path  = './mp3';

//Make bundle file.
let bundleFile = mp3Path+'/bundles/'+fileHelper.getFileTimestamp('bundle.mp3');

//File list.
fileHelper.getFileList(mp3Path).then((fileList)=>{

	//Add path.
	fileList = fileList.map((file)=>mp3Path+'/'+file);

	//Filter only files.
	fileList = fileList.filter((file)=>fs.lstatSync(file).isFile());

	//Output.
	console.log('> Merging files total: '+fileList.length);
	console.log('> Bundle file: '+bundleFile);
	console.log('');

	//Start the merging process.
	fileHelper.concatFiles(fileList,bundleFile).then((result)=>{

	  console.log('');
	  console.log('* CONCAT status *');
	  console.log('');  
	  console.log(result);

	}).catch((error)=>{

	  console.log('');
	  console.log('* ERROR in concat *');
	  console.log('');  
	  console.log(error);

	});

});