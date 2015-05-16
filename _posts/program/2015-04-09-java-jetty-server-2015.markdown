---
layout: post
title:  Java unit test中启用Jetty Server
categories: 编程
keywords: jetty, 2015
---

Jetty 是一个开源的servlet容器，可以为java网络应用提供一个便捷快速的网络和web连接服务。

所谓便捷快速，是因为它以jar包的形式发布，简单易用，默认配置即可满足大部分的需求，嵌入到程序中所需代码非常少。

由于Jetty的易用，易嵌，可扩展，我们常将之用于我们的unit test当中。这里仅就unit test展开讨论。

首先，我们用maven引入jar包，版本可以选择你希望的版本(你可以在[Jetty官网](http://www.eclipse.org/jetty/documentation/)上找到相关版本号)。

```xml
<properties>
    <jettyVersion>9.0.2.v20130417</jettyVersion>
</properties>
```

```xml
<dependency>
    <groupId>org.eclipse.jetty</groupId>
    <artifactId>jetty-server</artifactId>
    <version>${jettyVersion}</version>
    <scope>test</scope>
</dependency>
```

如果我们在maven框架下使用jetty plugin,运行mvn jetty:run等命令, 须配置

```xml
<build>
    <plugins>
      <plugin>
        <groupId>org.eclipse.jetty</groupId>
        <artifactId>jetty-maven-plugin</artifactId>
        <version>${jettyVersion}</version>
      </plugin>
    </plugins>
</build>
```

jetty针对spring框架有代码嵌入和xml配置两种方式，这里我们只是在test的时候用到它。
另外，test的时候我们经常读取JSON数据，所以引入jackson的包，我们也可以使用lombok简化代码，额外jar包如下：

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

我们定义一个简单的请求来方便JSON文件转化为http请求

```java
package com.mozs.api.mymaven;

import lombok.Getter;
import lombok.Setter;

/**
 * 
 * @author zhangshuai
 *
 */
@Getter
@Setter
public class SimpleRequest {
    /**
     * method (GET, POST)
     */
    private String method;

    /**
     * uriPath ('/object/create/', '/object/get/', '/object/update/' ...)
     */
    private String uriPath;

    /**
     * request parameter / json
     */
    private String jsonRequest;

    /**
     * request parameter / csv
     */
    private String csvContent;
}
```

将jetty嵌入到java代码中，我们需要继承AbstractHandler，并重写handle方法，里面我们处理

```java
package com.mozs.api.mymaven;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.eclipse.jetty.server.Request;
import org.eclipse.jetty.server.handler.AbstractHandler;

/**
 * a jetty server handler that can accept request and return response
 *
 */
public class JettyServerHandler extends AbstractHandler {
    
    public JettyServerHandler() {
    }

    @Override
    public void handle(String target, Request baseRequest, HttpServletRequest request,
            HttpServletResponse response) throws IOException, ServletException {
        try {
            // 处理请求
            generateRequest(baseRequest);
            
            response.setContentType("application/json;charset=utf-8");
            response.setStatus(200);
            baseRequest.setHandled(true);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    private SimpleRequest generateRequest(Request baseRequest) throws Exception{

        SimpleRequest result = new SimpleRequest();

        result.setMethod(baseRequest.getMethod());
        result.setUriPath(baseRequest.getPathInfo());

        if ("GET".equals(result.getMethod())) {
            // 解析get后面的参数
            result.setJsonRequest(TestUtil.convertRequestToJson(baseRequest.getQueryString()));
        
        } else if ("POST".equals(result.getMethod())) {
            // 解析post传入参数
        }
        
        return result;
    }

}
```



