<template>
  <div>
    <div id="outer">
      <SignUp v-if="this.$aa.n"/>
      <Search v-else-if="!this.$aa.n"/>
    </div>
    <div id="signUp" :class="signUpClass" @click="change(true)">
      <p>报</p>
      <p>名</p>
    </div>
    <div id="search" :class="searchClass" @click="change(false)">
      <p>查</p>
      <p>询</p>
    </div>
  </div>
</template>

<script>
import SignUp from './SignUp';
import Search from './Search';

export default {
  name: 'Outer',
  data(){
    return{
      a:true,
      signUpClass:{
        outPart:true,
        isNotOn:false
      },
      searchClass:{
        outPart:true,
        isNotOn:true
      }
    }
  },
  components: {
    SignUp,
    Search
  },
  methods: {
    change(n){
      this.$aa.n = Number(n);
      this.n = this.$aa.n;
    }
  },
  computed: {
      n:{
        get(){
          return this.$aa.n;
        },
        set(){
          this.a = !this.a;
        }
      }
    },
  watch:{
    n(){
      this.searchClass.isNotOn = this.n;
      this.signUpClass.isNotOn = !this.n;
    }
  }
}
</script>

<style>
#outer{
  position: absolute;
  left: 50%;
  margin: 2% auto;
  /* margin: 0 auto; */
  transform: translate(-50%);
  /* border: solid 50px black; */
  border: solid 2px black;
  /* border-radius: 110px; */
  border-radius: 50px;
  /* border-left: solid 30px black;
  border-right: solid 30px black; */
  background-color: #f7f7fb;
  width: 30%;
  height: 90%;
  /* height: 87.5%; */
  font-size: 25px;
  overflow:auto;
  /* opacity: 0.7; */
}
#signUp{
  top:7% ;
}
#search{
  bottom:7% ;
}
.outPart{
  position: absolute;
  left: 31%;
  transform: translate(-50%);
  font-size: 70px;
  cursor: pointer;
  border: solid 3px black;
  border-radius: 20px;
  height: 60%;
  width: 9%; 
  background-color: #f7f7fb;
  overflow: hidden;
  z-index: 1;
}
.isNotOn{
  width: 7%;
  font-size: 50px;
  height: 30%;
  z-index: 0;
  border: solid 2px black;
  opacity: 0.8;
}
.outPart p{
  margin: 90px 40px;
}
.isNotOn p{
  margin: 30px 35px;
}
.isNotOn:hover{
  font-size:53px;
}
</style>