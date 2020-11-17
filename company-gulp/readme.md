---
title: ios 冒泡 bug
date: 2016-12-24 16:31:35
tags: ios
---

## 问题
``` js
document.on('click','.aaa',function(){
    //如果.aaa不是img a 的时候不触发
});
```
在ios里点击事件,使用事件代理到 `document` 或`body`,不能触发
<!-- more -->

## 原因
ios 系统bug

## 解决方案
* 给​目标元素加一条样式规则 `{cursor: pointer}`;
* 事件代理到body下面的容器