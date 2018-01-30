/**
 * Created by wangcong.merrier on 2018/1/29.
 */

var Crawler = require("crawler");
var http = require("http");
var fs = require("fs");
var path = require("path");
const { URL } = require('url');

function checkUrl(urlString){
  if(urlString !== ""){
    var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return reg.test(urlString);
  }
  return false;
}

function parseQueryString(flv){
  var reg = /(([^?&=]+)(?:=([^?&=]*))*)/g
  var result = {}
  var match = reg.exec(flv)
  var key
  var value
  while (match) {
    key = match[2]
    value = match[3] || ''
    result[key] = decodeURIComponent(value)
    match = reg.exec(flv)
  }
  return result
}

function downloadCoverPicCallback(coverPic, title, dirName) {
  var callback = function(res) {
    console.log("request: " + coverPic + " return status: " + res.statusCode);

    var contentLength = parseInt(res.headers['content-length']);
    var fileBuff = [];

    res.on('data', function (chunk) {
      var buffer = new Buffer(chunk);
      fileBuff.push(buffer);
    });

    res.on('end', function() {

      console.log("end downloading " + coverPic);

      if (isNaN(contentLength)) {
        console.log(coverPic + " content length error");
        return;
      }
      var totalBuff = Buffer.concat(fileBuff);
      console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
      if (totalBuff.length < contentLength) {
        console.log(coverPic + " download error");
        // startDownloadTask(imgSrc, dirName, index);
        return;
      }
      fs.appendFile(dirName + "/" + title + path.extname(coverPic), totalBuff, {mode: 0o777}, function(err){
        console.log(coverPic + " append error");
      });
    });
  };

  return callback;
}

function downloadMp4Callback(mp4, title, dirName) {
  var callback = function(res) {
    console.log("request: " + mp4 + " return status: " + res.statusCode);
    var contentLength = parseInt(res.headers['content-length']);
    var fileBuff = [];

    res.on('data', function (chunk) {
      var buffer = new Buffer(chunk);
      fileBuff.push(buffer);
    });

    res.on('end', function() {
      console.log("end downloading " + mp4);
      if (isNaN(contentLength)) {
        console.log(mp4 + " content length error");
        return;
      }

      var totalBuff = Buffer.concat(fileBuff);
      console.log("totalBuff.length = " + totalBuff.length + " " + "contentLength = " + contentLength);
      if (totalBuff.length < contentLength) {
        console.log(mp4 + " download error");
        // startDownloadTask(imgSrc, dirName, index);
        return;
      }
      fs.appendFile(dirName + "/" + title + path.extname(mp4), totalBuff, {mode: 0o777}, function(err){
        console.log(mp4 + " append error");
      });
    });
  };

  return callback;
}


var downloadCoverPic = function(coverPic, title, dirName) {
  console.log("start downloading " + coverPic);
  const options = new URL(coverPic);
  var req = http.request(options, downloadCoverPicCallback(coverPic, title, dirName));
  req.on('error', function(e){
    console.log("request " + coverPic + " error, try again");
    // startDownloadTask(imgSrc, dirName, index);
  });
  req.end();
}


var downloadMp4 = function(mp4, title, dirName) {
  console.log("start downloading " + mp4);
  const options = new URL(mp4);
  var req = http.request(options, downloadMp4Callback(mp4, title, dirName));
  req.on('error', function(e){
    console.log("request " + mp4 + " error, try again");
    // startDownloadTask(imgSrc, dirName, index);
  });
  req.end();
}


var c = new Crawler({
  maxConnections : 10,
  // This will be called for each crawled page
  callback : function (error, res, done) {
    if(error){
      console.log(error);
    }else{
      var $ = res.$;
      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      var len = $('.media-item').length;

      fs.access('./overwatch', (err) => {
        if(err){
          fs.mkdir(__dirname + '/overwatch', function (err) {
            if(err)
              throw err;
            console.log('创建目录成功')
          });
        }
      });

      for(var i = 0; i< len; i++){

        var dirName = './overwatch';
        var item = $('.media-item').eq(i);
        var query = item.data('flv');
        var coverPic = parseQueryString(query)['coverpic'].replace(/^https/, 'http');
        var mp4 = item.data('mp4').replace(/^https/, 'http');
        var title = item.data('title');

        checkUrl(coverPic) && downloadCoverPic(coverPic, title, dirName);
        checkUrl(mp4) && downloadMp4(mp4, title, dirName);

      }
    }
    done();
  }
});

c.queue('http://ow.blizzard.cn/media/');