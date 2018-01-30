var http = require("http");
var fs = require("fs");
var path = require("path");
var { URL } = require('url');


export default function download(url, fileName, dirName) {
  console.log("start downloading " + url);
  const options = new URL(url);
  var req = http.request(options, downloadCallback(url, fileName, dirName));
  req.on('error', function(e){
    console.log("request " + url + " error");
  });
  req.end();
}


function downloadCallback(url, fileName, dirName) {

  var callback = function(res) {
    console.log("request: " + url + " return status: " + res.statusCode);

    var contentLength = parseInt(res.headers['content-length']);
    var fileBuff = [];

    res.on('data', function (chunk) {
      var buffer = new Buffer(chunk);
      fileBuff.push(buffer);
    });

    res.on('end', function() {

      console.log("end downloading " + url);

      if (isNaN(contentLength)) {
        console.log(url + " content length error");
        return;
      }
      var totalBuff = Buffer.concat(fileBuff);
      console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
      if (totalBuff.length < contentLength) {
        console.log(url + " download error");
        // startDownloadTask(imgSrc, dirName, index);
        return;
      }
      fs.appendFile(dirName + "/" + fileName + path.extname(url), totalBuff, {mode: 0o777}, function(err){
        console.log(url + " append error");
      });
    });
  };

  return callback;
}
