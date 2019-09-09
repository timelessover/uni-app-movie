<template>
	<view class='empty'>
		<image src='/static/images/nothing.png' class='empty-img'></image>
		<view class='empty-text'>{{message}}</view>
	</view>
</template>

<script>
	export default{
		name:'empty',
		props:{
			message:{
				type: String
			}
		}
	}
</script>

<style lang="scss">
	.empty {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;

		.empty-img {
			width: 174upx;
			height: 200upx;
			margin-bottom: 16px;
		}

		.empty-text {
			font-size: 32rpx;
			color: #999;
		}
	}
</style>
