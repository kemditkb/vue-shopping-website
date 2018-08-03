<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>
        <Header></Header>
        <div class="content">
            <div class="container">
                <div class="filterBox">
                    <div class="inputText">
                        <input type="text" v-model="filterText">
                        <div class="searchIcon"><i class="fas fa-search fa-lg"></i></div>
                    </div>
                    <div class="priceRange">
                        <div class="priceRangeTitle">金額</div>
                        <ul>
                            <li>
                                <input type="radio" name="price" id="price-1" value="0 1000" v-model="filteredPrice">
                                <label for="price-1">
                                    <span>$1000 以下</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" name="price" id="price-2" value="1001 2500" v-model="filteredPrice">
                                <label for="price-2">
                                    <span>$1000 - 2500</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" name="price" id="price-3" value="2501 5000" v-model="filteredPrice">
                                <label for="price-3">
                                    <span>$2500 - 5000</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" name="price" id="price-4" value="5001" v-model="filteredPrice">
                                <label for="price-4">
                                    <span>$5000 以上</span>
                                </label>
                            </li>
                            <li>
                                <div class="clearBtn" >
                                    <span><i class="far fa-times-circle"></i></span>
                                    <input type="radio" id="clear" name="price" >
                                    <label for="clear" @click="backList">清除所有篩選條件</label>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="sumbit">
                        <!-- 文字輸入之按下按鈕執行文字輸入的篩選 -->
                        <div class="sumbitBtn" @click="submitFilterText">送出查詢</div>
                    </div>
                </div>
                <!-- 用兩個相同的模板分別渲染篩選前與篩選後的資料 -->
                <div class="product-list" v-if="!openfilteredData">
                    <div class="list-card" v-for="(item,index) in products" :key="index">
                        <!--  -->
                        <div class="image" :style="{backgroundImage: `url(${item.imageUrl})`}" @click="toLink(item.id)"></div>
                        <div class="listTitle" @click="toLink(item.id)">{{item.title}}</div>
                        <div class="listPrice">NT$ {{item.origin_price | currencyFilters}}</div>
                    </div>
                </div>
                <div class="product-list" v-if="openfilteredData">
                    <div class="list-card" v-for="(item,index) in filteredData" :key="index">
                        <!--  -->
                        <div class="image" :style="{backgroundImage: `url(${item.imageUrl})`}" @click="toLink(item.id)"></div>
                        <div class="listTitle" @click="toLink(item.id)">{{item.title}}</div>
                        <div class="listPrice">NT$ {{item.origin_price | currencyFilters}}</div>
                    </div>
                </div>
            </div>
            <Pagination class="pagination" :pages="pagination" @emitPages="getProduct"></Pagination>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../index_page/header'
import Footer from '../index_page/footer'
import Pagination from '../dashboard/pagination'

export default {
    components:{
        Header,
        Footer,
        Pagination
    },
    data(){
        return {
            products:[],
            filterText:'',
            filteredData:[],
            pagination:[],
            openfilteredData:false,
            filteredPrice:'',
            isLoading:false
        }
    },
    methods:{
        getProduct(currentPage = 1){
            const vm = this;
            this.isLoading = true;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/products?page=${currentPage}`;
            this.$http.get(api).then( (response) => {
                vm.isLoading = false;
                vm.products = response.data.products;
                vm.pagination = response.data.pagination;
                console.log(vm.pagination)
            })
        },
        toLink(id){
            this.$router.push(`/product_detail/${id}`)
        },
        // 執行篩選工作
        submitFilterText(){
            
            const vm = this;

            // 價錢區間的篩選
            if(vm.filteredPrice){
                vm.openfilteredData = true;
                // 將字串轉陣列
                let arraytest = vm.filteredPrice.split(" ")
                vm.filteredData = vm.products.filter(function(item){
                    return Object.keys(item).some(function(key){
                        // 將陣列的資料型態轉成數值
                        let moreThen = parseInt(arraytest[0]);
                        let lessThen = parseInt(arraytest[1]);
                        // 進行篩選
                        return  String(item['price']) > moreThen && String(item['price']) < lessThen;
                    })
                })
            }
            
            // 從文字輸入取得查詢
            if(vm.filterText){
                // 控制模板開關
                vm.openfilteredData = true;
                vm.filteredData = vm.products.filter(function(item){
                    return Object.keys(item).some(function(key){
                        return String(item[key]).toLowerCase().indexOf(vm.filterText) > -1
                    })
                })
            }

        },
        backList(){
            this.openfilteredData = false;
            this.filteredData = [];
            this.filterText = '';
            this.filteredPrice ='';
        }
    },
    created(){
        this.getProduct();
    }
}
</script>

<style lang="scss" scoped>
.content{
    >.container{
        display: flex;
        >.filterBox{
            width: 200px;
            height:fit-content;
            border: 1px solid #ddd;
            border-radius: 5px;
            >.inputText{
                display: flex;
                justify-content: center;
                position: relative;
                >input{
                    margin: 20px 0;
                    height: 50px;
                    width: 160px;
                    box-sizing: border-box;
                    border: 1px solid #ddd;
                    border-radius: 25px;
                    padding-left: 20px;
                    padding-right: 35px;
                    outline: none;
                    &:focus+.searchIcon{
                        opacity: 1;
                    }
                }
                >.searchIcon{
                    position: absolute;
                    right: 35px;
                    top: 35px;
                    opacity: 0.4;
                }
            }
            >.priceRange{
                margin:0 30px;
                border-top:1px solid #ddd; 
                border-bottom:1px solid #ddd; 
                >.priceRangeTitle{
                    height: 50px;
                    line-height: 50px;
                }
                >ul{
                    padding:0;
                    margin:0;
                    >li{
                        cursor: pointer;
                        list-style: none;
                        margin-bottom: 0.5rem;
                        >.clearBtn{
                            cursor: pointer;
                            >input{
                                display: none;
                            }
                            >label{
                            cursor: pointer;
                            display: inline-block;
                        }
                        }
                        >input{
                            margin:0;
                            cursor: pointer;
                        }
                        >label{
                            cursor: pointer;
                            display: inline-block;
                        }
                        &:hover{
                            color:#fd578f;
                        }
                    }
                }
            }
            >.sumbit{
                margin: 20px 30px;
                >.sumbitBtn{
                    width: 100%;
                    height: 50px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    border-radius: 5px;
                    letter-spacing: 3px;
                    background: #f5548c;
                    font-size: 18px;
                    color: #ffffff;
                    transition: all 0.3s;
                    &:hover{
                        cursor: pointer;
                        text-decoration: none;
                        transform: translate3d(0,-5px,0);
                        box-shadow: 0 0.2em 0.2em -0.1em #c83166, 0 0.3em #a32252, 0 0.5em 0.5em -0.1em rgba(0,0,0,0.12);
                    }
                }
            }
        }
        >.product-list{
            width: 850px;
            margin-left: auto;
            margin-right: 30px;
            display: flex;
            flex-wrap:wrap;
            justify-content: flex-start;
            >.list-card{
                flex: 0 1 250px;
                margin: 0 auto;
                margin-bottom: 60px;
                border-radius: 5px;
                >.image{
                    width: 100%;
                    height: 150px;
                    background-position: center;
                    background-size:cover;
                    cursor: pointer;
                }
                >.listTitle{
                    text-align: center;
                    cursor: pointer;
                    &:hover{
                        color: #68A92E;
                    }
                }
                >.listPrice{
                    text-align:right;
                    color: #68A92E;
                }
            }
        }
    }
    >.pagination{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>

