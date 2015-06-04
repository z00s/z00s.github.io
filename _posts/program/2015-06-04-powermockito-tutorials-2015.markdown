---
layout: post
title:  JMockito和PowerMockito的比较
categories: 编程
keywords: PowerMockito, 2015
---

### When
Java代码测试会写测试用例来提高代码测试的覆盖率，项目对覆盖率的要求自然是越高越好。然而项目一部分逻辑代码，我们不想在测试环境执行，或者远程工作时，我们的环境无法模拟运行这段代码，那么我们就需要使用Mock工具，帮助我们完成测试。项目中我们常常用到的Mock工具有JMockito和PowerMockito.

### What
JMockit是google code上面的一个java单元测试mock项目。PowerMockito是EasyMockd的一个扩展插件，也支持Mockito扩展。

JMockito和PowerMockito弥补了主流Mock框架不能使用mock static、final、 private方法的不足。

>PowerMock is an "add-on", of sorts, for EasyMock.  It adds the ability to mock things that would not normally be considered possible, such as private methods, static methods, even constructors.  It is a separate package from EasyMock, but it "plays well" with EasyMock and other mocking frameworks (e.g. Mockito). 

PowerMock使用了一个自定义类加载器和字节码操作来模拟静态方法，构造函数，final类和方法，私有方法，去除静态初始化器等等。

### How - Jmockit

```xml
<!-- jmockit use in maven -->
<dependency>
	<groupId>mockit</groupId>
	<artifactId>jmockit</artifactId>
	<version>0.999.4</version>
	<scope>test</scope>
</dependency>

```

```java
// mock类
public class ClassMock extends MockUp<MockedCLass>{

	/**
	 * dummy fields
	 */
	private int fields; 

	@Mock
	public returnType mockedMethod(args...) {
		// mock logic
		return returnType;
	}
}
```

然后在初始化的时候需要声明

```java
static {
	// ...
	new ClientMock();
	// ...
}
	
```

或者直接mock类的制定方法

```java
// 直接在unit test中声明
new MockUp<MockedClassName>() {
	@Mock
	public returnType mockedMethod(args...) {
		// mock logic
		return returnType;
	}
};
```

### How - Powermockito

- 引包

```xml
<!-- powermockito -->
<dependency>
	<groupId>org.mockito</groupId>
	<artifactId>mockito-all</artifactId>
	<version>1.9.5</version>
</dependency>
<dependency>
	<groupId>org.powermock</groupId>
	<artifactId>powermock-module-junit4</artifactId>
	<version>1.5.1</version>
	<scope>test</scope>
</dependency>
<dependency>
	<groupId>org.powermock</groupId>
	<artifactId>powermock-api-mockito</artifactId>
	<version>1.5.1</version>
	<scope>test</scope>
</dependency>
```

- PowerMock两个重要的注解

```java
@RunWith(PowerMockRunner.class) // 使用PowerMock自己的类加载器和字节码操作
@PrepareForTest( { YourClassWithEgStaticMethod.class }) // 指定你要Mock的类
```

- 基本的流程

```java
@RunWith(PowerMockRunner.class) // [1] 使用PowerMock自己的类加载器和字节码操作
@PrepareForTest(TargetClass.class) // [2] 指定你要Mock的类
public class PrivateStaticMethodTest {
//	@spy
//	TargetClass targetClass = new TargetClass();
	
	@Mock
	TargetClass targetClass;
	
	@Before
	public void setup() {
		MockitoAnnotations.initMocks(this); // [3] 初始化Mock类
//		PowerMockito.mockStatic(TargetClass.class, defaultAnswer);
	}

	@Test
	public void testPrivateStaticMethod() throws Exception{
//		PowerMockito.doReturn("FromMock").when(targetClass, "privateStaticMethod", Mockito.anyString());
		PowerMockito.spy(TargetClass.class);
		PowerMockito.doReturn("FromMock").when(TargetClass.class, "privateStaticMethod", Mockito.anyString()); // [4] 设置方法表现

		String actual = targetClass.run();	// [5] 实际调用

		// Assert.assertEquals(expected, actual); // 可以验证返回值

		PowerMockito.verifyPrivate(targetClass, Mockito.times(1)).invoke("privateStaticMethod", Mockito.anyString()); // [6] 验证mock调用次数
	}
	
}
```

[1] 标注，使用PowerMock自己的类加载器和字节码操作
[2] 指定你要Mock的类
[3] 初始化Mock类
[4] 设置方法表现
[5] 实际调用
[6] 验证mock调用次数

### Example
- private的方法

```java
// private的方法应使用spy方法来获取私有方法的权限
PowerMockito.spy(TargetClass.class); // private
PowerMockito.doReturn("expected").when(TargetClass.class, "privateMethod", Mockito.anyString()); // 调用

// public
TargetClass object1 = PowerMockito.mock(TargetClass.class);
TargetClass object2 = Mockito.mock(TargetClass.class);

Mockito.doReturn("expected").when(object).publicVoidMethod();
PowerMockito.doReturn("expected").when(objects).publicVoidMethod();
```

- static的方法

```java
// 声明
PowerMockito.mockStatic(TargetClass.class); // static
TargetClass object = Mockito.mock(TargetClass.class); // 生成实例

PowerMockito.doReturn("expected").when(object, "publicStaticMethod", Mockito.anyString());
PowerMockito.doReturn("expected").when(TargetClass.class, "privateStaticMethod", Mockito.anyString()); 

// 调用
// 声明
PowerMockito.mock(TargetClass.class); // public
```