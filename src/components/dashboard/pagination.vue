<template>
    <div>
        <!-- pagination分頁器 -->
        <nav aria-label="Page navigation example">
            <ul class="pagination">
            <!-- 在上一頁按鈕上加入樣式的判斷，當沒有上一頁的時候false不加入樣式 -->
            <li class="page-item" :class="{'disabled': !pages.has_pre }">
                <!-- 觸發上一頁按鈕，會傳入（ 所在的目前頁面減一 ）就會回到上一個page -->
                <a class="page-link" href="#" aria-label="Previous" @click="updatePage(pages.current_page-1)">
                <span aria-hidden="true">&laquo;</span>
                <span class="sr-only">Previous</span>
                </a>
            </li>
            <!-- API載入資料到pagination，將pagination的總頁數取出 -->
            <!-- 並且在按鈕上加入目前頁面樣式的判斷，使用目前所在頁面做比對 -->
                <li class="page-item" v-for="page in pages.total_pages" :key="page"
                :class="{ 'active': pages.current_page === page}">
                <!-- 在觸發 getProducts 函式的時候，將page頁數傳入 -->
                <a class="page-link" href="#" @click.prevent="updatePage(page)">{{ page }}</a>
            </li>
            <li class="page-item" :class="{'disabled': !pages.has_next}">
                <!-- 觸發上一頁按鈕，會傳入（ 所在的目前頁面加一 ）就會回到下一個page -->
                <a class="page-link" href="#" aria-label="Next" @click="updatePage(pages.current_page+1)">
                <span aria-hidden="true">&raquo;</span>
                <span class="sr-only">Next</span>
                </a>
            </li>
            </ul>
        </nav>
    </div>
</template>

<script>
// :pages="{ 頁碼資訊 }"
// @emitPages="更新頁面事件"
export default {
    name: 'Layout',
    //使用props傳入外部元件資訊
    props: ['pages'],
    methods: {
        updatePage(page) {
            this.$emit('emitPages', page);
        },
    },
};
</script>
