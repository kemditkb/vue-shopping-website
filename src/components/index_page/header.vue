<template>
    <div id="header">
        <div id="header-content">
            <div class="link-list">
                <!-- 改成routerlink -->
                <div>折扣商品</div>
                <div>熱銷情報</div>
                <div>商品列表</div>
            </div>
            <div class="logo">
                <h1>Vue shopping</h1>
            </div>
            <div class="shopping-cart">
                <i class="fas fa-shopping-cart fa-lg"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
@import 'normalize.css';
#header{
    background-color: #f5f4f3;
    color: #49454b;
    >#header-content{
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 1200px;
        min-width: 1000px;
        height: 70px;
        margin: auto;
        position: relative;
        margin-bottom: 20px;
        >div{
            position: absolute
        }
        >.link-list{
            display: flex;
            left: 0;
            >div{
                padding-right: 6px;
                cursor: pointer;
                color: #49454b;
                &:hover{
                    color: #4fc08d;
                    text-decoration: none;
                }
            }
        }
        >.shopping-cart{
            right: 0;
            > i {
                &:hover{
                    cursor: pointer;
                }
            }
        }
        >.logo{
            display: flex;
            align-items: center;
            >h1{
                margin: 0;
                &:first-letter{
                    color:#4fc08d;
                }
            }
            &:hover{
                cursor: pointer;
            }
        }
    }
}
</style>
