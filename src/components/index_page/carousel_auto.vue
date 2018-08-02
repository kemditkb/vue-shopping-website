<template>
    <div id="carouselAuto">
        <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel" data-interval="2500">
            <ol class="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                
                <router-link to="/product_list" class="carousel-item active">
                    <img class="d-block w-100" src="../../assets/pic4.jpg" alt="Second slide">
                </router-link>
                <router-link to="/product_list" class="carousel-item">
                    <img class="d-block w-100" src="../../assets/pic1.jpg" alt="Second slide">
                </router-link>
                <router-link to="/product_list" class="carousel-item">
                    <img class="d-block w-100" src="../../assets/pic8.jpg" alt="Third slide">
                </router-link>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span class="carousel-prev-icon" aria-hidden="true">
                    <i class="fas fa-angle-left fa-3x"></i>
                </span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
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
            carouselData:[],
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
                for(let i=0; i < vm.products.length ; i++){
                    if( i < 3){
                        vm.carouselData.push(vm.products[i]);
                    }
                }
            });
        },
    },
    created(){
        this.getProducts()
    }
}
</script>


<style lang="scss">
#carouselAuto{
    >#carouselExampleIndicators{
        >.carousel-inner{
            >.carousel-item{
                >img{
                    margin: auto;
                    width: 600px !important;
                    height: auto;
                }
            }
        }
        >a{
            >span{
                > i {
                    color: #000000;
                }
            }
        }
    }
}
</style>

