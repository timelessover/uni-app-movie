<template>
	<view class='container order-list-page'>
		<view v-for='(item,index) in orderList' :key='item' class='order-item'>
			<navigator class='order-title line-ellipsis' :url='navUrl(item)' hover-class='none'>
				<view>{{item.cinemaName}}</view>
				<view class='triangle'></view>
			</navigator>
			<view class='order-info' @click='goTo(item)'>
				<image :src='item.movieImg'></image>
				<view class='order-desc'>
					<view class='delete-box' @click.stop='deleteOrder(index)'>
						<view class='iconfont icon-del delete'></view>
					</view>
					<view class='movie-name line-ellipsis'>{{item.movieName}} 1张</view>
					<view class='showTime line-ellipsis'>{{item.time}}</view>
					<view class='position line-ellipsis'>{{item.hall}} {{item.seat}}</view>
				</view>
			</view>
			<view class='order-more'>
				<view>总价：{{item.price}}元</view>
				<view class='status'>已完成</view>
			</view>
		</view>
		<view v-show='isEmpty'>
			<empty message="暂无电影订单"></empty>
		</view>
	</view>

</template>

<script>
	import empty from '@/components/empty.vue';
	export default {
		components: {
			empty
		},
		data() {
			return {
				orderList: []
			}
		},
		onLoad() {
			this.initData()
		},
		computed:{
			isEmpty(){
				return !this.orderList.length
			}
		},
		methods: {
			navUrl(item) {
				return `../cinema-detail/cinema-detail?cinemaId=${item.cinemaId}`
			},
			initData() {
				this.orderList = uni.getStorageSync('movieOrder') || []
			},
			deleteOrder(index) {
				let orderList = this.orderList.slice();
				orderList.splice(index, 1)
				uni.showModal({
					title: '提示',
					content: '确认删除订单吗？',
					success: (res) => {
						if (res.confirm) {
							this.orderList = orderList
							uni.setStorageSync('movieOrder', orderList)
						}
					}
				})
			},
			//跳转到订单详情页面
			goTo(order) {
				const paramsStr = JSON.stringify(order)
				uni.navigateTo({
					url: `../movie-order-detail/movie-order-detail?paramsStr=${paramsStr}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.container.order-list-page {
		width: 100vw;
		min-height: 100vh;
		background: #f0f0f0;
		padding-bottom: 50rpx;
		box-sizing: border-box;
	}

	.order-list-page .order-item {
		background-color: #fff;
		margin-bottom: 20rpx;
	}

	.order-list-page .order-title {
		display: flex;
		align-items: center;
		padding: 20rpx 30rpx 20rpx 0;
		margin-left: 30rpx;
		color: #666;
		font-size: 28rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.order-list-page .triangle {
		width: 16rpx;
		height: 16rpx;
		border-left: 1px solid #999;
		border-top: 1px solid #999;
		margin-left: 5rpx;
		transform: rotate(135deg) scale(0.8);
	}

	.order-list-page .order-info {
		position: relative;
		display: flex;
		padding: 20rpx 30rpx 20rpx 0;
		margin-left: 30rpx;
		border-bottom: 1px solid #f0f0f0;
	}

	.order-list-page .order-info image {
		width: 114rpx;
		height: 160rpx;
	}

	.order-list-page .order-desc {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
		justify-content: space-around;
		margin-left: 24rpx;
		padding: 20rpx 0;
		font-size: 24rpx;
		color: #999;
	}

	/* showTime不继承order-desc？ */

	.order-list-page .showTime,
	.position {
		/* 不继承上面的font-size，所以重新写 */
		font-size: 24rpx;
	}

	.order-list-page .order-desc .delete-box {
		/* 多写一个box的原因是增大点击面积 */
		position: absolute;
		padding: 30rpx;
		top: 0;
		right: 0;
	}

	.order-list-page .delete-box .delete {
		font-size: 30rpx;
		color: #999;
	}

	.order-list-page .movie-name {
		font-size: 30rpx;
		width: 80%;
		color: #333;
	}

	.order-list-page .order-more {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 30rpx;
		font-size: 28rpx;
		color: #999;
	}
</style>
