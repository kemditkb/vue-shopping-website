<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    window.fbAsyncInit = function() {
      FB.init({
        appId      : 153216555532092,
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1',
      });
        
      FB.AppEvents.logPageView();   
      
      // Get FB Login Status
      FB.getLoginStatus( response => {
        console.log('res', response)        // 這裡可以得到 fb 回傳的結果
      })
    };
  }
}
</script>

<style lang='scss'>
@import './assets/all';

</style>
