<template>
    <div class="main">
        <h3>欢迎进入登录界面</h3>
        <p><Input prefix="ios-contact" placeholder="用户名" style="width: 200px;" v-model="username" /></p>
        <p><Input v-model="passwd" type="password" placeholder="密码" style="width: 200px;"/></p>
        <p><checkbox v-model="save">登录名和密码保存一周</checkbox></p>
        <Button type="primary" @click="doLogin">登录</Button>
        <Button type="primary" to="/register">注册</Button>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data(){
            return{
                username:'',
                passwd:'',
                save:false
            }
        },
        methods:{
            doLogin(){
                axios.post('http://localhost:8080/api/login',{username:this.username,password:this.passwd})
                    .then((res)=>{
                        if (res.data){
                            if (this.save){
                              this.$cookies.set('username',this.username,'7d');
                            }
                            this.$store.commit('setLoginUser',this.username);
                            this.$router.push('/productlist');
                        }
                        else{
                            alert('username or password err!  please reput');
                            this.username='';
                            this.passwd='';
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>