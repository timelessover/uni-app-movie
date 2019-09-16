<script>
	const QQMapWX = require('./static/libs/qqmap-wx-jssdk.min.js');
	import {
		mapState,
		mapMutations
	} from 'vuex';
	let qqmapsdk;
	qqmapsdk = new QQMapWX({
		key: 'MH2BZ-4WTK3-2D63K-YZRHP-HM537-HHBD3'
	});
	import './static/font/iconfont.css'
	export default {
		onLaunch: function() {
			this.initPage()
		},
		methods: {
			initPage() {
				// 获取用户授权信息信息,防止重复出现授权弹框
				uni.getSetting({
					success: res => {
						// 已有权限直接获得信息，否则出现授权弹框
						if (res.authSetting['scope.userLocation']) {
							this.getUserLocation()
						} else {
							this.getUserLocation()
						}
					}
				})
			},
			getUserLocation() {
				uni.getLocation({
					// 成功授权
					success: (res) => {
						const latitude = res.latitude;
						const longitude = res.longitude;
						qqmapsdk.reverseGeocoder({
							// 避免出现两次弹框
							location: {
								latitude,
								longitude
							},
							success: (res) => {
								const cityFullname = res.result.address_component.city;
								const cityInfo = {
									latitude,
									longitude,
									cityName: cityFullname.substring(0, cityFullname.length - 1),
									status: 1
								}
								this.$store.commit('userLocation', { ...cityInfo
								})
								this.$store.commit('selectCity', { ...cityInfo
								})
							}
						})
					},
					fail: () => {
						this.$store.commit('userLocation', {
							status: 0
						})
					}
				})
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	// 公有样式
	// @import './static/font/iconfont.css'
	.line-ellipsis {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	/* topbar */
	.topbar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;
		border-bottom: 1px solid #e6e6e6;
	}

	.city-entry {
		padding-left: 30rpx;
		font-size: 30rpx;
		color: #666;
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
	}

	.city-name {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		max-width: 19.2vw;
	}

	.city-entry-arrow {
		width: 0;
		height: 0;
		border: 8rpx solid #b0b0b0;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		display: inline-block;
		margin-left: 8rpx;
		margin-top: 10rpx;
	}

	.phcolor {
		color: #999;
	}

	.buy-tickets .btn {
		width: 94rpx;
		height: 56rpx;
		line-height: 56rpx;
		text-align: center;
		box-sizing: border-box;
		background-color: #f03d37;
		color: #fff;
		border-radius: 8rpx;
		white-space: nowrap;
		font-size: 24rpx;
		border: none;
	}

	.buy-tickets .btn.pre-sale {
		background-color: #3c9fe6;
	}

	.buy-tickets .want-see {
		background-color: #faaf00;
	}
</style>
