---
layout: post
title:  Maven Configuration
categories: 编程
keywords: maven，idae，2015
---

# Maven “简”述
简单来讲，Maven是一个项目开发的管理工具。如果细分，具体包括：

- Builds        → 生成jar包、war包
- Documententation    → 
- Reporting       → 生成Sonar报告
- Dependencies      → 最常见，最常用，最让人头疼的
- SCMs          → 
- Releases        → 
- Distribution      →
- Mailing List      → 没用过

> TC: 现如今，程序员已经不愿意，也实在不需要过那种“刀耕火种”的日子了。“不重复造轮子”是新时代的口号， 于是，抱着懒人创造世界的心态，下文尽量用引用 = =b

## Maven Configurations
Maven有三种配置方式：

- MAVEN_OPTS 环境变量
- settings.xml 文件
- .mvn // Located with in the projects top level folder, the files maven.config and extensions.xml contain project specific configuration for running Maven.

> TC: 但凡工具，一定是简化了过程，复杂了配置。学习成本发生了转移，但总体来讲还是简化了开发，提高了效率。

### 常用Config
以下是我们管理maven常见的case：

- Repository Manager - [Using a Repository Manager]
- Setting.xml - [Settings Reference]
- HTTP Proxy - 实际应用中，可以通过hosts破解，直接指向一台代理服务器，从而隐藏代理配置。
- Repo mirror 
- Password Encryption

> TC: 每个管理工具的功能其实都大同小异

### Settings.xml
[Settings Reference]
Setting.xml有两个

> $M2_HOME/conf/settings.xml // [Global] 在解压缩Maven zip之后，可以在以上路径找到
> ${user.home}/.m2/settings.xml // [User] 当前用户根路径
> ! pom.xml // 之所以将pom放到这里，是因为它和上面两个文件共同构成了Maven的基本配置

该文件里面的配置

```xml
    <settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
                          https://maven.apache.org/xsd/settings-1.0.0.xsd">
      <localRepository/> <!-- ${user.home}/.m2/repository；本地repo存储的路径 -->
      <interactiveMode/> <!-- true；TODO -->
      <usePluginRegistry/> <!-- true；TODO -->
      <offline/> <!-- true；TODO -->
      <pluginGroups/> <!-- This list automatically contains org.apache.maven.plugins and org.codehaus.mojo -->
      <servers/> <!-- ；download和deploy的server，[#Servers] -->
      <mirrors/> <!-- ；远程镜像， 国内常用OSChina，也可以用Nexus建立自己的伺服 -->
      <proxies/> <!-- ；当你的类库不在公网上时，需要配置 -->
      <profiles/> <!-- ；activation, repositories, pluginRepositories and properties； ex: sonar profile -->
      <activeProfiles/> <!-- TODO -->
    </settings>
```

## POM i.e. Project Object Model
> In fact, in the Maven world, a project need not contain any code at all, merely a pom.xml -- [POM Reference]

同样，我们来看看POM的top elements

```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://maven.apache.org/POM/4.0.0
                      http://maven.apache.org/xsd/maven-4.0.0.xsd">
  <modelVersion>4.0.0</modelVersion> <!-- That is currently the only supported POM version for both Maven 2 & 3, and is always required. -->
 
  <!-- The Basics -->
  <groupId>...</groupId> <!-- 组织名称，具体命名的规则可以google到，不赘述 -->
  <artifactId>...</artifactId> <!-- 一般是该Project|Module的名称了 -->
  <version>...</version> <!-- 版本号，通俗易懂 -->
  <packaging>...</packaging> <!-- 打包方式，默认jar，pom, jar, maven-plugin, ejb, war, ear, rar, par -->
  <dependencies>...</dependencies>
  <parent>...</parent>
  <dependencyManagement>...</dependencyManagement>
  <modules>...</modules>
  <properties>...</properties>
 
  <!-- Build Settings -->
  <build>...</build>
  <reporting>...</reporting>
 
  <!-- More Project Information -->
  <name>...</name>
  <description>...</description>
  <url>...</url>
  <inceptionYear>...</inceptionYear>
  <licenses>...</licenses>
  <organization>...</organization>
  <developers>...</developers>
  <contributors>...</contributors>
 
  <!-- Environment Settings -->
  <issueManagement>...</issueManagement>
  <ciManagement>...</ciManagement>
  <mailingLists>...</mailingLists>
  <scm>...</scm>
  <prerequisites>...</prerequisites>
  <repositories>...</repositories>
  <pluginRepositories>...</pluginRepositories>
  <distributionManagement>...</distributionManagement>
  <profiles>...</profiles>
</project>
```

> TC: 官网很贴心的给大家归了下类...

### Maven Coordinates
> groupId:artifactId:version

### POM Relationships
- Dependencies (and transitive dependencies)
- Inheritance
- Aggregation

#### Dependencies
[#Dependencies]

- Coordinates(groupId:artifactId:version)
- classifier //TODO
- type(ex. jar)
- scope
  + compile ← default
  + provided 
  + runtime 
  + test 
  + system 
- systemPath
- optional

#### Exclusions

#### Inheritance

#### Aggregation

--------------------------------
累了， 休息会儿


[Hiden-Links-START]:()
[Using a Repository Manager]: https://maven.apache.org/repository-management.html
[Settings Reference]: https://maven.apache.org/settings.html
[#Servers]: https://maven.apache.org/settings.html#Servers
[POM Reference]: https://maven.apache.org/pom.html
[#Dependencies]: https://maven.apache.org/pom.html#Dependencies
