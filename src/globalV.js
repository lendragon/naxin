//引入vue
import Vue from 'vue'
//全局可响应式变量
export var aa = Vue.observable({
  n:1,
}) 
//创建全局数据库
export var studentData = openDatabase('stuinfo', '1.0', 'info', 2 * 1024 * 1024)
