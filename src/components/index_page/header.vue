<template>
    <div id="header">
        <div id="header-content">
            <div class="link-list">
                <!-- 改成routerlink -->
                <div>主打活動</div>
                <div>折扣商品</div>
                <div>商品列表</div>
                <div>熱銷情報</div>
            </div>
            <router-link to="/home" class="logo">
                <h1>Vue shopping</h1>
            </router-link>
            <div class="shopping-cart">
                購物車
                <i class="fas fa-shopping-cart fa-lg"></i>
                <span class="item-count">{{countTotal}}</span>
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
            cart:[]
        }
    },
    methods:{
        getCartInfo(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
            this.$http.get(api).then((response)=>{
                // 將資料存放到 cart 陣列裡面待取用
                vm.cart = response.data.data;
                let count = vm.cart.carts.reduce(function(accumulator, currentValue, currentIndex, array){
                    // console.log(accumulator, currentValue, currentIndex, array)
                    return accumulator + currentValue.qty;
                },0);
                if(count > 0){
                    vm.countTotal = count;
                }else{
                    vm.countTotal = 0;
                }
                // console.log(count)
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
        >.shopping-cart{
            right: 0;
            font-size: 16px;
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
            }
        }
    }
}
</style>
