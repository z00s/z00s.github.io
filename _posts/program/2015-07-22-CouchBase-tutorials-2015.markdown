How to use
===
有了前面的概念，我们来了解一下如何使用couchbase，这里我们列举常用的三种方式，仅供参考，具体视项目而定。

 1. Web console
 2. 官方SDK
 3. Spring Data Couchbase
 4. Ohters ...

----------

### №1. Web Console
这是Couchbase自带的、最方便、最直观的管理工具。在你安装完成后，它会自动弹出在你的默认浏览器。前文讲到的Couchbase cluster, Nodes, Data Buckets还有Views，这些你都可通过网页进行管理。另外还提供了内存，硬盘的使用情况，支持日志的收集分析，也提供了一些sample的安装，可以很好的帮助你理解couchbase的工作原理。

----------

### №2. 官方SDK
Couchbase官方网站，针对不通的语言，为我们提供了相应的SDK和文档说明。目前支持C、Go、Java、.NET、Node.js、PHP、Python & Ruby ...
![用哪个呢](http://www.divideyvenceras.es/galeria/memes/pensativo-meme.png)

### Java SDK 2.1

SDK目前支持的功能

> 此处应有一张盗图

#### Hello World
首先，我们需要引用官方的jar包

```xml
<dependency>
    <groupId>com.couchbase.client</groupId>
    <artifactId>java-client</artifactId>
    <version>${VERSION}</version> // 目前最新版本是2.1.4
</dependency>
```

> If you import the dependency, the following transitive dependencies are also added:

> - core-io: our internal core library, which abstracts lots of Couchbase-specific behavior in a message-oriented way.
> - RxJava: a foundational library to build powerful reactive and asynchronous applications.

这里我们有一个简单的sample，大体了解一下怎么使用这个jar包

```java
    // Spare some details
    public static void main(String args[]){
        /**
         * 1. with no other arguments provide, this will logically bind it to local server
         * 2. Also you can create a cluster with params, like this
         * Cluster cluster = CouchbaseCluster.create("127.0.0.1"); // same as no args one
         * 3. you dont need to put all nodes here, the client is able to establish initial contact by itself.
         */
        Cluster cluster = CouchbaseCluster.create();

        /**
         * it will connect default bucket without password
         */
        Bucket bucket = cluster.openBucket();

        try {
            // 1. prepare data
            JsonObject user = JsonObject.empty()
                    .put("firstName", "Edwin")
                    .put("lastName", "Zhang")
                    .put("job", "Engineer")
                    .put("age", 20);

            // 2. create JsonDocument
            JsonDocument doc = JsonDocument.create("Edwin", user);
            // 3. upsert 
            JsonDocument response = bucket.upsert(doc);

            System.out.println("=================================================");
            System.out.println("successfully upsert, response is here:" + response);
            System.out.println("=================================================");

            // 4. get from couchbase
            JsonDocument edwin = bucket.get("Edwin");
            if (edwin == null) {
                System.out.println("He's quit, Sorry for that.");
            } else {
                System.out.println("Found it:" + edwin);
                System.out.println("You want to know his age? " + edwin.content().getInt("age"));
                System.out.println("=================================================");
                System.out.println("Owh! He's older than that, Lets Change it");
                edwin.content().put("age", 24);
                // 5. replace
                response = bucket.replace(edwin); // replace old data
                System.out.println("Done! See here:" + response);
            }

        } catch (Exception e) {
            // handle the exception here
            e.printStackTrace();
        } finally {
            // 6. close the cluster
            cluster.disconnect();
        }
    }
```
上面的例子是一个最简单的demo，总结一下：

 1. 连接cluster，默认连本地
 2. 打开bukcket，默认连default
 3. 数据操作
 4. 关闭数据源

它最大的缺点是它是同步的，这就要求我们的App一定要等到couchbase返回数据我们才能继续后面的操作，这会极大的影响我们的效率。所以改进一下

```java
bucket.async()
    .get("Edwin")
    .flatMap(new Func1<JsonDocument, Observable<JsonDocument>>() {
        @Override
        public Observable<JsonDocument> call(final JsonDocument edwin) {
            edwin.content().put("age", 24);
            return bucket.async().replace(edwin);
        }
    })
    .subscribe(new Action1<JsonDocument>() {
        @Override
        public void call(final JsonDocument updated) {
            System.out.println("Updated: " + updated);
        }
    });
``` 
这里用到了Rxjava的有关知识，请查阅[大头鬼Bruce的这篇博客](http://blog.csdn.net/lzyzsd/article/details/41833541)，写的很详细。如果你使用了java8，你可以让你的代码看起来更简洁一些。

```java
bucket
    .async()
    .get("walter")
    .flatMap(edwin-> {
        edwin.content().put("age", 24);
        return bucket.async().replace(edwin);
    })
    .subscribe(updated -> System.out.println("Updated: " + updated));
```


----------


### №3. Spring Data Couchbase
Spring-data-coubase是Spring Data的一个社区项目，目前已更新到release-1.3.2。像其他Spring Data项目一样，它让你更简便的将新的数据库整合到Spring里面。但由于目前项目用的jersey2框架，所以这里只是贴几个链接地址，供大家学习使用。

 - [Spring Data Couchbase on Github](https://github.com/spring-projects/spring-data-couchbase)
 - [Latest Documentation](http://docs.spring.io/spring-data/couchbase/docs/current/reference/html/)
 - [Sprng Data](http://projects.spring.io/spring-data/)

----------

## Summary
无论是官方还是社区，couchbase提供给了我们完备的支持，让开发变得简单、高效。