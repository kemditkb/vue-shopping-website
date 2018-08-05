<template>
    <!-- 記得加回signout事件 -->
    <div class="navbar">
        <div class="menuBtn">
            <!-- 切換開關的事件 -->
            <i class="fas fa-bars fa-2x"></i>
            <div class="btnList">
                <ul>
                    <li>
                        <router-link to="/admin/cartdata">儀表板</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/products">管理商品</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/order">訂單列表</router-link>
                    </li>
                    <li>
                        <router-link to="/admin/coupons">優惠券</router-link>
                    </li>
                    <li>
                        <router-link to="/">回前台</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navbarTitle">後台管理系統</div>
        <div class="signOut" @click="signout">
            <div class="signOutBtn">點我登出喔</div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            
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
        }
    }
}
    
</script>

<style lang="scss" scoped>
.navbar{
    width: 100%;
    height: 50px;
    background-color: #343a40;
    position: relative;
    >.menuBtn{
        cursor: pointer;
        > i {
            color: #ffffff;
        }
        &:hover{
            >.btnList{
                display: block;
            }
        }
        >.btnList{
            position: absolute;
            top: 40px;
            border: 1px solid #ddd;
            background-color: #ffffff;
            width: 100px;
            z-index: 99;
            display: none;
            >ul{
                margin: 0;
                padding: 0;
                >li{
                    list-style: none;
                    padding: 15px;
                    >a{
                        font-size: 16px;
                        &:hover{
                            text-decoration: none;
                        }
                    }
                    &:hover{
                        background-color: #ddd;
                    }
                }
            }
        }
    }
    
    >.navbarTitle{
        color: #ffffff;
        font-size: 24px;
    } 
    >.signOut{
        border: 1px solid #ffffff;
        border-radius: 5px;
        padding: 10px;
        color: #ffffff;
        &:hover{
            cursor: pointer;
            background-color: #ffffff;
            color: #000000;
        }
    }
}
</style>
