<template>
    <div class="main">
        <h3>注册一个新账户</h3>
        <p>
            <Input prefix="ios-contact" placeholder="用户名" style="width: auto"  v-model="username" @on-blur="validateUser"/>
            <span class="err">{{errmsg1}}</span>
        </p>
        <p><Input suffix="ios-search" placeholder="输入密码" style="width: auto" v-model="passwd" @on-blur="validatePass"/>
            <span class="err">{{errmsg2}}</span>
        </p>
        <p><Input suffix="ios-search" placeholder="再次输入密码" style="width: auto" v-model="repasswd" @on-blur="validatePass2"/>
           <span class="err">{{errmsg3}}</span>
        </p>
        <br>
        <Button type="primary" @click="doRegister">注册</Button>
        <Button type="primary" @click="doReset">重置</Button>
        <Button type="primary" to="/login">返回</Button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Register",
        data(){
            return{
                username:'',
                passwd:'',
                repasswd:'',
                errmsg1:'',
                errmsg2:'',
                errmsg3:''
            }
        },
        methods:{
            validateUser(){
              let valid = true;
              if(this.username ==''){
                  this.errmsg1='用户名不能为空'
                  valid=false;
              }
              else{
                  axios.get('http://localhost:8080/api/isexist',{params:{username:this.username}})
                      .then((res)=>{
                          if (res.data){
                              this.errmsg1 ='用户名已存在'
                              valid=false;
                          }
                      })
              }
              if (valid==true)
                  this.errmsg1='';
              return valid;
            },
              validatePass(){
                let valid = true;
                if(this.passwd==''){
                    this.errmsg2 ='密码不能为空';
                    valid = false;
                }else{
                    var reg = new RegExp(/^\w{6,16}$/)
                    valid = reg.test(this.passwd);
                    if(!valid)
                        this.errmsg2 = '密码需为6-16字符'
                }
                if(valid)
                    this.errmsg2='';
                    return valid;
              },
            validatePass2(){
              let valid = true;
              if(this.repasswd==""){
                  valid = false;
                  this.errmsg3 = '请输入确定密码';
              }else{
                  if(this.repasswd!=this.passwd){
                      valid = false;
                      this.errmsg3 = '两次密码不一样'
                  }
              }
                if(valid)
                    this.errmsg3 ='';
                return valid;
            },
            validate(){
              let validate1 =this.validateUser();
              let validate2 =this.validatePass();
              let validate3 =this.validatePass2();
              return validate1&&validate2&&validate3;
            },
            doRegister(){
                if(this.validate()) {
                    axios.post('http://localhost:8080/api/register', {username: this.username, password: this.passwd})
                        .then((res) => {
                            if (res.data) {
                                alert("注册成功，跳转登陆中。。");
                                this.$router.push('/login');
                            }
                        })
                }
            },
           doReset(){
               this.username='';
               this.passwd='';
               this.repasswd='';
           }
        }
    }
</script>

<style scoped>
   button{margin: 5px auto}
</style>