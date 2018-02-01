/**
 * Created by wangcong.merrier on 2018/1/31.
 */

var Crawler = require("crawler");
var http = require("http");
var fs = require("fs");
var path = require("path");
var download = require("./download");
// var details = require("./details");

// TODO: 目前为写死，后期会改成从官网读取这些信息
var details = {
  total: 26,
  data: [{
    enName: 'doomfist',
    cnName: '末日铁拳',
    poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/doomfist.png',
    infoUrl: 'http://ow.blizzard.cn/heroes/doomfist'
  },
    {
      enName: 'genji',
      cnName: '源氏',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/genji.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/genji'
    },
    {
      enName: 'mccree',
      cnName: '麦克雷',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/mccree.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/mccree'
    },
    {
      enName: 'pharah',
      cnName: '法老之鹰',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/pharah.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/pharah'
    },
    {
      enName: 'reaper',
      cnName: '死神',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/reaper.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/reaper'
    },
    {
      enName: 'soldier-76',
      cnName: '士兵：76',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/soldier-76.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/soldier-76'
    },
    {
      enName: 'soldier-76',
      cnName: '黑影',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/sombra.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/sombra'
    },
    {
      enName: 'tracer',
      cnName: '猎空',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/tracer.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/tracer'
    },
    {
      enName: 'bastion',
      cnName: '堡垒',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/bastion.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/bastion'
    },
    {
      enName: 'hanzo',
      cnName: '半藏',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/hanzo.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/hanzo'
    },
    {
      enName: 'junkrat',
      cnName: '狂鼠',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/junkrat.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/junkrat'
    },
    {
      enName: 'mei',
      cnName: '美',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/mei.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/mei'
    },
    {
      enName: 'torbjorn',
      cnName: '托比昂',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/torbjorn.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/torbjorn'
    },
    {
      enName: 'widowmaker',
      cnName: '黑百合',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/widowmaker.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/widowmaker'
    },
    {
      enName: 'dva',
      cnName: 'D.Va',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/dva.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/dva'
    },
    {
      enName: 'orisa',
      cnName: '奥丽莎',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/orisa.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/orisa'
    },
    {
      enName: 'reinhardt',
      cnName: '莱因哈特',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/reinhardt.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/reinhardt'
    },
    {
      enName: 'roadhog',
      cnName: '路霸',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/roadhog.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/roadhog'
    },
    {
      enName: 'winston',
      cnName: '温斯顿',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/winston.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/winston'
    },
    {
      enName: 'zarya',
      cnName: '查莉娅',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/zarya.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/zarya'
    },
    {
      enName: 'ana',
      cnName: '安娜',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/ana.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/ana'
    },
    {
      enName: 'lucio',
      cnName: '卢西奥',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/lucio.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/lucio'
    },
    {
      enName: 'mercy',
      cnName: '天使',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/mercy.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/mercy'
    },
    {
      enName: 'moira',
      cnName: '莫伊拉',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/moira.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/moira'
    },
    {
      enName: 'symmetra',
      cnName: '秩序之光',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/symmetra.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/symmetra'
    },
    {
      enName: 'zenyatta',
      cnName: '禅雅塔',
      poster: 'http://overwatch.nos.netease.com/1/assets/img/pages/heroes/list/zenyatta.png',
      infoUrl: 'http://ow.blizzard.cn/heroes/zenyatta'
    }],
  updatedAt: 1517452957575
};


// 防止没有trim方法
if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

// 通过英雄英文名生成用于crawler的url list
function genUrlListWithHeroName(arr) {
  if (Object.prototype.toString.call(arr) === '[object Array]' && arr.length) {
    return arr.map(function (value) {
      return 'http://ow.blizzard.cn/heroes/' + value;
    })
  }
  return null;
}


// 通过获取的details信息生成用于crawler的url list
function genUrlListWithDetails(arr) {
  return arr.map(function (value) {
    return value.infoUrl;
  })
}


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
      var len = $('.ability-showcase-video').length;
      var heroName = $('.hero-name').eq(0).text();

      // 判断是否存在该英雄名称的目录，不存在就创建，目录的创建都采取了同步的方式，以免造成目录找不到而报错
      fs.access('./ability/' + heroName, (err) => {
        if (err) {
          fs.mkdirSync(__dirname + '/ability/' + heroName);
        }
      });

      // 遍历获取该英雄封面和视频地址，以及技能名称，每遍历一次就对应着该英雄的一个技能
      for (var i = 0; i < len; i++) {

        // 利用闭包，解决目录创建异步问题
        (function (arg) {

          var abilityName = '';
          var ability = $('.ability-showcase-button').eq(arg).data('ability-name').trim();

          // 技能的文件夹名称，可自行更改
          if (arg === 0) {
            abilityName = '0被动';
          } else if (arg === 1) {
            abilityName = '1武器：' + ability;
          } else if (arg === len - 1) {
            abilityName = arg + '大招：' + ability;
          } else {
            abilityName = arg + '技能' + '：' + ability;
          }

          // 判断是否存在该技能名称的目录，不存在就创建
          fs.access('./ability/' + heroName + '/' + abilityName, (err) => {
            if (err) {
              fs.mkdirSync(__dirname + '/ability/' + heroName + '/' + abilityName);
            }
          });

          var item = $('.ability-showcase-video').eq(arg);
          var poster = item.attr('poster'); // 人物封面图
          var source = item.find('source'); // 人物介绍视频，有可能有两个，所以需要进行遍历

          // 下载人物介绍视频
          for (var j = 0; j < source.length; j++) {
            var video = source.eq(j).attr('src').replace(/^https/, 'http');

            download(video, '技能介绍', './ability/' + heroName + '/' + abilityName);
          }

          // 下载封面图
          if (poster !== undefined) {
            download(poster.replace(/^https/, 'http'), '技能封面图', './ability/' + heroName + '/' + abilityName);
          }
        })(i);
      }
    }
    done();
  }
});

// 判断是否存在ability目录，不存在就创建
fs.access('./ability', (err) => {
  if (err) {
    fs.mkdirSync(__dirname + '/ability');
  }
});

// c.queue(['http://ow.blizzard.cn/heroes/doomfist']);
c.queue(genUrlListWithDetails(details['data']));