<template>
    <div id="header">
        <div id="header-content">
            <div class="link-list">
                <!-- 改成routerlink -->
                <div><router-link to="/product_list">主打活動</router-link></div>
                <div><router-link to="/product_list">折扣商品</router-link></div>
                <div><router-link to="/product_list">商品列表</router-link></div>
                <div><router-link to="/product_list">熱銷情報</router-link></div>
            </div>
            <router-link to="/" class="logo">
                <h1>Vue shopping</h1>
            </router-link>
            <div class="rightSideControl">
                <router-link to="/shopping_cart" class="routerLink">
                    購物車
                    <i class="fas fa-shopping-cart fa-lg"></i>
                    <span class="item-count">{{countTotal}}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
// 從api 取出購物車商品數量資料 > 要另外做商品數量加總
export default {
    data(){
        return{
            countTotal: 0,
        }
    },
    methods:{
        getCartInfo(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
            this.$http.get(api).then((response)=>{
                // 將資料存放到 cart 陣列裡面待取用
                vm.countTotal = response.data.data.carts.length;
                // console.log(response.data.data.carts.length)
            })
        }
    },
    created(){
        this.getCartInfo();
    }
}
</script>

<style lang="scss" scoped>
@import 'normalize.css';
#header{
    background-color: #f5f4f3;
    color: #49454b;
    >#header-content{
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        min-width: 1000px;
        height: 70px;
        margin: auto;
        position: relative;
        margin-bottom: 20px;
        >div{
            position: absolute
        }
        >.link-list{
            display: flex;
            left: 0;
            >div{
                padding-right: 6px;
                cursor: pointer;
                color: #49454b;
                &:hover{
                    color: #4fc08d;
                    text-decoration: none;
                }
            }
        }
        >.logo{
            display: flex;
            align-items: center;
            >h1{
                margin: 0;
                color: #49454b;
                &:first-letter{
                    color:#4fc08d;
                }
            }
            &:hover{
                cursor: pointer;
                text-decoration: none;
            }
        }
        >.rightSideControl{
            right: 0;
            font-size: 16px;
            >.routerLink{
                color: #49454b;
                > i {
                    margin-left: 10px;
                }
                >.item-count{
                    width: 20px;
                    height: 20px;
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    left: -10px;
                    border-radius: 50%;
                    background: #f5548c;
                    text-align: center;
                    line-height: 20px;
                    font-size: 12px;
                }
                &:hover{
                    cursor: pointer;
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
