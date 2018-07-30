<template>
    <div id="contact-us">
        <div class="header">
            <div class="container">
                <router-link to="/home" class="logo" >
                    <h1>Vue shopping</h1>
                </router-link>
                <div class="link-list">
                    <router-link to="/home" class="home" >
                        回到首頁
                    </router-link>
                    <div class="shopping-cart">
                        購物車<i class="fas fa-shopping-cart fa-lg"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="container">
                <form class="request-form">
                    <h2>提交訊息</h2>
                    <div class="form-group">
                        <label for="email-input">電子信箱</label>
                        <input type="email" class="form-input" id="email-input" placeholder="name@example.com">
                    </div>
                    <div class="form-group">
                        <label for="text-input">標題</label>
                        <input type="text" class="form-input" id="text-input">
                    </div>
                    <div class="form-group">
                        <label for="textarea-input">描述</label>
                        <textarea type="textarea" class="form-input-textarea" id="textarea-input">
                        </textarea>
                    </div>
                    <div class="form-group">
                        <label for="text-input">訂單編號</label>
                        <input type="text" class="form-input" id="text-input">
                    </div>
                    <button type="button" class="btn">提交</button>
                </form>
            </div>
        </div>
        <div class="footer">
            <div class="container">
                <div>Vue shopping Help Center for Taiwan</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
#contact-us{
    >.header{
        border-bottom: 1px solid #dddddd;
        >.container{
            display: flex;
            
            >.logo{
                display: flex;
                align-items: center;
                height: 90px;
                >h1{
                    margin: 0;
                    color: #49454b;
                    &:first-letter{
                        color:#4fc08d;
                    }
                }
                &:hover{
                    cursor: pointer;
                    text-decoration: none;
                }
            }
            >.link-list{
                display: flex;
                align-items: center;
                margin-left: auto;
                font-size: 16px;
                >.home{
                    color: #49454b;
                    &:hover{
                        cursor: pointer;
                        color:#4fc08d;
                        text-decoration: none;
                    }
                }
                >.shopping-cart{
                    margin-left: 20px;
                    &:hover{
                        cursor: pointer;
                        color:#4fc08d;
                        text-decoration: none;
                    }
                }
            }
        }
    }
    >.content{
        margin:50px 0;
        >.container{
            >.request-form{
                >h2{
                    margin: 0;
                    margin-bottom: 20px;
                }
                >.form-group{
                    >label{
                        display: block;
                    }
                    >input{
                        width: 50%;
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        padding:10px;
                        &:focus{
                            outline: none;
                            border: 1px solid #fd5491;
                        }
                    }
                    >textarea{
                        border: 1px solid #ddd;
                        border-radius: 5px;
                        resize: vertical;
                        width: 50%;
                        padding: 10px;
                        &:focus{
                            outline: none;
                            border: 1px solid #fd5491;
                        }
                    } 
                }
                >button{
                    background-color: #4fc08d;
                    border: 0;
                    border-radius: 4px;
                    color: #ffffff;
                    font-size: 14px;
                    font-weight: 400;
                    line-height: 2.72;
                    min-width: 190px;
                    padding: 0 1.9286em;
                    &:hover{
                        background-color: #22aa6d;
                    }
                }
            }
        }
    }
    >.footer{
        width: 100%;
        height: 90px;
        display: flex;
        align-items: center;
        border-top: 1px solid #ddd;
        >.container{
            >div{
                font-size: 15px;
                color:#49454b;
            }
        }
    }
}
</style>
