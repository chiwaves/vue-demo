<template>
	<div class="param-bar" :class="{'is_fixed':isFixed}">
		<div class="container">
			<h2>{{title}}</h2>
			<div class="selection">
				<a href="javascript:;">概述</a>
				<span>|</span>
				<a href="javascript:;">参数</a>
				<span>|</span>
				<a href="javascript:;">F码通道</a>
				<span>|</span>
				<a href="javascript:;">咨询客服</a>
				<span>|</span>
				<a href="javascript:;">用户评价</a>
				<slot name="buy"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: 'param-bar',
  props:{
    title: String
  },
  data(){
    return {
			isFixed: false
    }
  },
  mounted(){
		window.addEventListener('scroll', this.initHeight);
	},
	destroyed(){
		window.removeEventListener('scroll', this.initHeight, false);
	},
  methods: {
		initHeight(){
			let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			this.isFixed = scrollTop >= 152 ? true : false;
		}
  }
}
</script>

<style lang="scss">
  @import './../assets/scss/config';
  @import './../assets/scss/mixin';
	.param-bar{
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-color: $colorG;
		border-top: 1px solid $colorH;
    z-index: 10;
		box-shadow: 0 5px 5px rgba(0,0,0,.07);
		&.is_fixed{
			position: fixed;
			top: 0;
		}
		.container{
			@include flex();
			h2{
				font-size: $fontH;
				font-weight: 400;
			}
			.selection{
				a{
					color: $colorC;
					font-size: $fontJ;
					margin: 0 8px;
					&:hover{
						color: $colorA;
					}
				}
				span{
					font-size: $fontJ;
					color: $colorH;
				}
			}
		}
	}
</style>