<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <!-- <hello></hello> -->
    <div class="container">
        <div class="row justify-content-center">
          <div class="col-2" v-if="!authorized">
            <button type="button" class="btn btn-outline-success" @click="login">Login</button>
          </div>
          <div class="col-2" v-else>
            <button type="button" class="btn btn-outline-success" @click="logout">Logout</button>
          </div>
        </div>
    </div>
    <div class="hello">
        <img :src="profilePicture" alt="profile" class="profile-picture"/>
        <h1>Welcome!! {{profile.name}}</h1>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            profile: {},
            authorized: false
        }
    },
    methods:{
        getProfile () {
            const vm = this;
            FB.api('/me?fields=name,id,email', function (response) {
                vm.profile = response;
                console.log(vm.profile)
            })
        },
        login () {
            let vm = this
            FB.login(function (response) {
                vm.statusChangeCallback(response) 
            }, {
                scope: 'email, public_profile',
                return_scopes: true
            })
        },
        logout () {
            let vm = this
            FB.logout(function (response) {
                vm.statusChangeCallback(response)
            })
        },
        statusChangeCallback (response) {
            let vm = this
            if (response.status === 'connected') {
                vm.authorized = true
                vm.getProfile()
            } else if (response.status === 'not_authorized') {
                vm.authorized = false
            } else if (response.status === 'unknown') {
                vm.profile = {}
                vm.authorized = false
            } else {
                vm.authorized = false
            }
        }
    },
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
    },
    computed:{
        profilePicture () {
            return (this.profile.id) ? `https://graph.facebook.com/${this.profile.id}/picture?width=300` : `/static/man.gif`
        }
    }
}
</script>
