---
layout: post
title:  General Journal
categories: General Journal
keywords: book,2016
---

# G'day ！！！

### New tricks

1. org.apache.commons.lang.text.StrSubstitutor;

``` java
 Map valuesMap = HashMap();
   valuesMap.put("animal", "quick brown fox");
   valuesMap.put("target", "lazy dog");
   String templateString = "The ${animal} jumped over the ${target}.";
   StrSubstitutor sub = new StrSubstitutor(valuesMap);
   String resolvedString = sub.replace(templateString);
```

```
> yielding:
        The quick brown fox jumped over the lazy dog.
```

我们可以用来构建我们可变的JDBC
ex.

```java
    String url = "jdbc:mysql://${host}:{post}";

    private Connection getConnection(String dbHost, String dbPort, String user, String pwd, String dbName) throws ClassNotFoundException, SQLException { 
        Map<String, String> map = new HashMap<>;
        map.put("host", "dbHost");
        map.put("port", "dbPort");
        StrSubstitutor sub = StrSubstitutor(map);
        String connUrl = sub.replace(url + dbName);

        Class.forName("com.mysql.jdbc.Driver");
        Connection conn = DriverManager.getConnection(connUrl, user, pwd);
        return conn;
    }
```




### On Progress
-- --

1. read code of migration tools
    


### TODO list
-- --