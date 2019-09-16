<template>
	<view class='container'>
		<!-- 头部 -->
		<view class='image-box'>
			<image :src='info.dealBrief.imageUrl' mode='aspectFill'></image>
			<view class='info-box'>
				<view class='cinema-name line-ellipsis'>{{cinemaName}}</view>
				<view class='snack-title line-ellipsis'>{{info.dealBrief.title}}</view>
			</view>
			<view class='mask'></view>
		</view>
		<!-- 价格 -->
		<view class='section'>
			<view class='price-box'>
				<view>
					<text class='price-num' v-if='info.dealBrief.originPrice'>{{info.dealBrief.originPrice}}<text class='yuan'>元</text></text>
					<text class='cinema-price' v-if='info.dealBrief.value'>影院价:{{info.dealBrief.value}}元</text>
				</view>
				<view class='buy-btn' @click='buySnack'>立即抢购</view>
			</view>
			<view class='price-box'>
				<view class='deal-tags-list'>
					<text class='item' v-if='info.dealBrief.refundTag.supportTimeRefund'><text class='text-icon'></text>随时退</text>
					<text class='item' v-if='info.dealBrief.refundTag.supportExpireRefund'><text class='text-icon'></text>过期退</text>
				</view>
				<view class='sold'>
					<text class='iconfont icon-04'></text>
					<text>{{info.dealBrief.curNumberDesc}}</text>
				</view>
			</view>
		</view>
		<!-- 套餐详情 -->
		<view class='section'>
			<view class='section-title'>套餐详情</view>
			<view class='dealsets-details' v-for='(item,index) in info.dealBrief.menus' :key='item'>
				<view class='set-title' v-if='item.title'>{{item.title}}</view>
				<view class='detail-group' v-for='(item,index) in item.items' :key='item'>
					<text class='right line-ellipsis'>{{item.name}}</text>
					<text class='center line-ellipsis'>{{item.amount}}</text>
					<text class='left'>¥{{item.subtotal}}</text>
				</view>
			</view>
		</view>
		<!-- 购买须知 -->
		<view class='purchase-notice section'>
			<view class='section-title'>购买须知</view>
			<view class='terms'>
				<view class='terms-item' v-for='(item,index) in info.dealBrief.terms' :key='item'>
					<view class='tip-title' v-if='item.title'>{{item.title}}:</view>
					<view class='tip-des'>{{item.content}}</view>
				</view>
			</view>
		</view>
		<!-- 影院信息 -->
		<view class='section'>
			<view class='section-title'>影院信息</view>
			<cinemaMap :cinemaData='cinemaData'></cinemaMap>
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
				info: null, //小吃详情
				cinemaName: '',
				cinemaData: null //影院地图详情
			};
		},
		onLoad(obj) {
			const paramsObj = JSON.parse(obj.paramsStr)
			this.initPage(paramsObj)
		},
		methods: {
			initPage(obj) {
				uni.showLoading({
					title: '正在加载',
				})
				const data = {
					dealId: obj.dealId,
					quantity: 1,
					cinemaId: obj.cinemaId,
				}
				this.$request(
					'/deal/goods/price?_v_=yes&token=PgJXM8m4VR2zXDQg6oifDddNBrIAAAAADgkAALyIjr91LRTeK57NBTJaOmpLFZG7eticyNX7QnRmA5phdxjFESSeeyAdwZot9BL0_Q',
					data, "POST").then(res => {
					console.log(res)
					this.cinemaId = obj.cinemaId
					this.cinemaName = obj.cinemaName
					this.cinemaData = obj.cinemaData
					this.info = res[1].data.data
					uni.hideLoading()
				})
			},
			//跳转到“提交订单”页面
			buySnack() {
				const {
					info,
					cinemaName,
					cinemaId
				} = this
				//添加订单信息
				const paramsStr = JSON.stringify({
					cinemaName,
					cinemaId,
					title: info.dealBrief.title, //套餐名
					img: info.dealBrief.imageUrl, //图片
					amount: 1, //数量
					price: info.dealBrief.originPrice, //单价
					total: info.dealBrief.originPrice * 1 //合计
				})
				uni.navigateTo({
					url: `/pages/buy-snack/buy-snack?paramsStr=${paramsStr}`,
				})
			}
		},
	}
</script>

<style lang="scss">
	.container {
		padding-bottom: 50rpx;
	}

	/* 头部 */

	.image-box {
		position: relative;
		width: 100%;
		height: 400rpx;
		overflow: hidden;
	}

	.image-box image {
		width: 100%;
		height: 100%;
	}

	.image-box .info-box {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		width: 100%;
		box-sizing: border-box;
		padding: 20rpx 30rpx;
		color: #fff;
		z-index: 8;
	}

	.info-box .cinema-name {
		font-size: 36rpx;
		line-height: 1em;
		margin-bottom: 10rpx;
	}

	.info-box .snack-title {
		line-height: 1em;
		font-size: 30rpx;
	}

	.image-box .mask {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 120rpx;
		background-color: #222;
		opacity: 0.55;
		filter: blur(60rpx);
	}

	/* 价格 */

	.price-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30rpx;
		padding-left: 0;
		margin-left: 30rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.price-box:last-child {
		border: none;
	}

	.price-box .price-num {
		color: #f03d37;
		font-size: 50rpx;
	}

	.price-box .price-num .yuan {
		font-size: 24rpx;
	}

	.price-box .cinema-price {
		margin-left: 15rpx;
		font-size: 28rpx;
		color: #999;
	}

	.price-box .buy-btn {
		padding: 20rpx 30rpx;
		color: #fff;
		font-size: 36rpx;
		background-color: #f90;
		border-radius: 8rpx;
	}

	.deal-tags-list {
		font-size: 28rpx;
		color: #6bbd00;
	}

	.deal-tags-list .item {
		display: inline-block;
		margin-right: 30rpx;
	}

	.text-icon {
		display: inline-block;
		width: 1em;
		height: 1em;
		background-size: 100% 100%;
		margin-right: 15rpx;
		vertical-align: middle;
		background-image: url(data:image/png;base64,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);
	}

	.sold {
		color: #666;
	}

	.icon-04 {
		color: #666;
		margin-right: 15rpx;
	}

	.section {
		border-bottom: 20rpx solid #f5f5f5;
		font-size: 28rpx;
	}

	.section-title {
		padding: 30rpx 30rpx 30rpx 0;
		margin-left: 30rpx;
		color: #999;
		font-size: 34rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.set-title {
		position: relative;
		top: -1px;
		background: #f9f9f9;
		text-align: center;
		padding: 20rpx 0;
		color: #999;
		line-height: 1em;
		font-size: 26rpx;
	}

	.detail-group {
		display: flex;
		margin-left: 30rpx;
		color: #666;
		font-size: 28rpx;
		border-bottom: 1px dashed #ddd8ce;
	}

	.detail-group:last-child {
		border: none;
	}

	.detail-group .right {
		width: 70%;
		padding: 30rpx 0;
		padding-left: 0;
	}

	.detail-group .center {
		width: 15%;
		padding: 30rpx 0;
		border-right: 1px dashed #ddd8ce;
		border-left: 1px dashed #ddd8ce;
		text-align: center;
	}

	.detail-group .left {
		width: 15%;
		padding: 30rpx 0;
		text-align: center;
	}

	/* 购买须知 */

	.terms-item {
		margin: 30rpx;
	}

	.tip-title {
		color: #666;
		margin-bottom: 10rpx;
		font-size: 30rpx;
	}

	.tip-des {
		color: #999;
		font-size: 28rpx;
	}
</style>
