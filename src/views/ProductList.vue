<template>
    <div class="productList">
       <nav>
           <span style="margin-right:20px">欢迎您：{{this.$store.state.loginuser}}</span>
           <router-link to="/login" @click.native="logout()">登出</router-link>
       </nav>
      <div class="list">
          <Product v-for="(item,index) in showlist" :key="index" :info="item"></Product>
      </div>
       <div class="page">
           <Page :total="total" :current="curren" :page-size="size" prev-text="prev" next-text="next" @on-change="change"/>
       </div>
    </div>
</template>

<script>
    import Product from '../components/Product.vue'
    import axios from 'axios'
    export default {

        name: "ProductList",
        data(){
            return{
              productlist:[],
              curren:1,
              size:4,
              showlist:[]
            }
        },
        computed:{
          total(){
              return this.productlist.length;
          }
        },
        components:{Product:Product},
        mounted() {
            if(this.$store.state.loginuser== ''){
                this.$router.push('/');
            }
            else {
                axios.post('http://localhost:8080/api/getproductlist')
                    .then((res) => {
                        this.productlist = res.data;
                        this.$store.commit('setProdList',this.productlist);
                        this.change(this.curren)
                    })
            }
        },
        methods:{
            logout(){
              if(this.$cookies.isKey('username')){
                  this.$cookies.remove('username')
              }
              this.$store.commit('setLoginUser','');
            },
            change(val){
                  this.curren=val;
                  this.showlist=[];
                  for (var i=0;i<this.size;i++){
                      var index = (this.curren-1)*this.size+i;
                      if (index < this.productlist.length){
                          var prod= this.productlist[index];
                          this.showlist.push(prod);
                      } else
                          break;
                  }
                 // window.scrollTo(0,0) 滚动条复原
            }
        }
    }
</script>

<style scoped>
    .productList{width:1100px; margin:0 auto; }
    nav{text-align:right;line-height:3em;}
    .list{width:100%; display:flex;
        flex-direction:row; flex-wrap:wrap; align-items: flex-start; justify-content: flex-start;}
    .page{
        width:100%; text-align:right; margin:20px auto;
    }
</style>