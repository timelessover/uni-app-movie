<template>
  <view class='cinema-info'>
    <view class='info-box'>
      <view class='title line-ellipsis'>{{cinemaData.nm}}</view>
      <view class='location'>{{cinemaData.addr}}</view>
    </view>
    <navigator :url='url' class='location-icon' hover-class='none'>
      <image src='/assets/images/location.png' mode='aspectFit'></image>
      <view>地图</view>
    </navigator>
  </view>
</template>

<script>
	export default{
		name:'cinemaMap',
		props:{
			cinemaData:Object
		},
		computed:{
			url(){
				return `/pages/cinema-map/cinema-map?latitude=${this.cinemaData.lat}&longitude=${this.cinemaData.lng}&nm=${this.cinemaData.nm}&addr=${this.cinemaData.addr}`
			}
		}
	}
</script>

<style>
</style>
