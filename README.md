# 萍乡辅警信息系统——前端

## 基本信息

| 名称       | 描述                                                         |
| ---------- | ------------------------------------------------------------ |
| 项目名称   | 萍乡辅警信息系统                                             |
| 上线时间   | 2021年10月                                                   |
| 项目仓库   | https://gitlab.dian.org.cn/hawkeye/pingxiang-auxiliary-police-information-system-frontend |
| 资料仓库   | svn://cloud.eic.hust.edu.cn:7084/project/police2021          |
| 代码review | 每周1次                                                      |
| 框架       | Vue                                                          |
| 开发语言   | JavaScript                                                   |
| 运行环境   | IE、Chrome内核                                               |
| 通信协议   | Https                                                        |
| 开发环境   | vscode                                                       |
| UI库       | element-UI                                                   |
| 状态管理库 | vuex                                                         |
| 路由管理库 | vue-router                                                   |
| 请求库     | Axios                                                        |
| YApi      | http://82.157.0.52:40001/                                    |
| 工作流     | git flow + CI/CD                                             |
| 日志处理   | api日志+错误日志                                             |
| 系统更新   | 线下更新                                                     |
| 保密协议   | 无                                                           |



## 启动项目

```bash
# 安装依赖
npm i 

# 启动
npm run dev

# ⚠️提交代码前进行代码格式检查及自动修正
npm run lint
```



## 开发页面

要在左边侧边栏中添加页面，只需要在 `router/index.js` 中按如下规则引入即可。

 <img src="https://tva1.sinaimg.cn/large/008eGmZEly1gotq0vf7zxj30zi0pagpa.jpg" alt="截屏2021-03-23 下午12.21.50" style="zoom:50%;" />