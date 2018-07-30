<template>
  <div class="hello">
    <button type="button" class="btn btn-primary" @click.prevent="signout">按我登出</button>
    <button type="button" class="btn btn-primary" @click.prevent="toDashboard">按我進入dashboard</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    signout(){
      const api = `${ process.env.APIPATH }/logout`;
      const vm = this; // 指向到 Login vue component
      this.$http.post(api).then((response) => {
      
          if(response.data.success){
              // 在vue component 找到$router參數 塞入路徑（path）
              vm.$router.push('/login');
          }
      })
    },
    toDashboard(){
      this.$router.push('/admin/products');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
