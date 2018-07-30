<template>
    <div id="slogan">
        <div id="slogan-background">
            <div class="container">
                <h2>三大保證</h2>
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/safety.png" alt="">
                            <h3>隱私及系統加密</h3>
                            <p>您的隱私還有安全是我們的第一考量。不但適用我們的保密系統保護您的資料，我們還保證不會把這資料透露給第三方。</p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/pay.png" alt="">
                            <h3>無縫整合</h3>
                            <p>旅行者在預訂時通過KKday付款。 結束後，KKday將直接轉帳付款給活動供應商。 當你外出玩樂時，不必再煩惱交易，這部分交給我們來處理。</p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/screen.png" alt="">
                            <h3>隨時隨地“滑”到你想去的地點</h3>
                            <p>無論您習慣提前計劃或者是喜歡當下做決定都沒關係！讓你自由選擇你的旅途路程並獲得即時確認。</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#slogan{
    color: #49454b;
    >#slogan-background{
        >.container{
            >h2{
                text-align: center;
                margin:30px 0;
                &:first-letter{
                    color:#4fc08d;
                }
            }
            >.row{
                >div{
                    >.img-box{
                        text-align: center;
                    }
                    >.card{
                        background-color: #fff;
                        border-radius: 6px;
                        box-shadow: 0 5px 20px 5px rgba(0,0,0,.1);
                        padding: 30px 30px;
                        transition: .3s;
                        height: 350px;
                        transition: all 0.6s;
                        >img{
                            width: 85px;
                            height: auto;
                            margin: auto;
                        }
                        >h3{
                            text-align: center;
                            margin: 25px 0;
                        }
                        &:hover{
                            transform: scale(1.05);
                        }
                    }
                }
            }
        }
    }
}
</style>

