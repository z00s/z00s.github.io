---
layout: post
title:  CouchBase的使用01
categories: 编程
keywords: CouchBase, 2015
---

## Preface
本文主要基于CouchBase3.0的文档，概述基本概念与使用中注意的问题，希望能起到引导的作用。具体使用清自行阅读文档。
[CouchBase官网相关文档](http://docs.couchbase.com/)
主要介绍了各个版本的特性，和针对不同的语言所相对应SDK的使用方法

## Introduction
对CouchBase背景感兴趣的同学可以阅读本段，如果你比较着急，可以自行跳过。

> CouchBase = CouchDB + Membase

CouchDB -> 是一个开源的面向文档的数据库管理系统。

> 1. CouchDB是分布式的数据库
> 2. CouchDB是面向文档的数据库，存储半结构化的数据，比较类似lucene的index结构
> 3. 支持REST API，可以让用户使用JavaScript来操作CouchDB数据库，也可以用JavaScript编写查询语句

Membase -> 是一个基于key/value的NoSQL开源项目。

> 1. 持久化，自动将在线数据迁移到低延迟的存储介质的技术
> 2. 多线程低锁争用
> 3. 动态再平衡现有集群
> 4. 支持快速失败转移来提供系统的高可用性

CouchBase作为二者合并而生，自然聚合了二者的优点。所谓优点就应有所比较，而这需要对市面上各类缓存产品有着深入的了解。所以转载网络大牛对于缓存系统的比较心得。
传送门: [Couchbase介绍，更好的Cache系统](http://zhang.hu/couchbase/)

## Installation
[Supported platforms](http://docs.couchbase.com/admin/admin/Install/install-platforms.html)
Windows: 

> + 官方下载安装包，不赘述。
> + 注意CouchBase安装时会设定使用的内存和硬盘容量，视个人电脑配置、项目需求而定。
> + 由于比较占内存，建议CouchBase服务设为手动启动

Lunix: 

> + Red Hat/CentOS & Ubuntu/Debian

Mac OS X:

> + 土豪，交个朋友吧 
> ![交个朋友吧](http://2d.zol-img.com.cn/product/87/919/ce45drbn3kUU.png)

## Management

> + Couchbase Web Console
> + Command-line Interface (CLI)
> + REST API
> + client

## Architecture & Concepts

Cluster Manager

> 可以理解为集群的管理中枢，顾名思义，就是负 责管理集群的生命周期的。
> 主要负责日志、监控、安全，诸如此类，下面是官方给出的主要功能
> • Cluster management
> • Node administration
> • Node monitoring
> • Statistics gathering and aggregation
> • Run-time logging
> • Multi-tenancy
> • Security for administrative and client access
> • Client proxy service to redirect requests

Nodes(or Couchbase Server)
> 一个CouchBase Server的实例，部署在PC，VM或者云端
>  Node应该是identical的，提供数据访问读写功能，给外部提供一系列的接口
> 官网上对于Node与Cluster Manager的关系是这样描述的 
> `Every node within a Couchbase cluster includes the Cluster Manager component`

Cluster
> 集群简单理解就是一群Node(≥1)
> 一个cluster中的Nodes对外提供相同的，同时相互间是对等的，没有主从之分
> 这使得每个Node都可以对整个cluster做管理，分析之类的操作
> Cluster的Node是可以增加删除的，对等性保证了Cluster内部良好的伸缩性
> 而用户的数据在每个Node中又是以一个个vBucket存储的

vBuckets
> vBucket可以简单理解为一个数据集，独自占有Node为它开辟的一块空间
> vBucket更像是一个个集装箱，它的存在使得Node之间数据备份更有效
> vBucket对用户是不可见的，但是它却是Couchbase中最重要的一个组件
> vBucket直译为桶，我们的数据为文件的形式保存在这些桶里面
> Cluster里每个桶都有自己的编号，分布在不同的Node，Couchbase使用Hash算法计算你的数据存储的位置
> Cluster维护一个全局的 vBucket 与服务器对应表，而不是简单的指向server，[详解](http://zhang.hu/couchbase/)
> ![vBuckets示意图](http://docs.couchbase.com/admin/admin/images/vbuckets.png)
> 盗图于[vBuckets官方文档](http://docs.couchbase.com/admin/admin/Concepts/concept-vBucket.html)

Rack Awareness
> 翻译为机架感知，主要负责负载均衡，是企业版收费功能
> 数据备份的管理和单点失效处理

## Summary
1. 数据动态分散
2. 单点失效处理，不会造成数据404
3. 良好的扩展弹性