<template>
    <div id="footer">
        <div id="footer-content">
            <div class="about-us">關於 Vue shopping</div>
            <div class="follow-title">
                <div class="item">追蹤 Vue shopping</div>
                <div class="item">
                    <div class="icon-size">
                        <i class="fab fa-github fa-lg"></i>
                    </div>
                    <p>Github</p>
                </div>
                <div class="item">
                    <div class="icon-size">
                        <i class="fab fa-linkedin fa-lg"></i>
                    </div>
                    <p>Linkedin</p>
                </div>
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
#footer{
    background-color: #f5f4f3;
    color: #49454b;
    >#footer-content{
        display: flex;
        justify-content: center;
        padding: 10px 0px;
        margin-top: 20px;
        >.about-us{
            margin-right: 100px;
            margin-bottom: 6px;
            font-size: 14px;
            font-weight: 700;
            &:hover{
                cursor: pointer;
                color: #4fc08d;
            }
        }
        >.follow-title{
            >.item{
                display: flex;
                padding-left: 15px;
                margin-bottom: 5px;
                >.icon-size{
                    width: 20px;
                    height: 20px;
                }
                >p{
                    margin: 0;
                    margin-left: 5px;
                }
                &:hover{
                    cursor: pointer;
                    color: #4fc08d;
                }
            }
            >div:first-child{
                margin-bottom: 6px;
                padding:0;
                font-size: 14px;
                font-weight: 700;
                &:hover{
                    cursor: auto;
                    color: #49454b;
                }
            }
        }
    }
}
</style>


