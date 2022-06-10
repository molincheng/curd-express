# Express - crud

## 起步

- 初始化
- 模板处理

## 路由设计
|请求方法 |     请求路径     | get 参数 |         post 参数         |             备注           |
———————————————————————————————————————————————————————————————————————————————————————————————
|  GET   |  /studens        |         |                           |  渲染页面       			  |
|  GET   |  /students/new   |         |                           |  渲染页面添加学生页面       |
|  POST  |  /studens/new    |         |name、age、gender、hibbies   |  处理添加学生请求           |
|  GET   |  /students/edit  |   id    |                           |  渲染编辑页面              |
|  POST  |  /studens/edit   |         |id、name、age、gender、hibbies|  处理编辑请求				  |
|  GET   |  /students/delete|	id    |							  |  处理删除请求				  |