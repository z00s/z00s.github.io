---
layout: post
title:  Java8 安装
categories: 编程
keywords: ubuntu, java8, 2015
---

ubuntu默认自带openjdk，但与oracle的jdk有细微的差别，保险起见，我们自然要安装官方的jdk

添加ppa，并更新软件列表
```
sudo add-apt-repository ppa:webupd8team/java

sudo apt-get update
```

安装jdk8，并切换版本
```
sudo apt-get install oracle-java8-installer

sudo update-java-alternatives -s java-8-oracle
```

查看java版本

```
java -version
```

    java version "1.8.0_45"
    Java(TM) SE Runtime Environment (build 1.8.0_45-b14)
    Java HotSpot(TM) 64-Bit Server VM (build 25.45-b02, mixed mode)
    
