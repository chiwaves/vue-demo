<template>
    <div class="footer-service">
        <div class="container">
           <ul>
               <li>
                   <a href="javascript:;">
                        <span class="icon-setting"></span>
                        预约维修服务
                    </a>
               </li>
               <li>
                   <a href="javascript:;">
                        <span class="icon-7day"></span>
                        7天无理由退货
                    </a>
               </li>
                <li>
                    <a href="javascript:;">
                        <span class="icon-15day"></span>
                        15天免费换货
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <span class="icon-post"></span>
                        满99包邮
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <span class="icon-loc"></span>
                        520余家售后网点
                    </a>
                </li>
           </ul>
        </div>
    </div>
</template>

<script>
export default {
    name:'footer-service'
}
</script>

<style lang="scss">
    @import './../assets/scss/config.scss';
    @import './../assets/scss/mixin.scss';
    .footer-service{
        padding: 27px 0;
        font-size: 16px;
        ul{
            li{
                display: inline-block;
                width: 19.8%;
                text-align: center;
                border-right: 1px solid $colorH;
                a{
                    transition: color .2s;
                    &:hover{
                        color: $colorA;
                    }
                    span{
                        display: inline-block;
                        width: 24px;
                        height: 24px;
                        vertical-align: -5px;
                        margin-right: 4px;
                    }
                    .icon-setting{
                        @include bgImg(24px, 24px, 'icon-setting.png');
                    }
                    .icon-7day{
                        @include bgImg(24px, 24px, 'icon-7day.png');
                    }
                    .icon-15day{
                        @include bgImg(24px, 24px, 'icon-15day.png');
                    }
                    .icon-post{
                        @include bgImg(24px, 24px, 'icon-post.png');
                    }
                    .icon-loc{
                        @include bgImg(24px, 24px, 'icon-loc.png');
                    }
                }
            }
            :last-child{
                border: none;
            }
        }
    }
</style>