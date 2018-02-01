/**
 * Created by wangcong.merrier on 2018/1/31.
 */

var Crawler = require("crawler");
var result = {
  total: 0,
  data: [],
};

// new一个Crawler实例
var c = new Crawler({
  maxConnections: 10,
  // This will be called for each crawled page
  callback: function (error, res, done) {
    if (error) {
      console.log(error);
    } else {
      var $ = res.$;

      // $ is Cheerio by default
      //a lean implementation of core jQuery designed specifically for the server
      var len = $('.hero-portrait-detailed').length;

      result.total = len;

      var updatedAt = new Date().getTime();

      result.updatedAt = updatedAt;

      // 遍历获取英雄英文名称，中文名称，角色定位和人物封面图
      for (var i = 0; i < len; i++) {

        var item = $('.hero-portrait-detailed').eq(i);

        var enName = item.data('hero-id');
        var cnName = item.find('.portrait-title').text();
        var poster = item.find('.portrait').attr('src');
        var infoUrl = 'http://ow.blizzard.cn' + item.attr('href');

        var tempObj = {
          enName,
          cnName,
          poster,
          infoUrl,
        };

        result.data.push(tempObj);
      }
      console.log(result);
      // return result;
    }
    done();
  }
});


c.queue('http://ow.blizzard.cn/heroes/#all');

// console.log('result',result);

// module.exports = details;