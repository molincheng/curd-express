/*
student.js
数据操作文件模块
职责：操作文件中的数据，只处理数据，不关心业务 
*/
var fs = require('fs')
var dbPath = './db.json'
/*
获取所有学生列表
callback中的参数
	第一个参数 err
		成功 是 null
		错误 是 错误对象
	第二个参数 结果
		成功 是 数组
		错误 是 undefined
return []
*/
exports.find = function(callback){
	fs.readFile(dbPath,'utf8',(err,data)=>{
		if (err) {
			return callback(err)
		}
		callback(null,JSON.parse(data).students)
	})
}

/*根据id获取学生对象*/
exports.findById = function(id,callback){
	fs.readFile(dbPath,'utf8',(err,data)=>{
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		var ret = students.find(function(item){
			return item.id === id
		})
		callback(null,ret)
	})
}

// 添加保存学生
exports.save = function(student,callback){
	fs.readFile(dbPath,'utf8',(err,data)=>{
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students
		// 处理唯一id，不重复
		student.id = students[students.length - 1].id + 1
		// 把用户传递的对象传递到数组中
		students.push(student)
		// 把对象数据转换为字符串
		var fileData = JSON.stringify({students:students})
		// 把字符串保存到文件中
		fs.writeFile(dbPath,fileData,(err)=>{
			if (err) {callback(err)}
			callback(null)
		})
	})
}

// 更新学生
exports.updateById = function(student,callback){
	fs.readFile(dbPath,'utf8',(err,data)=>{
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		// 你要修改修就把谁找出来
		// 需要接受一个函数作为参数
		// 当某个遍历item.id===student.id条件的时候，find会终止遍历，同时返回遍历项

		// 注意：这里记得把id转化为统一数字类型
		student.id = parseInt(student.id)

		var stu = students.find(function(item){
			return item.id === student.id
		})

		for(var key in student){
			stu[key] = student[key]
		}

		var fileData = JSON.stringify({students:students})
		fs.writeFile(dbPath,fileData,(err)=>{
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}

// 删除学生
exports.deleteById = function(id,callback){
	fs.readFile(dbPath,'utf8',(err,data)=>{
		if (err) {
			return callback(err)
		}
		var students = JSON.parse(data).students

		// findIndex方法专门用来根据条件查找元素的下表
		var deteleId = students.findIndex((item)=>{
			return item.id === parseInt(id)
		})

		// 根据下标从数组中删除对应的学生对象
		students.splice(deteleId,1)

		var fileData = JSON.stringify({
			students:students
		})

		fs.writeFile(dbPath,fileData,(err)=>{
			if (err) {
				return callback(err)
			}
			callback(null)
		})
	})
}