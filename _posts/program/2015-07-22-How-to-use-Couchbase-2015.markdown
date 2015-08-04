---
layout: post
title:  CouchBase的使用02
categories: 编程
keywords: CouchBase, 2015
---
## How to use
Couchbase官方网站，针对不通的语言，为我们提供了相应的SDK和文档说明。
目前支持C、Go、Java、.NET、Node.js、PHP、Python & Ruby...用哪个呢
![用哪个呢](http://www.divideyvenceras.es/galeria/memes/pensativo-meme.png)

## Java SDK 2.1
SDK目前支持的功能

> 此处应有一张盗图

## Hello World
To begin with, we need a jar of couchbase released by official website, we use maven here

```xml
	<dependency>
		<groupId>com.couchbase.client</groupId>
		<artifactId>java-client</artifactId>
		<version>2.1.4</version>
  	</dependency>
```

with this tool, we create a 'hello' sample here

```java
	// Spare some details
	public static void main(String args[]){
        /**
         * with no other arguments provide, this will logically bind it to local server
         * Also you can create a cluster with params, like this
         * Cluster cluster = CouchbaseCluster.create("127.0.0.1"); // same as no args one
         * you dont need to put all nodes here, the client is able to establish initial contact by itself.
         */
        Cluster cluster = CouchbaseCluster.create();

        /**
         * it will connect default bucket without password
         */
        Bucket bucket = cluster.openBucket();

        try {
            // prepare data
            JsonObject user = JsonObject.empty()
                    .put("firstName", "Edwin")
                    .put("lastName", "Zhang")
                    .put("job", "Engineer")
                    .put("age", 20);

            // create JsonDocument
            JsonDocument doc = JsonDocument.create("Edwin", user);
            JsonDocument response = bucket.upsert(doc);

            System.out.println("=================================================");
            System.out.println("successfully upsert, response is here:" + response);
            System.out.println("=================================================");

            JsonDocument edwin = bucket.get("Edwin");
            if (edwin == null) {
                System.out.println("He's quit, Sorry for that.");
            } else {
                System.out.println("Found it:" + edwin);
                System.out.println("You want to know his age? " + edwin.content().getInt("age"));
                System.out.println("=================================================");
                System.out.println("Owh! He's older than that, Lets Change it");
                edwin.content().put("age", 24);
                response = bucket.replace(edwin); // replace old data
                System.out.println("Done! See here:" + response);
            }

        } catch (Exception e) {
            // handle the exception here
            e.printStackTrace();
        } finally {
            // close the cluster
            cluster.disconnect();
        }
    }
```
Unfortunately, its completely synchronous, our application will be waiting until a response comes back. So we need a non-blocking way.

```java

``` 