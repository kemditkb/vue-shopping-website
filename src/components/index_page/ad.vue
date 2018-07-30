<template>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <div class="ad-card">
                <div class="card-left">
                    <img src="../../assets/pic2.jpg" alt="">
                </div>
                <div class="card-right">
                    <h2>地表最強老爸好禮</h2>
                    <p>父親節沒新梗？不如參考我們的選品，給爸爸挑一份最實用、最有質感的父親節禮物吧！</p>
                    <button type="button" class="btn btn-primary">都在這</button>
                </div>
                
            </div>
            <div class="ad-card">
                <div class="card-left">
                    <img src="../../assets/pic2.jpg" alt="">
                </div>
                <div class="card-right">
                    <h2>｜只送不賣！夏日抽好禮 ｜</h2>
                    <p>7/30 - 8/3 完成 2 間設計館結帳，就有機會獲得「 Pinkoi x 好玻 GOODGLAS 聯名杯款 」，只送不賣！</p>
                    <button type="button" class="btn btn-primary">來試手氣</button>
                </div>
                
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.jumbotron{
    margin: 30px 0;
    >.container{
        display: flex;
        >.ad-card{
            display: flex;
            width: 600px;
            height: 200px;
            background-color: #ffffff;
            padding: 15px;
            border-radius: 5px;
            >.card-left{
                width: 30%;
                display: flex;
                align-items: center;
                >img{
                    width: 100%;
                    height: 100%;
                }
            }
            >.card-right{
                width: 70%;
                padding-left:30px;
                position: relative;
                >h2{
                    font-size: 18px;
                    font-weight: 700;
                    margin: 10px 0;
                }
                >button{
                    padding: 10px 24px 11px;
                    position: absolute;
                    bottom: 0;
                    left: 30px;
                    background: #4287d7;
                    transition: all 0.3s;
                    &:hover{
                        background: #619cdf;
                        transform: translate3d(0,-5px,0);
                        box-shadow: 0 0.2em 0.2em -0.1em #306fb7, 0 0.3em #215999, 0 0.5em 0.5em -0.1em rgba(0,0,0,0.12);
                        text-decoration: none;
                    }
                }
            }
        }
        >div:first-child{
            margin-right: 35px;
        }
    }
}
</style>

