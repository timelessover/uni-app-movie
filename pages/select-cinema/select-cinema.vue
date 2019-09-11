<template>
	<view class='container' :style="{position:isShow?'fixed':''}">
	  <view class='top'>
	    <view>
	      <selectTime :start-time='showTime' @selectDayEvent='changeTime'></selectTime>
	    </view>
	    <view>
	      <filter-nav :city-cinema-info='cityCinemaInfo' @change='changeCondition' @toggleShow='toggleShow' v-show='isShow'></filter-nav>
	    </view>
	  </view>
	  <view class='main-content'>
	    <view class='cinema-list'>
		  <cinemaSection v-for="(cinema,index) in cinemas" :key="cinema.id" :cinema="cinema" :movieId = "params.movieId" :day="params.day"></cinemaSection>
	    </view>
	    <view v-if='!loadComplete && cinemas.length'>
	      <loadingMore></loadingMore>
	    </view>
	    <view v-show='nothing'>
			<empty message = "暂无符合条件的影院"></empty>
	    </view>
	    <view v-show='noSchedule'>
			<empty message = "当天暂无场次"></empty>
	    </view>
	  </view>
	</view>
</template>

<script>
	import empty from '@/components/empty.vue'
	import loadingMore from '@/components/loadingMore.vue'
	import cinemaSection from '@/components/cinemaSection.vue'
	import selectTime from '@/components/select-time.vue'
	import filterNav from '@/components/filter-nav.vue'
	  
	export default {
		components:{
			selectTime,
			filterNav,
			cinemaSection,
			loadingMore,
			empty
		},
		data() {
			return {
				showTime: '', //影片上映日期
				isShow: false, //导航下拉框是否展开
				cityCinemaInfo: {}, //影院过滤菜单
				params: { //影院搜索条件
					movieId: 0,
					day: '',
					offset: 0,
					limit: 20,
					districtId: -1,
					lineId: -1,
					hallType: -1,
					brandId: -1,
					serviceId: -1,
					areaId: -1,
					stationId: -1,
					item: '',
					updateShowDay: false,
				},
				cinemas: [], //影院列表 
				loadComplete: false, //数据是否加载完
				nothing: false, //是否有符合过滤的影院
				noSchedule: false //当天是否有场次，原本时间是由后台返回的，但是缺少城市ID就没有返回，导致当天可能没有播放场次
			};
		},
		onLoad(options) {
			this.initPage(options)
		},
		methods:{
			initPage(options) {
				const movieId = options.movieId
				const movieName = options.movieName
				const showTime = options.showTime //影片上映日期
				uni.setNavigationBarTitle({
					title: movieName
				})
				this.showTime = showTime
				this.params = {
						...this.params,
						movieId
					}
			},
			//获取影院列表
			getCinemas(params) {
				return new Promise((resolve, reject) => {
					this.$request(`/ajax/movie?forceUpdate=${Date.now()}`,params,'POST').then(res=>{
						this.cinemas = this.cinemas.concat(res[1].data.cinemas),
						this.loadComplete = !res[1].data.paging.hasMore
						// 缺少了城市ID所以返回值缺少showDays，只能自己模拟时间
						resolve(res[1].data.cinemas)
					})
				})
			},
			//获取过滤菜单数据
			getFilter() {
				const {
					params
				} = this
				this.$request(`/ajax/filterCinemas?movieId=${params.movieId}&day=${params.day}`).then(res=>{
					this.cityCinemaInfo = res[1].data
				})
			},
			//当选择的时间变化时触发
			changeTime(day) {
				console.log(day)
				this.params = { ...this.params,
					...day
				}
				this.cinemas = []
				this.isShow = false //隐藏过滤下拉框
				this.noSchedule = false
				uni.showLoading({
					title: '正在加载...'
				})
				this.getCinemas(this.params).then((list) => {
					uni.hideLoading()
					if (!list.length) {
						this.noSchedule =  true
					}
				})
				this.getFilter()
			},
			//当过滤条件变化时调用的函数
			changeCondition(obj) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.params = {
					...this.params,
					...obj
				},
				this.cinemas = [],
				this.nothing = false
				this.getCinemas(this.params).then((list) => {
					if (!list.length) {
						this.nothing = true
					}
					uni.hideLoading()
				})
			},
			//导航下拉框状态变化时的处理，在下拉框展开时禁止滚动穿透
			toggleShow(item) {
				this.isShow = item !== -1
			}
		},
		//上拉触底加载更多
		onReachBottom() {
			if (this.loadComplete) {
				return
			}
			const params = {
				...this.params,
				offset: this.cinemas.length
			}
			this.getCinemas(params)
		}
	}
</script>

<style lang="scss">
.top {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  color: #555;
  font-size: 28rpx;
  background: #fff;
  z-index: 10;
}
.main-content {
  padding-bottom: 30rpx;
}

.cinema-list {
  margin-top: 170rpx;
}

::-webkit-scrollbar {
  width: 0;
  height: 0;
  color: transparent;
}

</style>
