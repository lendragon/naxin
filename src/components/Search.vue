<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.8.2/css/all.min.css"
    />
    <!-- 搜索栏 -->
    <span>
      <input 
        class="search"
        type="number" 
        placeholder="请输入自己的学号" 
        v-model.number="number" 
        maxlength="10"
      >
      <i class="fa fa-search icon" aria-hidden="true" @click="search"></i>
    </span>
    <span ref="msg"></span>
    
  </div>
</template>

<script>
export default {
  name:'Search',
  data(){
    return{
      number:''
    }
  },
  methods: {
    search(){
      var msg;
      const thisCopy = this;
      this.$studentData.transaction(function (stu) {
          stu.executeSql('SELECT * FROM STUINFO', [], function (stu, results) {
              var len = results.rows.length, i;
              for (i = 0; i < len; i++){
                var item = results.rows.item(i);
                /* 如果发现匹配的信息 */
                if(thisCopy.number == item.id){
                  /* 获取信息 */
                  msg = 
                    "姓名 &nbsp;：" + item.log + "<br>" +
                    "学号 &nbsp;：" + item.id + "<br>" +
                    "性别 &nbsp;：" + item.sex + "<br>" +
                    "电话 &nbsp;：" + item.phone + "<br>" +
                    "部门1：" +item.dep1 + "<br>" +
                    "部门2：" +item.dep2 + "<br>" +
                    "自我介绍 ：" +item.intro
                  /* 在页面上输出信息 */
                  thisCopy.$refs.msg.innerHTML = msg;
                  break;
                }
                /* 如果查找不到相关信息 */
                if(i == len-1){
                  msg = "搜索不到相关内容";
                  thisCopy.$refs.msg.innerHTML = msg;
                  /* 弹出确认框是否去报名 */
                  if(confirm('检测到您尚未报名，是否前去报名？')){
                    /* 如果确认则跳转页面 */
                    thisCopy.$aa.n = 1;
                  }
                }
              }
          }, null);
      })
    }
  },
}
</script>

<style>
.search{
  width: 90%;
}
.icon:hover{
  color: blue;
  font-size: 30px;
  cursor: pointer;
}
</style>