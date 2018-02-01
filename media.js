/**
 * Created by wangcong.merrier on 2018/1/29.
 */

var Crawler = require("crawler");
var http = require("http");
var fs = require("fs");
var path = require("path");
var download = require("./download");

// 检测是否为合法的URL地址
function checkUrl(urlString){
  if(urlString !== ""){
    var reg=/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return reg.test(urlString);
  }
  return false;
}

// 解析query string，return一个包含所有key: value的Object
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

// new一个Crawler实例
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

      // 判断是否存在media目录，不存在就创建
      fs.access('./media', (err) => {
        if(err){
          fs.mkdirSync(__dirname + '/media', function (err) {
            if(err)
              throw err;
            console.log('创建目录成功')
          });
        }
      });

      // 遍历获取封面和视频地址，以及视频名称
      for(var i = 0; i< len; i++){

        var dirName = './media';
        var item = $('.media-item').eq(i);
        var query = item.data('flv');

        // 将https地址都替换为http地址，这样可以统一用http模块
        var coverPic = parseQueryString(query)['coverpic'].replace(/^https/, 'http');
        var mp4 = item.data('mp4').replace(/^https/, 'http');

        var title = item.data('title');

        // 不是合法的url地址就不会进行下载
        checkUrl(coverPic) && download(coverPic, title, dirName);
        checkUrl(mp4) && download(mp4, title, dirName);

      }
    }
    done();
  }
});

c.queue('http://ow.blizzard.cn/media/');