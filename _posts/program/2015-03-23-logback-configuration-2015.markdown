---
layout: post
title:  logback configuration
categories: 编程
keywords: logback,2015
---

## logback简介

Logback是一个由log4j创始人设计的，可靠、通用、快速、灵活的Java日志框架

所需jar包
	
	- logback-core-0.9.29.jar 		基础，核心
	- logback-classic-0.9.29.jar 	是core的扩展，与其他框架集成
	- slf4j-api-1.6.1.jar 			classic依赖于slf4j.jar
	- logback-access-0.9.29.jar 	与servlet容器集成

pom.xml

```html
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-classic</artifactId>
	<version>1.1.2</version>
</dependency>
	
<dependency>
	<groupId>ch.qos.logback</groupId>
	<artifactId>logback-access</artifactId>
	<version>1.0.3</version>
</dependency>
	
<dependency>
	<groupId>org.slf4j</groupId>
	<artifactId>jul-to-slf4j</artifactId>
	<version>1.7.6</version>
</dependency>
```

在src目录下建立logback.xml

	- logback首先会尝试查找logback.groovy文件
	- 当没有找到时，继续查找logback-test.xml文件 
	- 当没有找到时，继续查找logback.xml文件
	- 都找不到，将默认输出控制台

这里新建一个最简单的例子，默认情况下控制台会输出Debug等级以下的log

``` java
package logbackDemo;

import org.slf4j.LoggerFactory;

import ch.qos.logback.classic.Logger;

public class LogbackDemo {
	// 工厂生成一个logger
	private static Logger logger = (Logger) LoggerFactory
			.getLogger(LogbackDemo.class);

	public static void main(String[] args) {

		logger.trace("======trace");
		logger.debug("======debug");
		logger.info("======info");
		logger.warn("======warn");
		logger.error("======error");

	}
}
```

----------------> 延伸级别继承


##　配置logback.xml

根节点`<configuration>`， 它有三个子节点

- appender
- logger
- root

`logger` 用来设置某个包的的日志打印级别

- name 				指定该`logger`作用的一个包或者是类
- level				TRACE, DEBUG, INFO, WARN, ERROR, ALL, OFF
- addivity 			是否向上级传递打印信息，默认为`true`

`root` 只有一个`level`属性的`loger`，它可以有零个或多个`appener-ref`元素， 默认`level`为`DEBUG`

- appener-ref		`ref`属性设置对应`appener`的`name`，结合定义`appener`的打印级别

`appender` 主要负责写日志，有两个必要的属性`name` & `class`
`appender` 有很多种

- ConsoleAppender 		控制台输出
- FileAppender			文件输出,可以设置在文件尾继续写还是覆盖文件
- RollingFileAppender	滚动文件输出，先记录到指定文件，当符合某个条件时保存到其他文件，如每天生产一个文件，只保存最近一个月的文件
- SMTPAppender			发送日志邮件
- ... 还有很多，具体的可以在附件及链接地址中查找

使用Sample

控制台：

``` html
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE logback>
<!-- 根节点 -->
<configuration>
	<!-- appender节点 -->
    <!-- stdout.log -->
    <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
        <encoder>
            <!-- <pattern>[%t] [%F:%L] - %m</pattern> -->
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
        <target>System.out</target>
    </appender>
    
    <!-- loger节点 -->
    <logger name="logbackDemo" level="ERROR" additivity="false">
    	<appender-ref ref="stdout" />
    </logger>
    <logger name="logbackDemo.LogbackDemo" level="INFO" additivity="true">
    	<appender-ref ref="stdout" />
    </logger>
    
    <!-- root节点 -->
    <root level="DEBUG">
        <appender-ref ref="stdout" />
    </root>
</configuration>
```

文件:

```html
<!-- file -->
<appender name="FILE" class="ch.qos.logback.core.FileAppender">
<file>E:/testFile.log</file>
<append>false</append>
<encoder class="ch.qos.logback.core.encoder.LayoutWrappingEncoder">
	<layout class="logback.MySampleLayout" >
		<prefix>这里显示自定义前缀</prefix>
	</layout>
</encoder>
</appender>
```

邮件:pom.xml中需要引入两个依赖jar包

```html
<!-- email -->
<dependency>
	<groupId>javax.mail</groupId>
	<artifactId>mail</artifactId>
	<version>1.4.7</version>
</dependency>

<dependency>
	<groupId>javax.activation</groupId>
	<artifactId>activation</artifactId>
	<version>1.1.1</version>
</dependency>
```

``` html
<!-- email -->
<appender name="EMAIL" class="ch.qos.logback.classic.net.SMTPAppender">
	<smtpHost>发送邮件邮箱服务器</smtpHost>
	<username>用户名</username>
	<password>密码</password>
	<to>目的邮箱</to>
	<from>发送邮箱</from>
	<subject>标题</subject>
	<layout class="ch.qos.logback.classic.PatternLayout">
  		<pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
	</layout>
</appender>
```

传送门 [logback mannual](http://logback.qos.ch/manual/)