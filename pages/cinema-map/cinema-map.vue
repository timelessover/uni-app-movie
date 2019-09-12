<template>
	<view class='container'>
		<map id='map' class='map' :longitude='cinemaData.longitude' :latitude='cinemaData.latitude' show-location
		 :markers='markers'></map>
		<!-- 原生组件的层级是最高的，所以页面中的其他组件无论设置 z-index 为多少，都无法盖在原生组件上，所以只能用cover-image -->
		<cover-image src='/static/images/pos.png' class='pos' @click='position'></cover-image>
		<view class='cinema-box'>
			<view class='cinema-name'>{{cinemaData.nm}}</view>
			<view class='cinema-position'>{{cinemaData.addr}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cinemaData: null,
				markers: []
			};
		},
		onLoad(opt) {
			this.initData(opt)
		},
		methods: {
			initData(cinemaData) {
				this.cinemaData = cinemaData,
				this.markers = [{
					latitude: cinemaData.latitude,
					longitude: cinemaData.longitude
				}]
			},
			//定位自己的位置
			position() {
				const MapContext = uni.createMapContext('map')
				MapContext.moveToLocation()
			}
		},
	}
</script>

<style lang="scss">
	.container{
	  position: relative;  
	  width: 100vw;
	  height: 100vh;
	}
	.map{
	  width: 100%;
	  height: 85%;
	}
	.pos{
	  position: absolute;
	  right: 30rpx;
	  bottom: 17%;
	  width: 100rpx;
	  height: 100rpx;
	}
	.cinema-box{
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  height: 15%;
	  width: 85%;
	  padding: 0 30rpx;
	  box-sizing: border-box;
	}
	.cinema-name{
	  font-size: 38rpx;
	  font-weight: 700;
	  color: #333;
	  margin-bottom: 10rpx;
	}
	.cinema-position{
	  font-size: 30rpx;
	  color: #999;
	  line-height: 1.5;
	}
</style>
