<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>
        <Header></Header>
        <div class="shopping-cart-list" v-if="openCartTemplate">
            <div class="container">
                <div class="message"></div>
                <div class="orderContent">
                    <div class="order-summary">
                        <h5 class="summary-text">訂單摘要</h5>
                        <div class="summary-detail" v-for="item in cart.carts" :key="item.id">
                            <div class="image">
                                <img :src="item.product.imageUrl" alt="">
                            </div>
                            <div class="item-detail">
                                <div class="item-title">{{ item.product.title }}</div>
                                <div class="item-extras">
                                    <div class="item-quantity">
                                        <span>數量: </span>
                                        <span>{{ item.product.num }}</span>
                                        <span>{{ item.product.unit }}</span>
                                    </div>
                                    <div class="item-subtotal">
                                        <span>NT$</span>
                                        <span>{{ item.total }}</span>
                                    </div>
                                    <div class="item-delete" @click="removeCartItem(item.id)">
                                        <i class="far fa-trash-alt"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="delivery-way">
                            <div>選擇運送方式</div>
                            <select class="delivery-name">
                                <option value="item.name" 
                                v-for="(item, index) in delivery" 
                                :key="index">
                                {{item.name}}</option>
                            </select>
                            <div class="tip-msg">兩件以上每件加收 NT$ 20
                                <br/>滿 NT$ 1,500 後，運費統一 NT$ 150
                                <br/>滿 NT$ 2,000 免運費
                            </div>
                        </div>
                    </div>
                    <div class="order-count">
                        <h5 class="count-text">訂單總計</h5>
                        <div class="count-detail">
                            <div class="itemTotal">
                                <div class="itemTotalText">商品總計</div>
                                <div class="itemPrice">
                                    <span>NT$</span>
                                    <span>{{cart.total}}</span>
                                </div>
                            </div>
                            <div class="discountToal" v-if=" cart.total !== cart.final_total">
                                <div class="discountToalText">優惠折扣價</div>
                                <div class="discountPrice">
                                    <span>NT$</span>
                                    <span>{{ cart.final_total || currencyFilters }}</span>
                                </div>
                            </div>
                            <div class="checkoutToal">
                                <div class="checkoutToalText">結帳總金額</div>
                                <div class="checkoutPrice">
                                    <span>NT$</span>
                                    <span>{{cart.total}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="orderCheck">
                            <router-link to="#" class="orderCheckBtn">結帳去</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="shopping-cart-empty" v-else>
            <div class="container">
                <h2>Oops!!你的購物車中沒有商品</h2>
                <div class="btn-group">
                    <router-link to="/home" class="back-btn">回到首頁繞繞</router-link>
                    <router-link to="/home" class="back-btn">產品列表逛逛</router-link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../index_page/header'
import Footer from '../index_page/footer'

export default {
    data(){
        return{
            delivery:[
                {
                    name:'7-11取貨',
                    fee:'80'
                },
                {
                    name:'全家取貨',
                    fee:'70'
                },
                {
                    name:'宅配到府',
                    fee:'100'
                }
            ],
            cart:[],
            openCartTemplate: false,
            isLoading: false,
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
        getCart(){
            const vm = this;
            this.isLoading = true;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
            this.$http.get(api).then((response)=>{
                vm.cart = response.data.data;
                if( vm.cart.length > 0){
                    vm.openCartTemplate = true;
                }else{
                    vm.openCartTemplate = false
                }
                this.isLoading = false;
                console.log(vm.cart)
            })
        },
        removeCartItem(id){
            const vm = this;
            vm.isLoading = true;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart/${id}`;
            this.$http.delete(api).then((response)=>{
                console.log(response)
                this.getCart();
                vm.isLoading = false;
            })
        },
    },
    created(){
        this.getCart();
    }
}
</script>

<style lang="scss" scoped>
.shopping-cart-list{
    >.container{
        >.message{}
        >.orderContent{
            display: flex;
            >.order-summary{
                width: 600px;
                margin: auto;
                border: 1px solid #ddd;
                border-radius: 5px;
                >.summary-text{
                    background-color: #ebebeb;
                    height:50px;
                    line-height: 50px;
                    padding-left: 20px;
                }
                >.summary-detail{
                    display: flex;
                    width: 100%;
                    padding: 20px;
                    >.image{
                        >img{
                            width: 80px;
                            height: 80px;
                        }
                    }
                    >.item-detail{
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        margin-left: 20px;
                        width: 100%;
                        >.item-title{
                            max-width: 200px;
                            min-width: 200px;
                            color: #342e36;
                            font-size: 16px;
                            font-weight: bold;
                            display: block;
                        }
                        >.item-extras{
                            display: flex;
                            justify-content: flex-end;
                            >div{
                                text-align: right;
                                color: #009081;
                                font-size: 16px;
                                font-weight: 500;
                                -moz-flex: auto;
                                -webkit-flex: auto;
                                -ms-flex: auto;
                                flex: auto;
                            }
                            >.item-quantity{
                                max-width: 75px;
                                min-width: 75px;
                            }
                            >.item-subtotal{
                                margin-left: 10px;
                                max-width: 80px;
                                min-width: 80px;
                            }
                            >.item-delete{
                                margin-left: 30px;
                                width: 30px;
                                height: 30px;
                                >i{
                                    color:#000000;
                                    &:hover{
                                        cursor: pointer;
                                        color:#f5548c;
                                    }
                                }
                            }
                        }
                    }
                }
                >.delivery-way{
                    margin:0 20px;
                    border-top: 1px solid #ddd;
                    >div{
                        margin-top: 10px;
                    }
                    >.delivery-name{
                        width: 50%;
                        height: 30px;
                        margin: 10px 0;
                        border-radius: 3px;
                        background-color: #ffffff;
                    }
                    >.tip-msg{
                        margin-bottom: 20px;
                    }
                }
            }
            >.order-count{
                width: 30%;
                height: fit-content;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-right: 60px;
                >.count-text{
                    background-color: #ebebeb;
                    height:50px;
                    line-height: 50px;
                    padding-left: 20px;
                }
                >.count-detail{
                    >div{
                        width: 100%;
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        padding: 0 15px;
                        >div:first-child{
                            color: #342e36;
                            font-size: 15px;
                            display: block;
                            padding: 6px 0;
                        }
                        >div:nth-child(2){
                            text-align: right;
                            color: #009081;
                            font-size: 15px;
                            padding: 6px 0;
                        }
                    }
                    >.checkoutToal{
                        margin-top: 30px;
                        border-top: 1px solid #ddd;
                        padding: 30px 15px;
                    }
                }
                >.orderCheck{
                    width: 100%;
                    padding: 0 15px;
                    >.orderCheckBtn{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        height: 50px;
                        padding: 10px;
                        margin-bottom: 30px;
                        border-radius: 5px;
                        background: #f5548c;
                        font-size: 18px;
                        color: #ffffff;
                        letter-spacing: 3px;
                        transition: all 0.3s;
                        &:hover{
                            text-decoration: none;
                            transform: translate3d(0,-5px,0);
                            box-shadow: 0 0.2em 0.2em -0.1em #c83166, 0 0.3em #a32252, 0 0.5em 0.5em -0.1em rgba(0,0,0,0.12);
                        }
                    }
                }
            }
        }
    }
}
.shopping-cart-empty{
    height: calc(100vh - 200px - 90px);
    >.container{
        >h2{
            text-align: center;
            height: 100px;
            line-height: 100px;
        }
        >.btn-group{
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100px;
            >.back-btn{
                height: 46px;
                line-height: 46px;
                font-size: 15px;
                color: #839196;
                border: solid 1px #839196;
                display: inline-block;
                vertical-align: middle;
                padding: 0 20px;
                border-radius: 4px;
                margin: 0 20px;
                cursor: pointer;
                overflow: hidden;
                &:hover{
                    background-color:#839196;
                    color: #ffffff; 
                    text-decoration: none;
                }
            }
        }
    }
}
</style>
