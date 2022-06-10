/*
router.js路由模块
职责：
	处理路由
	根据不同请求方法+请求路径设置具体的请求处理函数
模块职责要单一
划分模块的目的时为了增强项目可维护性
提升开放效率	
*/
var fs = require('fs')
var express = require('express')
// 1.创建一个路由容器
var router = express.Router()
var Student = require('./student')

router.get('/',(req,res)=>{
	res.redirect('/students')
})

// 2.把路由都挂载到router路由中
router.get('/students',(req,res)=>{
	// fs.readFile('./db.json','utf8',(err,data)=>{
	// 	if (err) {
	// 		return res.status(500).send('server error.')
	// 	}
	// 	res.render ('index.html',{
	// 	fruits:['苹果','香蕉','草莓','梨子'],
	// 	students:JSON.parse(data).students})
	// })
	Student.find(function (err,students){
		if (err) {
			return res.status(500).send('server error.')
		}
		res.render ('index.html',{
		fruits:['苹果','香蕉','草莓','梨子'],
		students:students
	})
	})
})


router.get('/students/new',(req,res)=>{
	res.render('new.html')
})

router.post('/students/new',(req,res)=>{
	// 1.获取表单数据
	// 2.处理
		// 将数据保存到db.json中用以持久化
	// 3.发送响应
	// 先读取出来，转成对象
	// 然后往对象中push数据
	// 然后把对象转换为字符串
	// 然后再次把字符串写入文件
		console.log(req.body)
		new Student(req.body).save(function(err){
			if (err) {
				return res.status(500).send('server error.')
			}
			res.redirect('/students')
		})
	})

router.get('/students/edit',(req,res)=>{
	// 1.在客户端的列表中处理链接问题（需要id参数）
	// 2.读取要编辑的学生id
	// 3.渲染编辑页面
	Student.findById(req.query.id.replace(/"/g,''),function(err,student){
		if (err) {
			return res.status(500).send('server error')
		}
		console.log(student)
		res.render('edit.html',{student:student})
	})
})
router.post('/students/edit',(req,res)=>{
	//1.获取表单数据
	//	req.body
	//2.更新
	//	Student.updateById()
	// 3.发送响应
	var id = req.body.id.replace(/"/g,'')
	Student.findByIdAndUpdate(id,req.body,function(err){
		if (err) {
			return res.status(500).send('server error.')
		}
		res.redirect('/students')
	})
})
router.get('/students/delete',(req,res)=>{
	// 1.获取要删除的id
	// 2.根据id执行删除操作
	// 3.根据操作结果发送响应数据
		Student.findByIdAndRemove(req.query.id.replace(/"/g,''),(err)=>{
		if (err) {
			return res.status(500).send('server error.')
		}
		res.redirect('/students')
	})
})

// 把router导出
module.exports = router