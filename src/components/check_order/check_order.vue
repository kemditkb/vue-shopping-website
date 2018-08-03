<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <Header></Header>
        <!-- 訂單表單 -->
        <div class="content">
            <div class="left">
            <!-- 表單資料都填寫完成，使用submit 事件將資料送出 -->
                <form class="order-form" @submit.prevent="createOrder">
                    <div class="form-group">
                        <label for="useremail">Email</label>
                        <input type="email" class="form-control" name="email" id="useremail"
                            v-model="form.user.email" 
                            placeholder="請輸入 Email" 
                            :class="{ 'is-invalid': errors.has('email') }"
                            v-validate="'required'">
                        <span class="text-danger">{{ errors.first('email') }}</span>
                    </div>
                
                    <div class="form-group">
                        <label for="username">收件人姓名</label>
                        <input type="text" class="form-control" name="name" id="username"
                            placeholder="輸入姓名" 
                            :class="{ 'is-invalid': errors.has('name') }"
                            v-model="form.user.name" 
                            v-validate="'required'">
                        <span class="text-danger" v-if="errors.has('name')">姓名欄位不得為空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="usertel">收件人電話</label>
                        <input type="tel" 
                            class="form-control" 
                            id="usertel" 
                            name="usertel"
                            v-model="form.user.tel" 
                            placeholder="請輸入電話"
                            v-validate="'required'"
                            :class="{ 'is-invalid': errors.has('usertel') }">
                        <span class="text-danger" v-if="errors.has('usertel')">收件人電話欄位不得為空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">收件人地址</label>
                        <input type="address" 
                            class="form-control" 
                            name="address" 
                            id="useraddress" 
                            v-model="form.user.address"
                            :class="{ 'is-invalid': errors.has('address') }"
                            v-validate="'required'"
                            placeholder="請輸入地址">
                        <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
                    </div>
                
                    <div class="form-group">
                        <label for="useraddress">留言</label>
                        <textarea name="" id="" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                    </div>
                    <div class="text-right">
                        <button class="btn">送出訂單</button>
                    </div>
                </form>
            </div>
            <div class="right">
                <div class="order-item">
                    <div class="pay-detail">
                        <div class="pay-info">
                            <span>小計</span>
                            <div class="payTotal">
                                <span>NT$ </span>
                                <span>{{cart.total | currencyFilters}}</span>
                            </div>
                        </div>
                        <div class="pay-discount" v-if="cart.final_total !== cart.total">
                            <span>優惠折扣</span>
                            <div class="discountTotal">
                                <span>NT$ </span>
                                <span>{{ cart.final_total | currencyFilters }}</span>
                            </div>
                        </div>
                        <div class="pay-discount">
                            <span>金額總計</span>
                            <div class="discountTotal">
                                <span>NT$ </span>
                                <span>{{ cart.final_total | currencyFilters }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="backToCart">
                        <router-link to="/shopping_cart" class="backToCartBtn">返回購物車列表</router-link>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import $ from 'jquery';
import Header from '../index_page/header';
import Footer from '../index_page/footer';

export default {
    data(){
        return{
            // 放置產品列表的變數
            products:[],
            // 放置單一產品資訊
            product:[],
            // 全螢幕讀取效果
            isLoading:false,
            // 個別讀取效果：為了將讀取效果能夠個別使用，建立一個變數給個別讀取效果使用
            status:{
                LoadingItem:" ",
            },
            // 存放購物車商品資訊 
            cart:[],
            // 存放優惠券號碼
            coupon_code:'',
            // 存放表單資料格式
            form:{
                user:{
                name:" ",
                email:" ",
                tel: " ",
                address: " ",
                },
                message:" ",
            }
        }
    },
    components:{
        Header,
        Footer,
    },
    methods:{
        getCart(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
            // 用GET方法取得資料
            this.$http.get(api).then((response)=>{
                // 將資料存放到 cart 陣列裡面待取用
                vm.cart = response.data.data;
                console.log(vm.cart)
            })
        },
        //套用優惠券
        addCouponCartItem(){
            const vm = this;
            // 回傳到API的資料格式
            const coupon = {
                code: vm.coupon_code,
            }
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/coupon`;
            // post coupon_code的資料到API
            this.$http.post(api, { data: coupon}).then((response)=>{
                console.log(response)
                this.getCart();
            })
        },
        //訂單成立功能
        createOrder(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/order`;
            this.isLoading = true;
            // 經由套件validate 判斷表單是否驗證成功 才執行資料傳遞
            this.$validator.validate().then( (result) => {
                if (result) {
                // post vm.form的資料到API
                this.$http.post(api, { data: vm.form }).then((response)=>{
                    if(response.data.success){
                        // 成功post之後 轉跳頁面到結帳確認頁面  網址部分注意格式
                        vm.$router.push(`/paycheckorder/${response.data.orderId}`)
                    }
                    console.log(response)
                })
                } else {
                    console.log('欄位不完整')
                }
            });
        }
    },
    created(){
        this.getCart();
    }
}
</script>

<style lang="scss" scoped>
.content{
    display: flex;
    >.left{
        width: 60%;
        >.order-form{
            width: 60%;
            margin-left: auto;
            >.text-right{
                >.btn{
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
    >.right{
        width: 40%;
        >.order-item{
            width: 40%;
            border: 1px solid #ddd;
            border-radius: 5px;
            margin-left: 10%;
            margin-top: 28px;
            >.pay-detail{
                margin: 15px 0;
                >div{
                    height: 40px;
                    display: flex;
                    align-items: center;
                    margin: 0 10px;
                    >div{
                        margin-left: auto;
                    }
                }
            }
            >.backToCart{
                margin:0 10px;
                padding: 20px 0;
                border-top: 1px solid #ddd;
                >.backToCartBtn{
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 50px;
                    padding: 10px;
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
</style>
