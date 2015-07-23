---
layout: post
title:  CouchBase的使用01
categories: 编程
keywords: CouchBase, 2015
---

[CouchBase官网相关文档](http://docs.couchbase.com/)
主要介绍了各个版本的特性，和针对不同的语言所相对应SDK的使用方法

## Preface
本文主要基于CouchBase3.0的文档，概述基本概念与使用中注意的问题，希望能起到引导的作用。具体使用清自行阅读文档。

## Introduction
对CouchBase背景感兴趣的同学可以阅读本段，如果你比较着急，可以自行跳过。

> CouchBase = CouchDB + Membase

CouchDB -> 是一个开源的面向文档的数据库管理系统。
> 1. CouchDB是分布式的数据库
2. CouchDB是面向文档的数据库，存储半结构化的数据，比较类似lucene的index结构
3. 支持REST API，可以让用户使用JavaScript来操作CouchDB数据库，也可以用JavaScript编写查询语句

Membase -> 是一个基于key/value的NoSQL开源项目。
> 1. 持久化，自动将在线数据迁移到低延迟的存储介质的技术
2. 多线程低锁争用
3. 动态再平衡现有集群
4. 支持快速失败转移来提供系统的高可用性

CouchBase作为二者合并而生，自然聚合了二者的优点。所谓优点就应有所比较，而这需要对市面上各类缓存产品有着深入的了解。所以转载网络大牛对于缓存系统的比较心得。
传送门: [Couchbase介绍，更好的Cache系统](http://zhang.hu/couchbase/)

## Installation
[Supported platforms](http://docs.couchbase.com/admin/admin/Install/install-platforms.html)
Windows: 

- 官方下载安装包，不赘述。
- 注意CouchBase安装时会设定使用的内存和硬盘容量，视个人电脑配置、项目需求而定。
- 由于比较占内存，建议CouchBase服务设为手动启动

Lunix: 

- Red Hat/CentOS & Ubuntu/Debian

Mac OS X:

- 土豪，交个朋友吧 

## Management

- Couchbase Web Console
- Command-line Interface (CLI)
- REST API
- client

## Architecture & Concepts

Cluster Manager
> 可以理解为集群的管理中枢，顾名思义，就是负责管理集群的生命周期的。
> 主要负责日志、监控、安全，诸如此类，下面是官方给出的主要功能
> • Cluster management
• Node administration
• Node monitoring
• Statistics gathering and aggregation
• Run-time logging
• Multi-tenancy
• Security for administrative and client access
• Client proxy service to redirect requests