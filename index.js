/**
 * Created by wangcong.merrier on 2018/1/29.
 */


const https = require('https');

https.get('https://overwatch-api.net/api/v1/hero', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


// var http = require('http');
// var fs = require('fs');
// var path = require('path');
//
//
// http.get('http://overwatch-api.net/api/v1/hero', function(res) {
//   console.log("statusCode: ", res.statusCode);
//   console.log("headers: ", res.headers);
//
//   res.on('data', function(d) {
//
//     console.log(d)
//     // process.stdout.write(d);
//   });
//
//   res.on('end', function(d) {
//     console.log('end', d)
//   })
//
// }).on('error', function(e) {
//   console.error(e);
// });