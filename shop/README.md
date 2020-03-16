1 路由
下载路由

创建路由目录

创建路由配置文件.js

引入 路由

模块化工程中要安装一下路哟 vue.use

创建实例

导出路由

去 入口文件.js 中 挂载路由
——————————————————————————————————————
2 创建两个组件 login.vue home.vue
步骤
入口 手动
规则
组件 引入组件
出口 App.vue 是所有子组件的根

安装 elementul
引入 mian.js
安装一下 vue.use

————————————————————————————————————————————————————————————————

表单
elementul
找到 表单验证 ul 复制粘贴

form 中的属性
:model='ruleForm' 表单中的数据 绑定对象 ruleForm 和表单绑定的数据对象（FuleForm）对象
:rules='rules'效验规则
ref = 'ruleForm' 获取当前这个组件
label-width='150px' 就是 el-form-item label 标签的宽度
el-form-item 表单元素组件

<!-- 2d434c -->

——————————————————————————————————————————————————————————————————————————————-

跳转 this.\$router.push('/home')
