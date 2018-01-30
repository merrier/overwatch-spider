# overwatch-spider

Overwatch Media Spider with NodeJS + node-crawler

> You can use this spider for downloading videos on the http://ow.blizzard.cn/media/.

## Install

From source:

```
git clone git@github.com:merrier/overwatch-spider.git
cd overwatch-spider
```

## Usage

```
npm start
```

> Then the crawler will begin to crawl the video on the http://ow.blizzard.cn/media/ and download the video and the cover asynchronously.

Just a moment, a folder named `overwatch` will be built in the current directory (if it does not exist), which stores downloaded video and cover pictures.Your directory structure may be:

```
overwatch-spider
|-- index.js
|-- package.json
|-- ...
|-- overwatch
|   |-- 动画短片：《英雄》.mp4
|   |-- 动画短片：《英雄》.jpg
|   |-- 游戏视频1.mp4
|   |-- ...
```

## Thanks

* [node-crawler](https://github.com/bda-research/node-crawler)



## Todolist

* nomore, that's all :)

## License

MIT