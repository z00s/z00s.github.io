---
layout: post
title:  使用XShell轻松管理Openshift
categories: 工具
keywords: pac,2016
---

## Openshift
折腾Openshift有段时间了，暂时完全可以满足我的需求。当然既然是PaaS平台，总归是有局限性，不如直接使用云端主机来的轻松。但Openshift免费配额足够你做很多事情，无论是搭建Nexus还是放个人博客。

## XShell
XShell和其文件管理工具Xftp可以使我们的远端开发更为便利。当然，基本的命令行也很重要，但效率在开发过程中也不能忽视。

## 连接
既然是使用ssh连接openshift，我们就需要在二者之间建立安全的连接。

> Intellj IDEA 支持直接连接部署App，这里不赘述，请自行Google。<br>
> ssh的知识也请自行查阅

### 创建密钥对
使用Xshell创建密钥对，并通过访问openshift粘贴公钥至远端

> !此处应配图

### 本地新建session
假如你的Source Code地址如下，可以在Applications页面找到

> ssh://123b000b7654e789df0000a4@appName-domin.rhcloud.com/~/git/repoName.git/

注意以下几点：
1. 用户名为 123b000b7654e789df0000a4
2. Host为appName-domin.rhcloud.com
3. 密码为你生成密钥时的密码

### 连接
连接时会自动跳出登陆界面，并要求输入密码

### XFtp
Xshell下的FTP应用，可以很安全便利的传送文件。

## 参考连接
[使用XSHELL连接和登录、管理OpenShift空间]


[使用XSHELL连接和登录、管理OpenShift空间]:(http://www.i6969.cn/archives/252.html)