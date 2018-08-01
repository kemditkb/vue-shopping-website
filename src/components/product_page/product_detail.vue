<template>
    <div>
        <Header></Header>
        <div class="product-detail">
            <div class="container">
                <div class="section-top">
                    <div class="left">
                        <div class="img-expand">
                            <img id="expandedImg" :src='imageLink'/>
                        </div>
                        <div class="image-row">
                            <div class="image-column" v-for="(images, index) in imageSrc" :key="index">
                                <img :src="images" alt="Nature" @click="openImg(images)">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <h2>{{product.title}}</h2>
                        <div class="order-section">
                            <div class="order-info">
                                <div class="price">
                                    <span class="symbol">NT$ </span>
                                    <span class="amount">{{product.price}}</span>
                                </div>
                                <div class="count">
                                    <span class="quantity">數量：</span>
                                    <select v-model="product.num">
                                        <option :value="item" v-for="item in 10" :key="item">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <div class="add-cart" @click="addToCart(product.id, product.num)">放入購物車</div>
                            <div class="message">
                                <div class="message-title">購買即視為同意取消政策</div>
                                <div class="message-content">取消訂單，將收取所有實際產生費用</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="section-bottom">
                    <div class="detail-info-section">
                        <div class="info-title">－ 產品描述 －</div>
                        <div class="info-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos, repellat. Voluptatibus cumque consectetur doloribus provident natus laborum inventore nihil soluta quos totam, magnam beatae adipisci aliquam minima ea ex atque iste, quaerat minus perferendis excepturi nobis itaque molestiae rem. Quidem!
                        </div>
                    </div>
                    <div class="info-section">
                        <div class="info-title">－ 說明內容 －</div>
                        <div class="info-content">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident cumque est ipsum, necessitatibus totam iste suscipit quam culpa eveniet. Distinctio consequatur corrupti quis neque quam impedit nesciunt id beatae sint minima molestias provident, libero obcaecati laborum voluptates est alias corporis.
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
// 流程 > 要從網址抓參數 連結API 抓資料 跑回v-for 要記得改router path

import Header from '../index_page/header'
import Footer from '../index_page/footer'

export default {
    data(){
        return{
            detailId:'',
            product:{},
            orederNum:'',
            imageLink: '',
            imageSrc: [
                require('@/assets/pic6.jpg'),
                require('@/assets/pic4.jpg'),
                require('@/assets/pic8.jpg'),
            ]
        }
    },
    components:{
        Header,
        Footer
    },
    methods:{
        openImg(images){
            this.imageLink = images;
        },
        getProduct(id){
            const vm = this;

            // 由外部給予商品ID 並給定在網址中  取得特定ID的商品資料
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/product/${id}`;

            this.$http.get(api).then((response)=>{
                // 將資料塞入變數中
                vm.product = response.data.product;
                vm.imageLink = response.data.product.imageUrl;
                vm.imageSrc.unshift(response.data.product.imageUrl);
            })
        },
        addToCart(id, qty){
            const cart = {
                product_id: id,
                qty,
            }
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
            this.$http.post(api, { data:cart }).then((response)=>{
                console.log(response);
            });
        }
    },
    created(){
        // 取得網址參數的方法  $route.params + 動態變數（ 與index.js 的配置要一致 ）存入orderId
        this.detailId = this.$route.params.detailId;
        this.getProduct(this.detailId);
    }
}
</script>

<style lang="scss" scoped>
.product-detail{
    >.container{
        >.section-top{
            display: flex;
            >.left{
                position: relative;
                width: 65%;
                >.img-expand{
                    width: 500px;
                    margin: auto;
                    >#expandedImg{
                        width: 100%;
                        height: auto;
                    }
                }
                >.image-row{
                    position: absolute;
                    top: 0;
                    left: 3%;
                    >.image-column{
                        margin-bottom: 5px;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        cursor: pointer;
                        >img{
                            width: 50px;
                            height: 50px;
                            border-radius: 5px;
                        }   
                    }
                }
            }
            >.right{
                width: 35%;
                >h2{
                    text-align: center;
                    margin-bottom: 30px;
                }
                >.order-section{
                    border-top:1px solid #ddd; 
                    >.order-info{
                        display: flex;
                        align-items: center;
                        height: 50px;
                        margin-top: 20px;
                        margin-bottom: 20px;
                        >.price{
                            color: #78c042;
                            font-size: 20px;
                            line-height: 1.4em;
                            height: 30px;   
                        }
                        >.count{
                            margin-left: auto;
                            >span{
                                font-size: 14px;
                                color: #6a6a6a;
                            }
                            >select{
                                width: 55px;
                                height: 30px;
                                border: 5px solid #f8f8f8;
                                background-color: #f8f8f8;
                                font-size: 15px;
                            }
                        }
                    }
                    >.add-cart{
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
                    >.message{
                        margin-top: 20px;
                        margin-bottom: 20px;
                    }
                }
            }
        }
        >.section-bottom{
            margin:50px 0;
            border-top: 1px solid #ddd;
            >div{
                width: 65%;
                margin:auto;
                margin-top: 50px;
                >.info-title{
                    font-size: 2rem;
                    color: #333;
                    line-height: 1;
                    margin-top: 0;
                    margin-bottom: 40px;
                }
            }
        }
    }
}
</style>


