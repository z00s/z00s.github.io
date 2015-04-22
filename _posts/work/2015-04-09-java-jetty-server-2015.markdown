---
layout: post
title:  Java Jetty Server
categories: 工作
keywords: jetty, 2015
---

Jetty 是一个开源的servlet容器，可以为java网络应用提供一个便捷快速的网络和web连接服务。

所谓便捷快速，是因为它以jar包的形式发布，简单易用，默认配置即可满足大部分的需求，嵌入到程序中所需代码非常少。

由于Jetty的易用，易嵌，可扩展，我们常将之用于我们的unit test当中。

首先，我们用maven引入jar包

```xml
<dependency>
    <groupId>org.eclipse.jetty.tests</groupId>
    <artifactId>test-loginservice</artifactId>
    <version>9.1.0.M0</version>
    <scope>test</scope>
</dependency>
```