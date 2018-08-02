<template>
    <div id="slogan">
        <div id="slogan-background">
            <div class="container">
                <h2>三大保證</h2>
                <div class="row">
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/safety.png" alt="">
                            <h3>隱私及系統加密是我們的第一考量</h3>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/pay.png" alt="">
                            <h3>最多種付款方式，無縫整合</h3>
                        </div>
                    </div>
                    <div class="col-xs-12 col-md-4">
                        <div class="img-box card mt-20">
                            <img src="../../assets/screen.png" alt="">
                            <h3>隨時隨地“滑”到你想去買的商品</h3>
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
    margin:30px 0;
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

