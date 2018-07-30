<template>
  <div>
    {{ msg }}
    <a href="#" @click.prevent="backTologin">按我回登入頁面</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: '沒有這個頁面'
    }
  },
  methods:{
    backTologin(){
        this.$router.push('/login');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
