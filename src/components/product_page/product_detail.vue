<template>
    <div>
        <Header></Header>
        <div class="product-detail">
            <div class="container">
                <div class="section-top">
                    <div class="left">
                        <div class="img-expand">
                            <img id="expandedImg" :src="imageLink"/>
                        </div>
                        <div class="image-row">
                            <div class="image-column" v-for="(images, index) in imageSrc" :key="index">
                                <img :src="images" alt="Nature" @click="openImg(images)">
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <h2>商品名稱</h2>
                        <div class="order-section">
                            <div class="order-info">
                                <div class="price">
                                    <span class="symbol">NT$ </span>
                                    <span class="amount">2,980</span>
                                </div>
                                <div class="count">
                                    <span class="quantity">數量：</span>
                                    <select >
                                        <option :value="item" v-for="item in 10" :key="item">{{item}}</option>
                                    </select>
                                </div>
                            </div>
                            <router-link to="" class="add-cart">放入購物車</router-link>
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
                        <div class="info-content">牛津大學（Walking tour of Oxford）這座迷人的知識殿堂，享有「夢幻尖塔」的美名，擁有全歐洲最古老的博德利圖書館。你將漫步在優美的哥德式建築學城，深入牛津大學的雅緻風情裡，這裡也是童話《愛麗絲夢遊仙境》的故事場景。

接著前往基督堂學院（Christ Church），牛津的學院之一，富有貴族氣息的基督堂學院，同時也是哈利波特取景拍攝地－霍格華茲學生餐廳。

午後在典雅的劍橋大學散步，擁有「城中大學」的美名，導覽會帶你走訪卡文迪許實驗室、國王學院禮拜堂、劍橋圖書館以及古老的彼得學院。</div>
                    </div>
                    <div class="info-section">
                        <div class="info-title">－ 說明內容 －</div>
                        <div class="info-content">因交通、天氣等不可抗力因素所引起的時間延誤，造成部份行程景點取消時，請主動聯絡客服中心，我們將協助辦理部份退款。
若遇颱風、暴風雪等天候不佳的情況，將於出發前1天的00:00決定此團是否取消，之後將隨時以email形式通知。
集合時間為 8:00am，請準時抵達指定地點。
劍橋及牛津大學假日皆開放參觀；劍橋大學 4-6月、牛津大學 5-6 月是學生考試期間，所有學院跟圖書館皆不開放參觀。各校會不定期更動公告，建議你在出發前至各校官網查詢。
本行程提供免費點心餐盒，讓你在車上享用。</div>
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
            imageLink: require('@/assets/pic3.jpg'),
            imageSrc: [
                require('@/assets/pic3.jpg'),
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
        }
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


