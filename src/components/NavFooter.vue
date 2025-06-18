<template>
    <div class="footer">
        <div class="footer-logo">
            <img src="/imgs/logo-footer.png" alt="logo">
            <p>小米商城</p>
        </div>
        <p class="footer-link">
            <a href="javascript:;">米粉卡</a>
            <span>|</span>
            <a href="javascript:;">小米政企服务</a>
            <span>|</span>
            <a href="javascript:;">小米集团隐私政策</a>
            <span>|</span>
            <a href="javascript:;">小米商城隐私政策</a>
            <span>|</span>
            <a href="javascript:;">小米公司儿童信息保护规则</a>
            <span>|</span>
            <a href="javascript:;">小米商城用户协议</a>
            <span>|</span>
            <a href="javascript:;">问题反馈</a>
        </p>
        <p class="copyright">
            Copyright ©2019 <span>mi.futurefe.com</span> All Rights Reserved.
        </p>
    </div>
</template>

<script>
export default {
    name:'nav-footer'
}
</script>

<style lang="scss">
    @import './../assets/scss/config.scss';
    .footer{
        height: 234px;
        background-color: $colorB;
        text-align: center;
        font-size: 16px;
        color: $colorD;
        border-top: 4px solid $colorA;
        .footer-logo{
            margin: 46px 0 31px;
            img{
                width: 53px;
                height: 36px;
                margin-bottom: 12px;
            }
        }
        .footer-link{
            margin-bottom: 12px;
            a{
                color: $colorD;
                &:hover{
                    color: $colorA;
                }
            }
            span{
                margin: 0 10px;
            }
        }
        .copyright{
            span{
                color: $colorA;
            }
        }
    }
</style>