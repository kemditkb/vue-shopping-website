<template>
  <div class="products">
    <div>
        <loading :active.sync="isLoading"></loading>
    </div>
    <div class="text-right">
      <button class="btn btn-secondary" @click="openModal(true)">建立新產品</button>
    </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width='120'>分類</th>
            <th>產品名稱</th>
            <th width='80'>原價</th>
            <th width='80'>售價</th>
            <th width='120'>是否啟用</th>
            <th width='120'>編輯</th>
            <th width='120'>刪除</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item) in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <!-- 將模板加入過濾器函式，並回傳參數到過濾器內，經過濾器處理完之後再回傳到模板上 -->
            <td class="text-right">{{ item.origin_price | currencyFilters }}</td>
            <td class="text-right">{{ item.price | currencyFilters }}</td>
            <td>
              <span v-if="item.is_enabled">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <button class="btn btn-primary" @click="openModal(false, item)">編輯</button>
            </td>
            <td>
              <button class="btn btn-danger"  @click="delModal(item)">刪除</button>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- 分頁器   @emitPages="更新頁面事件" 刷新頁面-->
      <pagination :pages="pagination" @emitPages="getProducts"></pagination>

      <!-- Modal id名稱要對得上-->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title" id="exampleModalLabel">
                <span>{{ isNewText }}</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-sm-4">
                  <div class="form-group">
                    <label for="image">輸入圖片網址</label>
                    <input type="text" class="form-control" id="image"
                      v-model="tempProduct.imageUrl"
                      placeholder="請輸入圖片連結" >
                  </div>
                  <div class="form-group">
                    <label for="customFile">或 上傳圖片
                      <!-- 插入fontawesome的html結構 -->
                      <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                    </label>
                    <!-- 新增檔案上傳，當input 觸發change事件 執行uploadFile function -->
                    <input type="file" id="customFile" class="form-control"
                      ref="files" @change="uploadFile">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                </div>
                <div class="col-sm-8">
                  <div class="form-group">
                    <label for="title">標題</label>
                    <input type="text" class="form-control" id="title"
                      v-model="tempProduct.title"
                      placeholder="請輸入標題">
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                      <label for="category">分類</label>
                      <input type="text" class="form-control" id="category"
                        v-model="tempProduct.category"
                        placeholder="請輸入分類">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">單位</label>
                      <input type="unit" class="form-control" id="unit"
                        v-model="tempProduct.unit"
                        placeholder="請輸入單位">
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-6">
                    <label for="origin_price">原價</label>
                      <input type="number" class="form-control" id="origin_price"
                        v-model="tempProduct.origin_price"
                        placeholder="請輸入原價">
                    </div>
                    <div class="form-group col-md-6">
                      <label for="price">售價</label>
                      <input type="number" class="form-control" id="price"
                        v-model="tempProduct.price"
                        placeholder="請輸入售價">
                    </div>
                  </div>
                  <hr>

                  <div class="form-group">
                    <label for="description">產品描述</label>
                    <textarea type="text" class="form-control" id="description"
                      v-model="tempProduct.description"
                      placeholder="請輸入產品描述"></textarea>
                  </div>
                  <div class="form-group">
                    <label for="content">說明內容</label>
                    <textarea type="text" class="form-control" id="content"
                      v-model="tempProduct.content"
                      placeholder="請輸入產品說明內容"></textarea>
                  </div>
                  <div class="form-group">
                    <div class="form-check">
                      
                      <input class="form-check-input" type="checkbox"
                        v-model="tempProduct.is_enabled"
                        :true-value="1"
                        :false-value="0"
                        id="is_enabled">
                      <label class="form-check-label" for="is_enabled">
                        是否啟用
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- 刪除 -->
      <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger"
              @click="delProduct" >確認刪除</button>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import $ from 'jquery';
import pagination from './pagination';

export default {
  data () {
    return {
      // 放置產品列表的變數
      products:[],
      // 準備變數 當作暫存新增資料使用或是暫存item上的資料
      tempProduct:{},
      //判斷傳入的資料是新的或是要更新的
      isNew:false,
      isNewText:'新增產品資料',
      // 判斷是否要啟用Loading元件
      isLoading:false,
      status:{
        fileUploading:false,
      },
      //紀錄分頁資料
      pagination:{}
    };
  },
  // 引用元件
  components:{
    pagination
  },
  methods:{
    //取得產品列表功能
    // 使用ES6語法 在函式內預設參數 利用傳入的值取得API回傳的資料 並刷新頁面
    getProducts(page = 1){
      const vm = this;
      // 取得產品列表的API 並且傳入頁數 使API回傳相對頁數的資料
      const api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/products?page=${page}`;
      // 執行getProducts時，isLoading的狀態改為啟用
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        // 回傳成功後 將資料塞回products 在模板上就可以使用products刷新頁面
        vm.products = response.data.products;
        // 資料從API載入完成之後，isLoading的狀態改為關閉
        vm.isLoading = false;
        console.log(vm.products);
        // 從API取得pagination 資料，並塞入 pagination 物件內
        vm.pagination = response.data.pagination;
        console.log(vm.pagination);
      });
    },
    // 開啟 bootstrap modal 功能
    // 經由模板上的事件傳入item 
    openModal(isNew, item){
      // 如果是新增的資料
      if(isNew){
        // 清空 tempProduct 內的資料
        this.tempProduct = {};
        this.isNew = true;
        this.isNewText = '新增產品資料'
      }else{
        // 如果是更新的資料
        // 讀取item上的資料並將item轉成物件的儲存格式  tempProduct上的資料就可以讓模板使用
        this.tempProduct =  Object.assign({}, item);
        this.isNew = false;
        this.isNewText = '更新產品資料'
      }
      $('#productModal').modal('show');
    },
    //新增資料與更新資料功能
    updateProduct(){
      const vm = this;
      // 新增資料的API路徑
      let api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product`;
      let httpMethod = "post";
      // 此判斷會自動比對vm.isNew的內容，如果傳入的vm.isNew = true，將api連線網址到更新資料的api
      if(!vm.isNew){
        // 更新資料的API路徑
        api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product/${vm.tempProduct.id}`;
        // 如果是更新資料被啟用，API的方法也會被改變
        httpMethod = "put";
      }
      // 經由判斷決定api的方法
      // 回傳給API的資料要符合格式，將回傳的資料改成物件
      this.$http[httpMethod](api, { data: vm.tempProduct })
      .then((response) => {
        // 回傳成功
        if(response.data.success){
          // 自動刷新產品列表
          vm.getProducts();
          // 關閉新增/更新產品表單
          $('#productModal').modal('hide');
        }else{
          vm.getProducts();
          $('#productModal').modal('hide');
          console.log(response);
        }
      });
    },
    // 開啟刪除 Modal功能
    // 經由模板上的事件傳入item
    delModal(item){
      $('#delProductModal').modal('show');
      // 將item上的資料轉成物件的儲存格式  tempProduct上的資料就可以讓模板使用
      this.tempProduct =  Object.assign({}, item);
    },
    //刪除功能
    delProduct(){
      const vm = this;
      //建立刪除的api 連結，傳入被刪除商品的id
      let api = `${ process.env.APIPATH }/api/${ process.env.CUSTOMPATH }/admin/product/${vm.tempProduct.id}`;
      // API的方法要改用 delete
      this.$http.delete(api)
      .then((response) => {
        console.log(response);
        //刪除成功，執行商品列表刷新
        this.getProducts();
        //關閉 刪除modal
        $('#delProductModal').modal('hide');
      });
    },
    // 檔案上傳功能
    uploadFile(){
      // 將資料（ 圖片資料 ）從component物件中取出
      const uploadedFile = this.$refs.files.files[0];
      const vm = this ;
      vm.status.fileUploading = true;
      // 使用FormData物件模擬傳統的form表單傳遞資料
      const formData = new FormData();
      // 將資料插入formData中，formData.append(name, value);
      // name:表單欄位名稱 ,value:放入表單的值
      formData.append('file-to-upload', uploadedFile);

      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      // 建立API連線，使用post方法將資料回傳API
      // url放API網址, formData放入要回傳給API的值, {}將回傳的格式改回form-data
      this.$http.post(url, formData, {
        // 調整回傳的headers，改變回傳的資料格式
        headers: {
           'Content-Type': 'multipart/form-data',
         },
      }).then((response) => {
        // 使用 Vue.set( target, key, value ) 這個API 強制將資料寫入
        // target:目標物件或陣列, key:字串或數字(名稱) , value:要寫入的資料
        
        if(response.data.success){
          vm.$set(vm.tempProduct,'imageUrl',response.data.imageUrl)
          vm.status.fileUploading = false;
          console.log(vm)
        }else{
          console.log(vm)
          // 觸發目前vue實體上的物件
          vm.$bus.$emit('messsage:push', response.data.message, 'danger');
        }
      })
      // 流程：將資料取出 > 插入formData物件中 > 再送出到API
    }
  },
  created() {
    this.getProducts();
  },
}
</script>

<style lang="scss" scoped>
.products{
  margin-top:30px;
}
</style>
