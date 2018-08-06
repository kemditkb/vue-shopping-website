<template>
  <div class="message-alert">
    <div class="alert alert-dismissible"
      :class="'alert-' + item.status"
      v-for="(item, i) in messages" :key="i">
      {{ item.message }}
      <button type="button" class="close" @click="removeMessage(i)" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      messages: [],
    };
  },
  methods: {
    updateMessage(message, status) {
      const timestamp = Math.floor(new Date() / 1000);
      this.messages.push({
        // 錯誤彈跳訊息會塞入這三個值
        message,
        status,
        timestamp,
      });
      // 當updateMessage被觸發，也會觸發移除的函式removeMessageWithTiming
      this.removeMessageWithTiming(timestamp);
    },
    // 手動關閉
    removeMessage(num) {
      this.messages.splice(num, 1);
    },
    // 自動關閉
    removeMessageWithTiming(timestamp) {
      const vm = this;
      //使用setTimeout 延後五秒才執行
      setTimeout(() => {
        vm.messages.forEach((item, i) => {
          if (item.timestamp === timestamp) {
            vm.messages.splice(i, 1);
          }
        });
      }, 5000);
    },
  },
  created() {
    const vm = this;
    // 透過this 呼叫 $bus變數，已經掛載在bus.js底下
    // 自定義事件名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    vm.$bus.$on('messsage:push', (message, status = 'warning') => {
      // 呼叫 updateMessage
      vm.updateMessage(message, status);
    });
    // 當有其他元件使用到以下語法，會觸發vm.$bus.$on('messsage:push'）
    // vm.$bus.$emit('messsage:push')
  },
};
</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>