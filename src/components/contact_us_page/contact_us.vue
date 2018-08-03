<template>
    <div id="contact-us">
        <Header></Header>
        <div class="content" :class="{ active : toggleForm}">
            <div class="container">
                <form class="request-form" v-if="!toggleForm">
                    <h2>提交訊息</h2>
                    <div class="form-group">
                        <label for="email-input">電子信箱</label>
                        <input type="email" 
                            name="email"
                            class="form-input" 
                            id="email-input" 
                            placeholder="name@example.com"
                            v-validate="'required'"
                            :class="{ 'is-invalid': errors.has('email') }">
                        <span class="text-danger">
                            {{ errors.first('email') }}
                        </span>
                    </div>

                    <div class="form-group">
                        <label for="text-input">標題</label>
                        <input type="text" 
                        class="form-input" 
                        id="text-input"
                        name="title"
                        v-validate="'required'"
                        :class="{ 'is-invalid': errors.has('title') }">
                        <span class="text-danger" v-if="errors.has('title')">標題欄位不得為空</span>
                    </div>
                    <div class="form-group">
                        <label for="textarea-input">描述</label>
                        <textarea type="textarea" 
                            class="form-input-textarea" 
                            id="textarea-input"
                            name="areaText"
                            v-validate="'required'"
                            :class="{ 'is-invalid': errors.has('areaText') }">
                        </textarea>
                        <span class="text-danger" v-if="errors.has('areaText')">描述欄位不得為空</span>
                    </div>
                    <div class="form-group">
                        <label for="text-input">訂單編號</label>
                        <input type="text" class="form-input" id="text-input">
                        <span>提供完整資料可以加速案件處理的速度</span>
                    </div>
                    <button type="button" class="btn" @click="formSubmit">提交</button>
                </form>
                <div class="" v-else  @click="formSubmit">
                    我們會盡快回覆您的訊息！！
                    <router-link to="/" class="">
                        按我回到首頁
                    </router-link>
                </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>

<script>
import Header from '../index_page/header'
import Footer from '../index_page/footer'
export default {
    components:{
        Header,
        Footer
    },
    data(){
        return{
            toggleForm:false,
        }
    },
    methods:{
        formSubmit(){
            if(!this.toggleForm){
                this.toggleForm = !this.toggleForm;
            }else{
                this.toggleForm = !this.toggleForm;
            }
        }
    }
}
</script>


<style lang="scss" scoped>
#contact-us{
    
    >.active{
        height:calc(100vh - 179px - 70px - 100px );
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
                    >span{
                        display: block;
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
    
}
</style>
