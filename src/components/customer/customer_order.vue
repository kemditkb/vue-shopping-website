

<template>
  <div class="order">
    <loading :active.sync="isLoading"></loading>
    <div class="row mt-4">
      <!-- 使用 v-for 將資料渲染  -->
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <!-- 注意這段加入圖片的方式 -->
          <div style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}">
          </div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{ item.title }}</a>
            </h5>
            <p class="card-text">{{ item.content }}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
              <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <!-- 開啟詳細商品資訊視窗 -->
            <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.LoadingItem == item.id"></i>
              查看更多
            </button>
            <!-- 加入購物車按鈕 -->
            <button type="button" class="btn btn-outline-danger btn-sm ml-auto"
            @click="addtoCart(item.id)">
              <i class="fas fa-spinner fa-spin" v-if="status.LoadingItem == item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
      <input type="text" v-model="text">
      <div class="text" v-for="(abc, index) in filter" :key="index">{{abc.title}}</div>
    </div>
    <!-- 單一產品模板 -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt="">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.content }}</p>
              <footer class="blockquote-footer text-right">{{ product.description }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{num}} {{product.unit}}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 
              <!-- 判斷原價或優惠價計算 -->
              <strong v-if="product.price">{{ product.num * product.price }}</strong>
              <strong v-if="!product.price">{{ product.num * product.origin_price }}</strong>
              元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, product.num)">
              <!-- 個別讀取效果的變數如果等於商品ID 讀取效果就會啟動 -->
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車列表 -->
    <div class="my-5 row justify-content-center">
      <div class="my-5 row justify-content-center">
        <!-- 購物車列表表格 -->
        <table class="table">
          <thead>
            <th></th>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in cart.carts" :key="item.id" v-if="cart">
              <td class="align-middle">
                <!-- 刪除按鈕與功能 -->
                <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)">
                  <i class="far fa-trash-alt"></i>
                </button>
              </td>
              <td class="align-middle">
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">
                  已套用優惠券
                </div>
              </td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total | currencyFilters }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" class="text-right">總計</td>
              <td class="text-right">{{ cart.total | currencyFilters}}</td>
            </tr>
            <!-- 總價不等於折扣價時 顯示這段 -->
            <tr v-if="cart.final_total !== cart.total" >
              <td colspan="3" class="text-right text-success">折扣價</td>
              <td class="text-right text-success">{{ cart.final_total | currencyFilters }}</td>
            </tr>
          </tfoot>
        </table>

        <!-- 優惠券輸入 -->
        <div class="input-group mb-3 input-group-sm">
          <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼">
          <div class="input-group-append">
            <!-- 觸發優惠碼事件之後api會自動套用 -->
            <button class="btn btn-outline-secondary" type="button" @click="addCouponCartItem">
              套用優惠碼
            </button>
          </div>
        </div>

      </div>
    </div>

    <!-- 訂單表單 -->
    <div class="my-5 row justify-content-center">
      <!-- 表單資料都填寫完成，使用submit 事件將資料送出 -->
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input type="email" class="form-control" name="email" id="useremail"
            v-model="form.user.email" placeholder="請輸入 Email" 
            :class="{ 'is-invalid': errors.has('email') }"
            v-validate="'required'">
          <span class="text-danger">{{ errors.first('email') }}</span>
        </div>
      
        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input type="text" class="form-control" name="name" id="username"
            :class="{ 'is-invalid': errors.has('name') }"
            v-model="form.user.name" placeholder="輸入姓名" v-validate="'required'">
            <!-- 加入:class="{ 'is-invalid': errors.has('name') }" 判斷是否要加入紅色外框 -->
            <!-- 插入v-validate="'required'" 表單驗證 -->
            <!-- 使用errors.has(input：name) 判斷表單是否留空 如果是空為true 則顯示下方段落-->
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
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
export default {
  data(){
    return{
      text:'',
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
  computed:{
    filter(){
      let text = this.text;
      let filtered = this.products;
      if(text){
        filtered = filtered.filter(function(item){
            return Object.keys(item).some(function(key){
              return String(item[key]).toLowerCase().indexOf(text) > -1
            })
          })
          console.log(filtered);
          
      }
      return filtered;
    }
  },
  methods:{
    // 產品列表
    getProducts(){
      const vm = this;
      // 取得產品列表的API
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/products`;
      // 執行getProducts時，isLoading的狀態改為啟用
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // 回傳成功後 將資料塞回products 在模板上就可以使用products刷新頁面
        vm.products = response.data.products;
        console.log(vm.products)
        // 資料從API載入完成之後，isLoading的狀態改為關閉
        vm.isLoading = false;
        // 從API取得pagination 資料，並塞入 pagination 物件內
      });
    },
    // 單一產品資訊
    getProduct(id){
      const vm = this;
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/product/${id}`;
      // 個別讀取效果內存放的值為商品ID
      vm.status.LoadingItem = id;
      this.$http.get(api).then((response)=>{
        vm.product = response.data.product;
        console.log(vm.product);
        vm.status.LoadingItem = "";
        $('#productModal').modal('show');
      })
    },
    //購物車功能
    addtoCart(id, qty = 1){
      // 設置要傳遞的參數
      const cart = {
        // 商品ID
        product_id: id,
        // 商品數量
        qty,
      };
      const vm = this;
      vm.status.LoadingItem = id;
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
      // 使用 POST 傳遞商品參數給購物車API
      this.$http.post(api, { data:cart }).then((response)=>{
          vm.status.LoadingItem = "";
          vm.getCart();
          $('#productModal').modal('hide');
          // console.log(response)
      });
    },
    // 取得購物車資料
    getCart(){
      const vm = this;
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart`;
      // 用GET方法取得資料
      this.$http.get(api).then((response)=>{
        // 將資料存放到 cart 陣列裡面待取用
        vm.cart = response.data.data;
        // console.log(vm.cart)
      })
    },
    // 刪除購物車商品項目
    removeCartItem(id){
      const vm = this;
      vm.isLoading = true;
      // 從外部回傳商品項目 ID 
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/cart/${id}`;
      // 用delete方法取得資料
      this.$http.delete(api).then((response)=>{
        // console.log(response)
        this.getCart();
        vm.isLoading = false;
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
        // console.log(response)
        this.getCart();
      })
    },
    //訂單成立功能
    createOrder(){
      const vm = this;
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/order`;
      // 經由套件validate 判斷表單是否驗證成功 才執行資料傳遞
      this.$validator.validate().then( (result) => {
        if (result) {
          // post vm.form的資料到API
          this.$http.post(api, { data: vm.form }).then((response)=>{
            if(response.data.success){
              // 成功post之後 轉跳頁面到結帳確認頁面  網址部分注意格式
              vm.$router.push(`/custom_checkorder/${response.data.orderId}`)
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
    this.getProducts();
    this.getCart();
  }
}
</script>

<style lang="scss" scoped>
.order{
  >.row{
    >.text{
      width: 100%;
      display: block;
    }
  }
}

</style>


