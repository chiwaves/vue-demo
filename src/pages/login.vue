<template>
    <div class="login">
        <div class="login-header">
            <div class="container">
                <a href="/#/index"><img src="/imgs/login-logo.png" alt="milogo"></a>
            </div>
        </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-form">
                    <h3>
                        <a href="javascript:;" class="active">帐号登录</a><span></span><a href="javascript:;">扫码登录</a>
                    </h3>
                    <div class="input" @keyup.enter="login">
                        <input type="text" v-model="username" placeholder="默认账号：admin">
                    </div>
                    <div class="input" @keyup.enter="login">
                        <input type="password" v-model="password" placeholder="默认密码：admin">
                    </div>
                    <a href="javascript:;" class="btn btn-large" @click="login" @keyup.enter="login">登录</a>
                    <div class="other-panel">
                        <div class="register">
                            <span class="SMS"><a href="javascript:;" @click="register">手机短信登录/注册</a></span>
                            <span class="create-forgot"><a href="javascript:;">立即注册</a><span></span><a href="javascript:;">忘记密码？</a></span>
                        </div>
                        <div class="more-options"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <p class="footer-link">
                <a href="javascript:;">简体</a>
                <span>|</span>
                <a href="javascript:;">繁体</a>
                <span>|</span>
                <a href="javascript:;">English</a>
                <span>|</span>
                <a href="javascript:;">常见问题</a>
                <span>|</span>
                <a href="javascript:;">隐私政策</a>
            </p>
            <p class="copyright">
                小米公司版权所有-京ICP备10046444-<a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802020134"><span><img src="https://account.xiaomi.com/static/res/9204d06/account-static/respassport/acc-2014/img/ghs.png"></span>京公网安备11010802020134号</a>-京ICP证110507号
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            username:'',
            password:'',
            userId:'',
        }
    },
    methods:{
        login(){
            let { username, password } = this;
            this.axios.post('/user/login', {
                username,
                password
            }).then((res)=>{
                this.$cookie.set('userId', res.id, {expires: 'Session'});
                this.$store.dispatch('saveUserName', res.username);
                this.$router.push({
                    name: 'index',
                    params: {
                      from: 'login'
                    }
                });
            })
        },
        register(){
            let { username, password } = this;
            this.axios.post('/user/register', {
                username,
                password,
                email:'admin@163.com'
            }).then(()=>{
                this.$message.success('注册成功');
            })
        }
    }
}

</script>
<style lang="scss">
    @import './../assets/scss/config';
    @import './../assets/scss/mixin';
    @import './../assets/scss/button';
    .login{
        .container{
            margin: 0 auto;
            width: 1130px;
        }
        .login-header{
            height: 98px;
            a{
                display: inline-block;
                height: 100%;
                img{
                    height: 100%;
                }
            }
        }
        .wrapper{
            width: 100%;
            height: 588px;
            background: url('/imgs/login-bg-1.jpg') no-repeat center;
            .container{
                display: flex;
                flex-direction: row-reverse;
                height: 588px;
                .login-form{
                    box-sizing: border-box;
                    width: 410px;
                    margin-top: 32px;
                    padding: 0 31px;
                    background-color: $colorG;
                    h3{
                        padding: 27px 0 24px;
                        text-align: center;
                        font-weight: normal;
                        a{
                            font-size: 24px;
                            color: $colorC;
                            &:hover{
                                color: $colorA;
                            }
                        }
                        .active{
                            color: $colorA;
                        }
                        span{
                            width: 1px;
                            font-size: 24px;
                            margin: 0 42px;
                            border: 1px solid #e0e0e0;
                        }
                    }
                    .input{
                        box-sizing: border-box;
                        height: 50px;
                        border: 1px solid $colorH;
                        margin-bottom: 14px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        input{
                            width: 316px;
                            height: 22px;
                            line-height: 22px;
                            font-size: 14px;
                            border: none;
                            color: $colorB;
                            &::placeholder{
                                color: $colorE;
                            }
                        }
                    }
                    .btn{
                        width: 100%;
                        margin: 10px auto;
                        font-size: 14px;
                    }
                    .other-panel{
                        .register{
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            a{
                                font-size: 14px;
                                color: $colorD;
                                &:hover{
                                    color: $colorA;
                                }
                            }
                            .SMS{
                                a{
                                    color: $colorA;
                                }
                            }
                            .create-forgot{
                                span{
                                    line-height: 14px;
                                    border: 1px solid $colorD;
                                    margin: 0 5px;
                                }
                            }
                        }
                    }
                }
            }
        }
        .login-footer{
            height: 80px;
            padding-top: 100px;
            text-align: center;
            .footer-link{
                a{
                    color: $colorC;
                    font-size: 14px;
                    &:hover{
                        color: $colorB;
                    }
                }
                span{
                    color: $colorC;
                    font-size: 14px;
                    margin: 0 12px;
                }
            }
            .copyright{
                color: $colorC;
                font-size: 14px;
                margin-top: 10px;
                a{
                    color: $colorC;
                    &:hover{
                        color: $colorB;
                    }
                }
            }
        }
    }
</style>