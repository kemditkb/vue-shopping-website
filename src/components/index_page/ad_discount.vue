<template>
    <div class="jumbotron jumbotron-fluid">
        <h2>好康訊息</h2>
        <div class="container">
            <div class="left">
                <h1 class="display-4">刷卡不限通路</h1>
                <p class="lead">享受超級回饋，最高回饋15%</p>
                <button type="button" class="btn btn-primary">立刻了解詳細內容</button>
            </div>
            <div class="right">
                <h1 class="display-4">滿999，免運！！</h1>
                <button type="button" class="btn btn-danger">立刻搶購</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.jumbotron{
    margin: 30px 0;
    >h2{
        text-align: center;
        margin-bottom:50px;
    }
    >.container{
        display: flex;
        align-items: center;
        >.left{

        }
        >.right{
            margin-left: auto;
            >button{
                display: flex;
                margin-left: auto;
            }
        }
    }
}
</style>

