<template>
    <div>
        <!-- 在模板內加入component的標籤 就可以使用component的模板 --> 
        <navbar></navbar>
        <!-- 引用 Alert component  -->
        <Alert></Alert>
        <div class="container-fluid">
        <div class="row">
            <!-- <sidebar></sidebar> -->
            <main class="container">
                <!-- 插入路由的標籤 在這個區域內控制巢狀路由頁面 -->
                <router-view></router-view>
            </main>
        </div>
        </div>
    </div>    
</template>

<script>
// 匯入其它的vue模板
import navbar from './navbar';
import sidebar from './sidebar';
import Alert from './AlertMessage'

export default {
    // 在components底下載入，讓dashboard使用
    components:{
        navbar,
        sidebar,
        Alert,
    }
}
</script>

