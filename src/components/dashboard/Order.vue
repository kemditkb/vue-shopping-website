<template>
    <div>
        <Loading :active.sync="isLoading"></Loading>
        <table class="table mt-4">
        <thead>
            <tr>
            <th>購買時間</th>
            <th>Email</th>
            <th>購買款項</th>
            <th>應付金額</th>
            <th>是否付款</th>
            </tr>
        </thead>
        <tbody>
          <!-- 取得排序後的資料，並渲染在列表上 -->
            <tr v-for="(item, key) in sortOrder" :key="key"
            v-if="orders.length"
            :class="{'text-secondary': !item.is_paid}">
            <td>{{ item.create_at | dateFilters }}</td>
            <td><span v-text="item.user.email" v-if="item.user"></span></td>
            <td>
                <ul class="list-unstyled">
                <li v-for="(product, i) in item.products" :key="i">
                    {{ product.product.title }} 數量：{{ product.qty }}
                    {{ product.product.unit }}
                </li>
                </ul>
            </td>
            <td class="text-right">{{ item.total | currencyFilters }}</td>
            <td>
                <strong v-if="item.is_paid" class="text-success">已付款</strong>
                <span v-else class="text-muted">尚未起用</span>
            </td>
            </tr>
        </tbody>
        </table>
        <!-- 使用props的方法 將外層元件的資料傳遞到下層元件 -->
        <pagination :pages="pagination" @emitPages="getOrders"></pagination>
    </div>
</template>

<script>
import pagination from './pagination'

export default {
  data() {
    return {
      orders: {},
      isNew: false,
      pagination: {},
      isLoading: false,
    };
  },
  components: {
    pagination
  },
  methods: {
    // 傳入目前頁面頁數
    getOrders(currentPage = 1) {
      const vm = this;
      // 在取得商品資訊API上 加入當前頁數資料
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/orders?page=${currentPage}`;
      vm.isLoading = true;
      this.$http.get(url).then((response) => {
        // 取得商品列表資訊
        vm.orders = response.data.orders;
        // 取得分頁資訊
        vm.pagination = response.data.pagination;
        vm.isLoading = false;
        console.log(vm.pagination)
      });
    },
  },
  computed: {
    // 使用排序過後的陣列做列表渲染
    sortOrder() {
      const vm = this;
      let newOrder = [];
      if (vm.orders.length) {
        newOrder = vm.orders.sort((a, b) => {
          const aIsPaid = a.is_paid ? 1 : 0;
          const bIsPaid = b.is_paid ? 1 : 0;
          return bIsPaid - aIsPaid;
        });
      }
      // 這邊回傳的是陣列
      return newOrder;
    },
  },
  created() {
    this.getOrders();
  },
};
</script>
