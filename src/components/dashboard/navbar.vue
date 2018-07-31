<template>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
        <input class="form-control form-control-dark w-100" type="text" placeholder="Search" aria-label="Search">
        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" @click.prevent="signout">Sign out</a>
            </li>
        </ul>
        
    </nav>
</template>

<script>
export default {
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
        }
    }
}
    
</script>