---
layout: post
title:  Maven Configuration
categories: 编程
keywords: maven，idae，2015
---

Eclipse用惯了，换成Idea多少需要折腾一下。对于maven工程，Idea自带了maven插件，不用再像E一样安装。不过其他的配置还是类似的。

1. 安装
[官网下载Maven](http://maven.apache.org/)
解压到自己指定的文件夹下， for example `F:\mozs\apache-maven-3.1.1-bin`
并配置环境变量，不赘述。


2. 配置
Maven缺省的本地仓库位置： `${user.home}/.m2/repository` 
默认配置位置： `${user.home}/.m2/settings.xml`

可以在settings里面指定本地仓库位置，并在Idea中设置

``` xml
<?xml version="1.0" encoding="UTF-8"?>

<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0 http://maven.apache.org/xsd/settings-1.0.0.xsd">
  <!-- b本地repo -->
  <localRepository>F:/mozs/mvn/repo</localRepository>

  <pluginGroups></pluginGroups>

  <proxies></proxies>

  <servers></servers>

  <!-- 使用oschina的镜像 -->
  <mirrors>
       <mirror>
          <id>CN</id>
          <name>OSChina Central</name>
          <url>http://maven.oschina.net/content/groups/public/</url>
          <mirrorOf>external:*,!repo-osc-thirdparty</mirrorOf>
      </mirror>
  </mirrors>

  <profiles>
    <!-- 配置pofile -->
      <profile>
          <id>profile-default</id>
          <repositories>
              <repository>
                  <id>central</id>
                  <url>http://central</url>
                  <releases>
                      <enabled>true</enabled>
                  </releases>
                  <snapshots>
                      <enabled>false</enabled>
                  </snapshots>
              </repository>
              <repository>
                  <id>repo-osc-thirdparty</id>
                  <url>http://maven.oschina.net/content/repositories/thirdparty/</url>
                  <releases>
                      <enabled>true</enabled>
                  </releases>
                  <snapshots>
                      <enabled>false</enabled>
                  </snapshots>
              </repository>
          </repositories>
          <pluginRepositories>
              <pluginRepository>
                  <id>central</id>
                  <url>http://central</url>
                  <releases>
                      <enabled>true</enabled>
                  </releases>
                  <snapshots>
                      <enabled>false</enabled>
                  </snapshots>
              </pluginRepository>
          </pluginRepositories>
      </profile>
    </profiles>

    <activeProfiles>
        <activeProfile>profile-default</activeProfile>
    </activeProfiles>
</settings>

```

3. 自定义开发库
我们可以使用Nexus自定义内部的开发库，这里是Nexus[安装配置](http://www.cnblogs.com/dycg/archive/2013/05/29/3106968.html)和[自定义仓库](http://www.cnblogs.com/dycg/archive/2013/05/29/3105927.html)教程，感谢原作者整理。

4. Idea 配置和Demo
[See here](http://www.open-open.com/lib/view/open1388650391891.html)
