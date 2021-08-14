#### 学习来源
Nodejs全栈入门
https://www.imooc.com/learn/1199
#### 需要的依赖
`npm install express mysql2 sequelize -s`
`npm i sequelize-cli nodemon -S`
`npm i body-parser -S`
#### 数据库的初始化
1、创建一个数据库
2、使用 sequelize cli 初始化项目的数据库配置信息
`npx sequelize init`
3、生成模型文件
  1、migrate 文件
  2、modal 文件
  ` npx sequelize model:generate --name Todo --attributes name:string,deadline:date,content:string,status:integer `
4、 持久化，模型对应的【数据库表】
  ` npx sequelize db:migrate `
#### API里面具体使用ORM模型

#### 项目的发布和运维
###### 安装pm2
1) 全局安装
管理员cmd窗口运行： 
`npm install pm2 -g`
2) 安装windows自启动包
`npm install pm2-windows-startup -g`
3) 执行命令
`pm2-startup install`

`pm2 init`
`pm2 start ecosystem.config.js`
`pm2 list`
`pm2 restart 0`
