/*
app.js入口模块
职责：
	启动服务
	做一些相关配置
		模板引擎
		body-parser解析表单post请求体
		提供静态资源服务
	挂载路由
	监听端口启动服务
*/
var express = require('express')
var app = express()
var router = require('./router')
var bodyParser = require('body-parser')

app.engine('html',require('express-art-template'))

// 配置模板引擎和body-parser一定要在挂载路由之前
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/db.json',express.static('./db.json'))
app.use('/public/',express.static('./public/'))

// 把路由容器挂载到app服务中
app.use(router)

app.listen(3000,()=>{
	console.log('server is running....')
})


module.exports = app