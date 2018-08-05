<template>
    <div id="carouselManual">
        <h2>熱門銷售</h2>
        <div id="carouselExampleControls" class="carousel slide " data-interval="false">
            <div class="carousel-inner">
                
                <div class="carousel-item active">
                    <div class="img-item" >
                        <div class="card" style="width: 18rem;" v-for="(item,index) in carouselData1" :key="index">
                            <div class="image-gallery">
                                <div class="main-image">
                                    <!-- 注意圖片綁定的方式 -->
                                    <div class="card-img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                                </div>
                                <div class="subordinate-image">
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic2.jpg" alt="Card image cap">
                                    </div>
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic4.jpg" alt="Card image cap">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card-title" @click="toLink(item)">{{item.title}}</div>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="img-item">
                        <div class="card" style="width: 18rem;" v-for="(item,index) in carouselData2" :key="index">
                            <div class="image-gallery">
                                <div class="main-image">
                                    <div class="card-img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                                </div>
                                <div class="subordinate-image">
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic2.jpg" alt="Card image cap">
                                    </div>
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic4.jpg" alt="Card image cap">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card-title" @click="toLink(item)">{{item.title}}</div>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carousel-item">
                    <div class="img-item">
                        <div class="card" style="width: 18rem;" v-for="(item,index) in carouselData3" :key="index">
                            <div class="image-gallery">
                                <div class="main-image">
                                    <div class="card-img" :style="{backgroundImage: `url(${item.imageUrl})`}"></div>
                                </div>
                                <div class="subordinate-image">
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic6.jpg" alt="Card image cap">
                                    </div>
                                    <div class="subordinate-section">
                                        <img class="card-img" src="../../assets/pic5.jpg" alt="Card image cap">
                                    </div>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="card-title" @click="toLink(item)">{{item.title}}</div>
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 輪播控制器 -->
            <a class="carousel-btn-bg bg-position-left" href="#carouselExampleControls" role="button" data-slide="prev">
                <span class="carousel-prev-icon" aria-hidden="true">
                    <i class="fas fa-angle-left fa-3x"></i>
                </span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-btn-bg bg-position-right" href="#carouselExampleControls" role="button" data-slide="next">
                <span class="carousel-next-icon" aria-hidden="true">
                    <i class="fas fa-angle-right fa-3x"></i>
                </span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            products:[],
            carouselData1:[],
            carouselData2:[],
            carouselData3:[],
        }
    },
    methods:{
        getProducts(){
            const vm = this;
            // 取得產品列表的API
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/products`;
                this.$http.get(api).then((response) => {
                // 回傳成功後 將資料塞回products 在模板上使用products 變數塞入資料
                vm.products = response.data.products;

                // 每筆carouselData陣列中，存放三筆資料
                for(let i=0; i < vm.products.length ; i++){
                    if( i < 3){
                        vm.carouselData1.push(vm.products[i]);
                    }else if( 3 <= i && i < 6){
                        vm.carouselData2.push(vm.products[i]);
                    }else if( 6 <= i && i < 9){
                        vm.carouselData3.push(vm.products[i]);
                    }
                }
            });
        },
        toLink(item){
            this.$router.push(`/product_detail/${item.id}`)
            console.log(item);
        }
    },
    created(){
        this.getProducts();
    }
}
</script>


<style lang="scss">
#carouselManual{
    margin: 30px 0;
    >h2{
        text-align: center;
        margin: 30px 0;
    }
    >#carouselExampleControls{
        position: relative;
        >.carousel-inner{
            
            >.carousel-item{
                
                >.img-item{
                    display: flex;
                    justify-content: center;
                    >.card{
                        margin:0 20px;
                        padding: 5px;
                        height: 420px;
                        >.image-gallery{
                            width: 100%;
                            max-height: 200px;
                            height: 200px;
                            display: flex;
                            >.main-image{
                                display: flex;
                                align-items: center;
                                width: 60%;
                                padding-right: 4px;
                                >.card-img{
                                    height: 100%;
                                    background-position: center;
                                    background-size: cover;
                                }
                            }
                            >.subordinate-image{
                                width: 40%;
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                >.subordinate-section{
                                    height: 98px;
                                    >.card-img{
                                        height: 100%;
                                    }
                                }
                            }
                        }
                        >.card-body{
                            >.card-title{
                                font-size: 18px;
                                font-weight: bold;
                                cursor: pointer;
                            }
                        }
                    }
                }
            }
        }
        >.carousel-btn-bg{
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: #ffffff;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.1);
            border-radius: 50%;
            transition: all 0.3s;
            color:#aaaaaa;
            &:hover{
                box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.3);
                text-decoration: none;
                color: #000000;
            }
        }
        >.bg-position-left{
            top: 50%;
            left: 10%;
            transform:translateY(-50%);
        }
        >.bg-position-right{
            top: 50%;
            right: 10%;
            transform:translateY(-50%);
        }
    }
}
</style>