const { nativeImage } =  require('electron');

 const Net = require('net');
 // The port number and hostname of the server.
 const port = 24015;
 const host = 'localhost'
 // Create a new TCP client.
 const client = new Net.Socket();
 // Send a connection request to the server.
 client.connect({ port, host }, function() {
     console.log('TCP connection established with the server.')
 });
 var i = 0;
 // The client can also receive data from the server by reading from its socket.
 client.on('data', function(chunk) {
     //processchunk(chunk);
     console.log(`Data received from the server: ${chunk.toString()}.`);  
    //  // Request an end to the connection after89 the data has been received.
    //  const data = JSON.parse(chunk);
    //  if(!data.error){
    //     console.log(data.data);
    //     var api = data.data.split(",");
    //     // for (var i in api) 
    //     // {
    //     //     console.log(api[i]);
    //     // }
    //     processapi(parseInt(api[0]),api);
    //  }else{
    //     console.log(data.error);
    //  }
 })
 client.on('end', function() {
     console.log('Requested an end to the TCP connection');
 });

document.getElementById('showImage').addEventListener('click',e =>{
    // const image1 = nativeImage.createFromPath('${__dirname}./../../splash.png')
    // let image1URL = image1.toDataURL();
    // console.log(image1URL);
    // document.getElementById('preview1').src = './../splash.png';
    let i =0;
    while(i<256){
        setTimeout(() => {
        client.write('1,H:\\Project\\master-electron-master\\splash.png,' + i.toString());
        i++;
        }, 10);
    }
    //document.getElementById('preview1').src = '${__dirname}./../../splash.png'
    //document.getElementById('preview2').src = '${__dirname}./../../splash.png'
   console.log(totalTime/256);
})
var totalTime = 0;
var processtime = document.getElementById("time");
var processapi = (apiNo,api)=>{
    switch(apiNo)
    {
        case 1:
          //  alert('connected to server');
            //console.log(api[1]);
            console.log('${__dirname}./../../images/' + api[1]);
            document.getElementById('preview2').src = '${__dirname}./../../images/' + api[1]; 
            processtime.innerHTML = api[2];
            totalTime+=parseInt(api[2]);
            break;
    }
}

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
let api1 ;
slider.oninput = function() {
  output.innerHTML = this.value;
  api1 = '1,H:\\Project\\master-electron-master\\splash.png,' + this.value;
  console.log(api1)
  client.write(api1);
}



