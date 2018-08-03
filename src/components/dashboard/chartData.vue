<template>
    
    <div class="operateInfo">
        <Loading :active.sync="isLoading"></Loading>
        <h2>營運資料</h2>
        <div class="cardInfo">
            
            <div class="incomeInfo">
                
                <div class="cardStyle">
                    <div class="icon"><i class="fas fa-hand-holding-usd fa-3x"></i></div>
                    <div class="cardTitle">累積營業額</div>
                    <div class="cardContent">
                        <div class="contentRow">{{Total | currencyFilters}}</div>
                        <div class="contentText">
                            <span class="targetText">本月目標</span>
                            <div class="target" @dblclick="toggle = !toggle">{{saleTarget | currencyFilters}}</div>
                            <input type="text" v-model="value" v-if="toggle" @keyup.enter="changeTarget()">
                            <div class="tipText">點兩下可以修改目標喔</div>
                        </div>
                        
                        <div class="progress">
                            <!-- progressbar的數值使用:style 做綁定 將資料進來 -->
                            <div class="progress-bar" role="progressbar" :style="{ width : processData+'%'}" aria-valuemin="0" aria-valuemax="100">{{ processData+'%'}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="orderInfo">
                <div class="cardStyle">
                    <div class="icon"><i class="fas fa-chart-line fa-3x"></i></div>
                    <div class="cardTitle">訂單狀況</div>
                    <div class="cardContent">
                        <div class="contentRow">
                            <span>訂單總數</span>
                            <span>
                                <span>{{totalOrder}}</span>
                                <span>筆</span>
                            </span>
                        </div>
                        <div class="contentRow">
                            <span>已付款訂單</span>
                            <span>
                                <span>{{paid}}</span>
                                <span>筆</span>
                            </span>
                        </div>
                        <div class="contentRow">
                            <span>未付款訂單
                            </span>
                            <span>
                                <span>{{notpaid}}</span>
                                <span>筆</span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chartInfo">
            <h2>每筆訂單總額</h2>
            <histogram :data="chartData"></histogram>
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            isLoading:false,
            // 儲存開啟或關閉input 修改的值
            toggle: false,
            // 綁定input
            value:'',
            // 目標預設值
            saleTarget:50000,

            orderData:[],
            // 存放售價陣列
            saleTotal:[],
            // 累加業績
            Total:'',
            paid:0,
            notpaid:0,
            totalOrder:0,
            // 圖表陣列
            chartData: {
                columns: ['id', 'total',],
                rows: []
            }
        }
    },
    methods:{
        changeTarget(){
            this.toggle = !this.toggle;
            this.saleTarget = this.value;
        },
        getOrder(){
            const vm = this ;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders`;
            this.isLoading = true;
            this.$http.get(api).then((response) => {
                vm.orderData = response.data.orders;
                vm.chartData.rows = response.data.orders;
                // 使用 for 迴圈 與 push 方法 將售價單獨塞入到新陣列中
                for(let i=0; i < vm.orderData.length; i++){
                    vm.saleTotal.push(vm.orderData[i].total)
                }
                // 新陣列使用reduce 方法進行售價的累加得到銷售總額
                vm.Total = vm.saleTotal.reduce(function(accumulator, currentValue, currentIndex, array){
                    return accumulator + currentValue
                },0); 
                
                // 判斷已付款與未付款的訂單數
                vm.orderData.forEach(function(item){
                    if(item.is_paid){
                        vm.paid++ ;
                    }else{
                        vm.notpaid++ ;
                    }
                })
                //計算訂單總數
                vm.totalOrder = vm.orderData.length;

                this.isLoading = false;
            })
        }
    },
    computed:{
        processData(){
            // 計算達成目標
            return (this.Total / this.saleTarget * 100).toFixed(1);
        }
    },
    created(){
        this.getOrder();
    }
}
</script>


<style lang="scss" scoped>
.operateInfo{
    >h2{
        margin: 0;
        margin-top:30px;
        text-align: center;
    }
    >.cardInfo{
        display: flex;
        justify-content: space-around;
        >div{
            width: 400px;
            margin: 30px 0;
            padding: 20px;
            >.cardStyle{
                border-radius: 5px;
                height: 350px;
                display: flex;
                flex-direction: column;
                align-items: center;
                position: relative;
                background-color:#343a40;
                color: #ffffff;
                >.icon{
                    margin: 30px 0;
                }
                >.cardTitle{
                    font-size: 18px;
                    margin-bottom: 30px;
                }
                >.cardContent{
                    width: 100%;
                    text-align: center;
                    font-size: 36px;
                    
                    >.contentRow{
                        >span:first-child{
                            margin-bottom: 10px;
                            display: inline-block;
                            width: 100px;
                            font-size: 16px;
                        }
                        >span:nth-child(2){
                            display: inline-block;
                            width: 100px;
                            text-align: right;
                            >span:first-child{
                                font-size: 36px;
                            }
                            >span:nth-child(2){
                                font-size: 16px;
                            }
                        }
                    }
                    >.contentText{
                        position: absolute;
                        right: 10px;
                        bottom: 30px;
                        >.targetText{
                            font-size: 18px;
                        }
                        >.target{
                            background: #fd5491;
                            padding: 10px;
                            border-radius: 15px 15px 0 15px;
                            font-size: 16px;
                            >span{
                                font-size: 24px;
                            }
                            &:hover + .tipText{
                                display: block;
                            }
                        }
                        >input{
                            position: absolute;
                            width: 70px;
                            font-size: 14px;
                            top: 63px;
                            left: 9px;
                        }
                        >.tipText{
                            position: absolute;
                            display: none;
                            top: 52px;
                            right: -115px;
                            width: 100px;
                            padding: 10px;
                            font-size: 15px;
                            background: #aaaaaa;
                            border-radius: 10px;
                            box-sizing: border-box;
                        }
                    }
                    >.progress{
                        width: 100%;
                        height: 20px;
                        position: absolute;
                        bottom: 0;
                        border-radius: 0 0 5px 5px;
                    }
                }
            }
        }
    }
    >.chartInfo{
        >h2{
            text-align: center;
            margin-bottom: 30px;
        }
    }
}
</style>

