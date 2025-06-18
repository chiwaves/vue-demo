<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask" @click="$emit('cancel')"></div>
            <div class="modal-dialog">
                <div class="modal-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
                </div>
                <div class="modal-body">
                    <slot name="body"></slot>
                </div>
                <div class="modal-footer">
                  <a href="javascript:;" class="btn" v-if="btnType==1" @click="$emit('submit')">{{sureText}}</a>
                  <a href="javascript:;" class="btn" v-if="btnType==2" @click="$emit('cancel')">{{cancelText}}</a>
                  <div class="btn-group" v-if="btnType==3">
                    <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                    <a href="javascript:;" class="btn btn-grey" @click="$emit('cancel')">{{cancelText}}</a>
                  </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name:"modal",
    props:{
        // 弹框类型：小small，中middle，大large，表单form
        modalType:{
            type:String,
            default:"form"
        },
        // 弹框标题
        title:String,
        // 按钮类型：1：确定 2：取消 3：确定取消
        btnType:String,
        sureText:{
            type:String,
            default:'确定'
        },
        cancelText:{
            type:String,
            default:'取消'
        },
        showModal:Boolean
    }
}
</script>

<style lang="scss">
    @import './../assets/scss/config';
    @import './../assets/scss/mixin';
    @import './../assets/scss/button';
    .modal{
        @include position(fixed);
        z-index: 50;
        .mask{
            @include position(fixed);
            background-color: $colorI;
            opacity: .5;
        }
        .modal-dialog{
            @include position(absolute, 40%, 50%, 660px, auto);
            background-color: $colorG;
            transform: translate(-50%, -50%);
            .modal-header{
                height: 60px;
                line-height: 60px;
                background-color: $colorJ;
                font-size: $fontI;
                padding: 0 25px;
                .icon-close{
                    @include posImg(absolute, 22px, 24px, 14px, 12px, 'icon-close.png');
                    transition: .5s;
                    &:hover{
                        transform: rotate(90deg);
                    }
                }
            }
            .modal-body{
                padding: 42px 40px 54px;
                font-size: $fontJ;
            }
            .modal-footer{
                height: 82px;
                line-height: 82px;
                text-align: center;
                background-color: $colorJ;
            }
        }
        &.slide-enter-active, &.slide-leave-active{
            transition: all .5s;
        }
        &.slide-enter, &.slide-leave-to{
            top:-2%;
            opacity: 0;
        }
    }
</style>