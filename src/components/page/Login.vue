<template>
  <div>
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 font-weight-normal">尚未登入，請先登入</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <input type="email" id="inputEmail" v-model="user.username" @focus="tipsClear" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword" class="sr-only">Password</label>
      <input type="password" id="inputPassword" v-model="user.password" @focus="tipsClear" class="form-control" placeholder="Password" required>
      <div class="checkbox mb-3">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <div class="msgTip badge badge-danger" v-bind:class="{ active: isActive }">
        <p>登入失敗，請重新輸入</p>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
    </form>
    
  </div>
</template>

<script>
export default {
  
  name: 'HelloWorld',
  data () {
    return {
        // 回傳的資料結構，要與ＡＰＩ的資料結構一致
        user:{
            username:'',
            password:''
        },
        isActive: true,
    }
  },
  methods:{
    signin(){
      const api = `${ process.env.APIPATH }/signin`;
      const vm = this; // 指向到 Login vue component
      this.$http.post(api, vm.user).then((response) => {
          if(response.data.success){
              // 在vue component 找到$router參數 塞入路徑（path）轉向到 path:'/'
              vm.$router.push('/admin/products');

              // 再轉向到path:'/'的過程中，main.js會執行router.beforeEach()這個函式
          }else{
              vm.user.username = '';
              vm.user.password = '';
              vm.isActive = false;
          }
      })
    },
    tipsClear(){
        this.isActive = true;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html,body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.active{
    display:none;
}
</style>
