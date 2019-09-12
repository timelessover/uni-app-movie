<template>
	<view class='container' v-if='order'>
		<view class='ticket-content'>
			<navigator class='cinema' :url='navUrl' hover-class='none'>
				<view>{{order.cinemaName}}</view>
				<view class='triangle'></view>
			</navigator>
			<view class='movie-info'>
				<view class='movie-name line-ellipsis'>{{order.movieName}}</view>
				<view class='showTime line-ellipsis'>{{order.time}} {{order.lang}}</view>
				<view class='position line-ellipsis'>{{order.hall}} {{order.seat}}</view>
			</view>
			<view class='divider-box'>
				<view class='divider'></view>
				<image class='status' src='/static/images/status.png'></image>
			</view>
			<view class='code-container'>
				<view class='code-box'>
					<view>手机号：136××××3590</view>
					<view>流水号：{{order.flowNumber}}</view>
					<view>验证码：{{order.Vcode}}</view>
				</view>
				<view class='rq'>
					<image src='/static/images/qr.png'></image>
				</view>
			</view>
		</view>
		<view class='price-box box'>
			<view>猫眼订单号：{{order.orderId}}</view>
			<view>总价：{{order.price}}元</view>
		</view>
		<view class='map-box'>
			<cinemaMap :cinemaData='order.cinemaData'></cinemaMap>
		</view>
		<view class='maoyan box'>
			<view>猫眼客服电话</view>
			<view class='phone-box'>
				<view>工作时间： 9:00-24:00</view>
				<view class='phone'>1010-5335</view>
			</view>
		</view>
	</view>
</template>

<script>
	import cinemaMap from '@/components/cinemaMap.vue';
	export default {
		components: {
			cinemaMap
		},
		data() {
			return {
				order: null
			};
		},
		onLoad(opt) {
			const paramsObj = JSON.parse(opt.paramsStr)
			this.initData(paramsObj)
		},
		computed: {
			navUrl() {
				if (this.order) {
					return `../cinema-detail/cinema-detail?cinemaId=${this.order.cinemaId}`
				}
			}
		},
		methods: {
			initData(order) {
				this.order = order
			}
		},
	}
</script>

<style lang="scss">
	.container {
		width: 100vw;
		min-height: 100vh;
		background: #f0f0f0;
		overflow: auto;
	}

	.ticket-content {
		margin: 24rpx;
		background: #fff;
		border-radius: 8rpx;
	}

	.cinema {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 76rpx;
		line-height: 76rpx;
		color: #666;
		padding: 0 30rpx;
		font-size: 28rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.triangle {
		width: 16rpx;
		height: 16rpx;
		border-left: 1px solid #999;
		border-top: 1px solid #999;
		margin-left: 5rpx;
		transform: rotate(135deg) scale(0.8);
	}

	.movie-info {
		padding: 0 30rpx;
	}

	.movie-info .movie-name {
		font-size: 36rpx;
		color: #333;
		margin: 20rpx 0;
	}

	.movie-info .showTime {
		font-size: 30rpx;
		color: #f03d37;
	}

	.movie-info .position {
		font-size: 30rpx;
		color: #666;
		margin: 10rpx 0 20rpx;
	}

	.divider-box {
		position: relative;
		border-bottom: 1px dashed #e6e6e6;
		margin: 40rpx 0;
	}

	.divider {
		position: absolute;
		top: -16rpx;
		height: 32rpx;
		line-height: 32rpx;
		text-align: center;
		left: 0;
		right: 0;
		font-size: 12px;
	}

	.divider::before {
		position: absolute;
		top: 50%;
		left: -20rpx;
		content: "";
		display: block;
		width: 40rpx;
		height: 40rpx;
		background: #f0f0f0;
		border-radius: 20rpx;
		margin-top: -20rpx;
	}

	.divider::after {
		position: absolute;
		top: 50%;
		right: -20rpx;
		content: "";
		display: block;
		width: 40rpx;
		height: 40rpx;
		background: #f0f0f0;
		border-radius: 20rpx;
		margin-top: -20rpx;
	}

	.divider-box .status {
		position: absolute;
		right: 26rpx;
		top: -56rpx;
		width: 112rpx;
		height: 112rpx;
	}

	.code-box {
		width: 18em;
		margin: 0 auto;
		padding: 10rpx 20rpx;
		color: #b2b2b2;
		font-size: 34rpx;
	}

	.rq {
		opacity: 0.4;
		text-align: center;
	}

	.rq image {
		width: 500rpx;
		height: 500rpx;
		margin: 0 auto;
	}

	.box {
		padding: 30rpx;
		background: #fff;
		font-size: 30rpx;
		color: #333;
		line-height: 1.5;
		margin-bottom: 20rpx;
	}

	.phone-box {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		color: #999;
	}

	.phone {
		color: #f03d37;
	}

	.map-box {
		margin-bottom: 20rpx;
	}
</style>
