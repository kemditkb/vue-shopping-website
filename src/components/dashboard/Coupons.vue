<template>
  <div>
    <div class="text-right">
      <button class="btn btn-primary" @click="openCouponModal(true)">
        建立新的優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>名稱</th>
          <th>折扣百分比</th>
          <th>到期日</th>
          <th>是否啟用</th>
          <th>編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, key) in coupons" :key="key">
          <td>{{ item.title }}</td>
          <td>{{ item.percent }}%</td>
          <td>{{ item.due_date | dateFilters }}</td>
          <td>
            <span v-if="item.is_enabled === 1" class="text-success">啟用</span>
            <span v-else class="text-muted">未起用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm"
              @click="openCouponModal(false, item)"
            >編輯</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 新增與編輯視窗 -->
    <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempCoupon.title"
                placeholder="請輸入標題">
            </div>
            <div class="form-group">
              <label for="coupon_code">優惠碼</label>
              <input type="text" class="form-control" id="coupon_code" v-model="tempCoupon.code"
                placeholder="請輸入優惠碼">
            </div>
            <div class="form-group">
              <label for="due_date">到期日</label>
              <input type="date" class="form-control" id="due_date"
                v-model="due_date">
            </div>
            <div class="form-group">
              <label for="price">折扣百分比</label>
              <input type="number" class="form-control" id="price"
                v-model="tempCoupon.percent" placeholder="請輸入折扣百分比">
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox"
                  :true-value="1"
                  :false-value="0"
                  v-model="tempCoupon.is_enabled" id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"
              @click="updateCoupon">更新優惠券</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
export default {
  props: {
    config: Object,
  },
  data() {
    return {
      // 存放優惠券的列表資訊
      coupons: {},
      // 儲存優惠券的資訊並回傳給API的資料格式
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: '',
      },
      // 建立新日期物件後，給due_date()使用的變數
      due_date: new Date(),
      // 用來判斷新增資料或是編輯資料使用
      isNew: false,
    };
  },
  // 用來關注vue實體內的資料變動
  watch: {
    // 會為vm.tempCoupon.due_date持續更新時間
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      // 時間有變動，會一直回傳資料 
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    // 判斷啟用新增或是編輯優惠券視窗
    openCouponModal(isNew, item) {
      const vm = this;
      // 觸發新增資料視窗
      $('#couponModal').modal('show');
      vm.isNew = isNew;
      // 判斷是新增一筆優惠券或是編輯優惠券
      if (vm.isNew) {
        // 如果是新增優惠券，代表存放優惠券資訊的物件為空
        vm.tempCoupon = {};
      } else {
        // 如果是編輯優惠券 將暫存資料的變數塞入優惠券資料 使暫存的物件有資料可以做修改
        // Object.assign(target 目標物件, ...sources來源物件)被用來複製物件自身的屬性到另一個目標物件
        vm.tempCoupon = Object.assign({}, item);
        // 改時間格式  toISOString() 回傳日期的字串表示法，以國際標準組織 (ISO) 格式表示
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        vm.due_date = dateAndTime[0];
      }
    },
    // 取得優惠券列表
    getCoupons() {
      const vm = this;
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupons`;
      this.$http.get(url, vm.tempProduct).then((response) => {
        vm.coupons = response.data.coupons;
        console.log(response);
      });
    },
    // 新增與更新優惠券內容
    updateCoupon() {
      const vm = this;
      // 判斷是啟用新增或是更新api 方法
      if (vm.isNew) {
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon`;
        // 新增使用post方法
        this.$http.post(url, { data: vm.tempCoupon }).then((response) => {
          console.log(response, vm.tempCoupon);
          // 成功傳遞資料後關閉視窗
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      } else {
        // 更新要傳入優惠券項目ID
        const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        vm.due_date = new Date(vm.tempCoupon.due_date * 1000);
        // 更新使用put方法
        this.$http.put(url, { data: vm.tempCoupon }).then((response) => {
          console.log(response);
          // 成功傳遞資料後關閉視窗
          $('#couponModal').modal('hide');
          this.getCoupons();
        });
      }
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>

<style lang="scss" scoped>
.text-right{
  margin-top: 30px;
}
</style>

