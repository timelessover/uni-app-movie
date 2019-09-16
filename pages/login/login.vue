<template>
	<view class="container">
		<image class="logo" src="../../static/images/logo.png" mode=""></image>
		<input type="number" placeholder="请输入手机号" v-model="phone">
		<input type="password" v-model="password" placeholder="密码" />
		<view class='btn-warpper'>
			<button @click="send">登陆</button>
		</view>
		<view class="tab-warpper">
			<view @click="goRegtister" class="register">立即注册</view>
			<view @click="goMovie" class="home">回到首页</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone: '',
				password: ''
			};
		},
		methods: {
			send() {
				const {
					phone,
					password
				} = this
				if (phone && password) {
					if (!uni.getStorageSync('users')) {
						uni.showToast({
							title: '您还未注册',
							duration: 1000,
							icon: 'none'
						})
					}
					const users = uni.getStorageSync('users') || []
					users.forEach(item => {
						if (item.phone === phone && item.password === password) {
							uni.setStorageSync('token', 'dsadsajlkjl')
							uni.switchTab({
								url: '/pages/user/user'
							})
						} else {
							uni.showToast({
								title: '账号或密码有误',
								duration: 1000,
								icon: 'none'
							})
						}
					})
				} else {
					uni.showToast({
						title: '请填写账号和密码',
						duration: 1000,
						icon: 'none'
					})
				}
			},
			goRegtister() {
				uni.navigateTo({
					url: '/pages/register/register'
				})
			},
			goMovie(){
				uni.reLaunch({
					url:'/pages/movie/movie'
				})
			},
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
	.register{
		text-align: center;
		color: #FE8C00;
	}
	.home{
		text-align: center;
		color: #FE8C00;
	}
	.tab-warpper{
		display: flex;
		justify-content: space-between;
		margin:0 40rpx;
	}
</style>
