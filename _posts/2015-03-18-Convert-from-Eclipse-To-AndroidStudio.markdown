---
layout: blog
title:  "将Eclipse工程导入到Android Studio"
date:   2015-03-18 10:51:00
categories: Android AndroidStudio
tags: featured AndroidStudio
---

AndroidStudio 兼容Eclipse项目，不过在导入之前需要做一些操作：

* 首先升级ADT到最新版本，google被墙，最好用修改hosts文件的方法可以较好的解决这一问题，下载速度也够快。

* 选择并导出工程，Export选择Android下的Generate Gradle Build Files（实质并没有导出，而是在目录下新增了一个build.gradle文件）

* 随后使用AndroidStudio import 即可

Eclipse 和 Android Studio的区别:

* 二者工程结构不一样，且E不兼容AS的工程
** 我的感觉是AS的目录结构更清爽，与主流框架的结构相似，如maven，Rails
** 另外我也更加喜欢JetBrains公司的IDE，

