# RadioTubeJS

![N|Solid](https://github.com/damiancipolat/RadioTubeJS/blob/master/doc/radio.jpg?raw=true)

This project is about to create a radio-online using Node.js and fetching the content from youtube, downloading the audio from the videos, using the library ffmpeg to process and decode.

The project are divided in two sections a collector and the streaming server:

- **Collector**: 

  Is a process witch consume a json file with the youtube videoIds to download the files in a .mp3. The process can merge all     the files in a bundle file, this will be used to streaming the audio in the radio.

  Install and run:
  
  ```sh   
   $ cd /collector
   $ npm install
   
   #Download the audio from videos in the file video_files.json
   $ npm run download
   
   #Merge all
   $ npm run concat
  ```

- **Server streaming**:

  Is a audio streaming server, that have a start a streaming of the bundle file created with the collector process.
    
  Install and run:
  
  ```sh   
   $ cd /server
   $ npm install
   
   #Start
   $ npm start
  ```
  To try the server you can open a browser and enter to this url:
  http://127.0.0.1:9090/ or using VLC player you can load this url and play the streaming from them.

  *Note: this server every time when you connect will play the audio from the begining, is'nt a continous streaming.*
  

- **Server Radio**:

  Pending, is a continous streaming. When you connect to this streaming the server will stream the audio that are playing in   this momen, is diferent to the previous server.
