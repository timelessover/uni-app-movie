<template>
  <view class='loading-more'>
    <image src='/assets/images/loading.gif' class='loading-img'></image>
    <view class='loading-text'>正在加载...</view>
  </view>
</template>

<script>
	export default{
		name: 'loadingMore',
	}
</script>

<style lang="scss">
	.loading-more{
	  text-align: center;
	  margin-top: 18rpx;
	  .loading-img{
	    width: 54rpx;
	    height: 54rpx;
	  }
	  .loading-text{
	    margin-top: 8rpx;
	    color: #666;
	    font-size: 28rpx;
	  }
	}
</style>
