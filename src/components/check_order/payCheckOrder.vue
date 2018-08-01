<template>
    <div>
        <Header></Header>
        <div class="my-5 row justify-content-center">
            <!-- 使用提交事件傳送資料 -->
            <form class="col-md-6" @submit.prevent="payOrder">
                <!-- 顯示訂單列表 -->
                <table class="table">
                <thead>
                    <th>品名</th>
                    <th>數量</th>
                    <th>單價</th>
                </thead>
                <tbody>
                    <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="align-middle text-right">{{ item.final_total }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                    <td colspan="2" class="text-right">總計</td>
                    <td class="text-right">{{ order.total }}</td>
                    </tr>
                </tfoot>
                </table>
                <!-- 顯示訂購人資訊 -->
                <table class="table">
                <tbody>
                    <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                    </tr>
                    <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                    </tr>
                    <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                    </tr>
                    <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                    </tr>
                    <tr>
                    <th>付款狀態</th>
                    <td>
                        <span v-if="!order.is_paid">尚未付款</span>
                        <span v-else class="text-success">付款完成</span>
                    </td>
                    </tr>
                </tbody>
                </table>
                <div class="text-right" v-if="order.is_paid === false">
                    <button class="btn btn-danger">確認付款去</button>
                </div>
                <div class="text-right" v-if="order.is_paid === true">
                    <router-link to="/home" class="btn btn-danger">返回首頁</router-link>
                </div>
            </form>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../index_page/header'
import Footer from '../index_page/footer'

export default {
    components:{
        Header,
        Footer
    },
    data(){
        return{
            orderId:'',
            order: {
                user:{}
            }
        }
    },
    methods:{
        getOreder(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/order/${vm.orderId}`;
            this.$http.get(api).then((response) => {
                vm.order = response.data.order;
                console.log(response.data.order);
            });
        },
        payOrder(){
            const vm = this;
            const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/pay/${vm.orderId}`;
            this.$http.post(api).then((response) => {
                console.log(response.data.order);
                if(response.data.success){
                    this.getOreder();
                    console.log(response.data);
                }
            });
        }
    },
    created(){
        // 取得網址參數的方法
        this.orderId = this.$route.params.orderId;
        console.log(this.orderId);
        this.getOreder();
    }
}
</script>
