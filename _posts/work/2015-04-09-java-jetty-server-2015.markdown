---
layout: post
title:  Java unit test中启用Jetty Server
categories: 工作
keywords: jetty, 2015
---

Jetty 是一个开源的servlet容器，可以为java网络应用提供一个便捷快速的网络和web连接服务。

所谓便捷快速，是因为它以jar包的形式发布，简单易用，默认配置即可满足大部分的需求，嵌入到程序中所需代码非常少。

由于Jetty的易用，易嵌，可扩展，我们常将之用于我们的unit test当中。这里仅就unit test展开讨论。

首先，我们用maven引入jar包，版本可以选择你希望的版本，这里我们只是在test的时候用到它

```xml
<properties>
    <jettyVersion>9.0.2.v20130417</jettyVersion>
</properties>
```

```xml
<dependency>
    <groupId>org.eclipse.jetty.tests</groupId>
    <artifactId>test-loginservice</artifactId>
    <version>9.1.0.M0</version>
    <scope>${jettyVersion}</scope>
</dependency>
```

test的时候我们经常读取JSON数据，另外我们可以使用lombok简化代码，额外jar包

```xml
 <dependency>
    <groupId>org.dbunit</groupId>
    <artifactId>dbunit</artifactId>
    <version>2.4.8</version>
    <scope>test</scope>
    <exclusions>
        <exclusion>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
        </exclusion>
        <exclusion>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
        </exclusion>
    </exclusions>
</dependency>

<dependency>
    <groupId>org.codehaus.jackson</groupId>
    <artifactId>jackson-jaxrs</artifactId>
    <version>1.9.13</version>
</dependency>

<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.14.4</version>
    <scope>provided</scope>
</dependency>
```





