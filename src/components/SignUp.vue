<template>
  <div>
    <form  @submit.prevent="sub">
      <span>
        <label for="name">姓名 &nbsp;：</label>
        <input 
          type="text" 
          name="name" 
          id="name" 
          v-model="studentInfo.name" 
          required
        >
      </span>
      <span>
        <label for="number">学号 &nbsp;：</label>
        <input 
          type="text" 
          name="number" 
          v-model.number="studentInfo.number" 
          maxlength="10" 
          required
        >
      </span>
      <span>
        性别 &nbsp;：
        <div 
          class="gender" 
          @click="whichSex('male')" 
          ref="maleDiv"
        >
          男 ♂
          <input 
            type="radio" 
            ref="male" 
            class="sex" 
            name="sex" 
            required 
          >
        </div>
        <div 
          class="gender" 
          @click="whichSex('female')" 
          ref="femaleDiv"
        >
          女 ♀ 
          <input 
            type="radio" 
            ref="female" 
            class="sex" 
            name="sex"
          >
        </div>
      </span>
      <span>
        <label for="phone">电话 &nbsp;：</label>
        <input 
          type="text" 
          name="phone" 
          v-model.number="studentInfo.phone" 
          maxlength="11" 
          required
        >
      </span>
      <span>
        <label for="dep1">部门1：</label>
        <input 
          type="text" 
          id="dep1" 
          v-model="studentInfo.dep1" 
          required 
        >
      </span>
      <span>  
        <label for="dep2">部门2：</label>
        <input 
          type="text" 
          id="dep2" 
          v-model="studentInfo.dep2" 
          required
        >
      </span>
      <span>
        <label for="intro">自我介绍：</label>
        <textarea 
          id="intro" 
          rows="7" 
          v-model.lazy="studentInfo.intro" 
          required
        ></textarea>
      </span>
      <button>提交</button>
    </form>
  </div>
</template>

<script>
export default {
  name:'SignUp',
  data(){
    return{
      studentInfo:{
        name:'',
        sex:'',
        number:'',
        phone:'',
        dep1:'',
        dep2:'',
        intro:''
      },
    }
  },
  methods: {
    whichSex(sex){
      const m = this.$refs.maleDiv;
      const f = this.$refs.femaleDiv;
      m.style.background = sex=='male'?"#3582e9":"lightgray";
      f.style.background = sex=='male'?"lightgray":"pink";
      this.$refs[sex].checked = true;
      this.studentInfo.sex = sex;
    },
    sub(){
      const thisCopy = this;
      const num = this.studentInfo.number;
      let isIn = false,phone = "";
      /* 判断学号格式是否正确 */
      if((/^\d{10}$/).test(num)){
        this.$studentData.transaction(function (stu) {
          stu.executeSql('SELECT * FROM STUINFO', [], function (stu, results) {
              var len = results.rows.length, i;
              for (i = 0; i < len; i++){
                var item = results.rows.item(i);
                /* 如果发现匹配的信息 */
                if(num == item.id){
                  isIn = true;
                  alert('报名失败，重复报名');
                  break;
                }
              }
              /* 如果还没注册，则获取电话号码 */
              if(!isIn){
                phone = thisCopy.studentInfo.phone;
                /* 判断电话号码格式是否正确 */
                if((/^1[3-8][0-9]\d{8}$/).test(phone)){
                  /* 获取信息 */
                  let name = thisCopy.studentInfo.name;
                  let sex = thisCopy.studentInfo.sex == "male"?"男":"女";
                  let dep1 = thisCopy.studentInfo.dep1;
                  let dep2 = thisCopy.studentInfo.dep2;
                  let intro = thisCopy.studentInfo.intro;
                  /* 将学生信息插入数据库中 */
                  thisCopy.$studentData.transaction(function (stu) {
                    stu.executeSql('CREATE TABLE IF NOT EXISTS STUINFO (id unique, log, sex,phone,dep1,dep2,intro)');
                    stu.executeSql('INSERT INTO STUINFO (id,log,sex,phone,dep1,dep2,intro) VALUES (?, ?, ?, ?, ?, ?, ?)', [num, name,sex,phone,dep1,dep2,intro]);
                  });
                  alert('提交成功');
                }else{
                  alert('电话号码格式错误');
                }
              }
          })
        });
      }else{
        alert('学号格式错误');
      }
    }
  }
}
</script>

<style>

span{
  display: block;
  margin: 5% 7%;
  background-color: #f7f7fb;
  border-radius:5px ;
}

.gender{
  display: inline-block;
  width: 20%;
  height: 15%;
  margin-right: 12%;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  background-color: lightgray;
}
.sex{
  height: 0;
  width: 0;
  appearance: none;
}

input{
  height: 32px;
  width: 75%;
  outline: none;
  background-color: #f7f7fb;
  border: 0;
  border-bottom: solid 1px black;
  font-size: 20px;
}
button{
  outline: none;
  position: absolute;
  right: 12%;
  width: 30%;
  height: 7%;
  top: 87%;
  font-size: 20px;
  border:solid 1px black;
  border-radius: 20px;
  background-color: lightgray;
  cursor: pointer;
}
button:hover{
  background-color: gray
}
#intro{
  background-color: #f7f7fb;
  resize: none;
  border-radius: 7px;
  font-size: 20px;
  width: 98%;
}
</style>