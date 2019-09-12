<template>
	<view class='container'>
	  <view class='banner'>
	    <image src='/static/images/youcan.jpg' mode='aspectFill'></image>
	  </view>
	  <view class='section'>
	    <view v-for='(item,index) in info' :key='item.label'>
	      <text>{{item.label}}：</text>
	      <text>{{item.value}}</text>
	    </view>
	    <view>
	    </view>
	  </view>
	  <view class='section'>
	    <text> </text>
	  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[
				      
				    ]
			};
		}
	}
</script>

<style lang="scss">

</style>
