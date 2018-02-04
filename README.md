# overwatch-spider

Overwatch Spider with NodeJS + node-crawler

> 该爬虫用于下载[http://ow.blizzard.cn/media/](http://ow.blizzard.cn/media/)和[http://ow.blizzard.cn/heroes/](http://ow.blizzard.cn/heroes/)英雄技能介绍的视频和封面图

## Install

From source:

```
git clone git@github.com:merrier/overwatch-spider.git
cd overwatch-spider
npm install
```

## Usage

### media

```
npm run media
```

> 爬虫会爬取[http://ow.blizzard.cn/media/](http://ow.blizzard.cn/media/)上的视频和对应的封面图并进行下载.

爬虫会在当前目录中新建（如果不存在的话）一个名为`media`的文件夹，爬取的所有图片和视频都将下载在这里，所以当爬取任务完成时，目录结构将类似这样：


```
overwatch-spider
|-- index.js
|-- package.json
|-- ...
|-- media
|   |-- 动画短片：《英雄》.mp4
|   |-- 动画短片：《英雄》.jpg
|   |-- 游戏视频1.mp4
|   |-- ...
```

### ability

```
npm run ability
```

> 爬虫会爬取[http://ow.blizzard.cn/heroes/](http://ow.blizzard.cn/heroes/)上所有英雄的技能介绍视频并进行下载（如果有对应的技能介绍封面图的话，也会进行爬取和下载）

爬虫会在当前目录中新建（如果不存在的话）一个名为`ability`的文件夹，爬取的所有图片和视频都将下载在这里，并按照英雄名称建立新的文件夹，当爬取任务完成时，目录结构将类似这样：


```
overwatch-spider
|-- index.js
|-- package.json
|-- ...
|-- ability
|   |-- 安娜
|   |   |-- 0被动
|   |   |-- 1武器：生物步枪
|   |   |-- 2技能：麻醉镖
|   |   |-- 3技能：生物手雷
|   |   |-- 4大招：纳米激素
|   |-- 半藏
|   |   |-- 0被动
|   |   |-- 1武器：风
|   |   |-- 2技能：音
|   |   |-- 3技能：散
|   |   |-- 4大招：竜
|   |-- ...
```

> 文件夹的名称可以自行修改（代码在`ability.js`中）


## Thanks

* [node-crawler](https://github.com/bda-research/node-crawler)


## Todolist

* nomore, that's all :)

## License

MIT