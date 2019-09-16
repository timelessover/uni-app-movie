<template>
	<view class="container">
		<image class="logo" src="../../static/images/logo.png" mode=""></image>
		<input type="number" placeholder="请输入手机号" v-model="phone">
		<input type="password" v-model="password" placeholder="密码" />
		<view class="btn-warpper">
			<button @click="register">注册</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				password:''
			};
		},
		methods: {
			register() {
				const {phone,password} = this
				let arr;
				if(!uni.getStorageSync('users')){
					arr = []
				}else{
					arr = uni.getStorageSync('users')
				}
				let TEL_REGEXP = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
				if(TEL_REGEXP.test(phone) && password.length>=6){
					arr.forEach(item=>{
						if(item.phone = phone){
							uni.showToast({
								title:'该账户已注册',
								icon:'none',
								duration:1000
							})
						}else{
							arr.push({phone:phone,password:password})
							uni.setStorageSync('users',arr)
							uni.navigateTo({
								url:'/pages/login/login'
							})
						}
					})
					
				}
				if(!TEL_REGEXP.test(phone)){
					uni.showToast({
						title:'请输入正确的手机号',
						icon:'none',
						duration:1000
					})
				}
				if(password.length<6){
					uni.showToast({
						title:'密码不得小于6位',
						icon:'none',
						duration:1000
					})
				}
				
			}
		},
	}
</script>

<style lang="scss">
	.logo{
		height:200rpx;
		width: 200rpx;
		display: block;
		margin: 60rpx auto;
	}
	input {
		padding: 15rpx;
		margin-bottom: 15rpx;
		border-bottom:1rpx solid #d6d6d6;
		margin-left:40rpx;
	}
	.btn-warpper{
		margin: 50rpx 30rpx;
		button {
			margin: 0;
			text-align: center;
			height: 80rpx;
			padding: 15rpx;
			border-radius: 20rpx;
			color: #fff;
			border: 0;
			background-color: #df2d2d;
			font-size: 40rpx;
			vertical-align: middle;
			line-height: 48rpx;
			box-sizing: border-box;
			background-color: #df2d2d;
		}
		.button-hover {
			background: #df2d2d;
			color: #fff;
		}
	}
</style>
