---
layout: post
title:  项目管理
categories: 编程
keywords: management,2016
---

项目管理
===

## 约定
项目开始初期，team成员之间一定要约法三章。好的开始是成功的一半，好的约定必将事半功倍。

> Q: 什么是好的约定?
> - 简单直接 // 易于理解，便于执行
> - 经验体现 // 可以借鉴之前项目的经验，使约定后期的更改更少
> - 开放性 // 对后期的追加约定持开发的态度

### 约定分类
总的来说，可以把规定总结为以下几类

- 代码
	+ 代码管理规范
	+ 代码式样规范
	+ 版本发布
- 文档
	+ 注释规范
	+ 设计文档
	+ 资源整理归档
	+ 日志管理
- 环境（文档）
	+ 开发环境
	+ 配置参数
- 流程
	+ 开发流程
		* plan
		* dev
		* qa
		* pro
		* retrospect
	+ bug提交修改流程
		* discovery
		* fix
		* verify
	+ 其他流程
		* 审批权限
- 风险管理
	+ Trouble Shooting
	+ Roll Back
	+ Hotfix
- 测试
- 监控

#### 代码
- Git
	+ SourceTree
	+ Git Flow
- Maven
	+ Custom Repository
	+ Nexus Server
- 代码存储
	+ Github
	+ Bitbucket
	+ Local

#### 流程
- Developer
	+ dev team
	+ qa team
	+ product owner
	+ SM
- Source Management
	+ bitbucket
	+ local git
	+ nexus
- Quality Judgement
	+ Jenkins
	+ SoapUI
	+ sonar
- Deployment
	+ docker
	+ paas
	+ performance test
- Other Tool
	+ hipchat & Notification

#### 代码共通
- Id & Status 统一
	+ 用户ID
	+ 设备ID
	+ API client ID
	+ Status Code
	+ Error Code
	+ etc.
- DB
- API Client
- Mail
- File
- Log
- Test
- Git Flow
- Cache