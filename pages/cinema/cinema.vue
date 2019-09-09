<template>
	<view class='container' :style="{position: isShow ? 'fixed' : ''}">
		<view class='topbar'>
			<navigator class='city-entry' url='/pages/city-select/city-select'>
				<text class='city-name'>{{city}}</text>
				<text class='city-entry-arrow'></text>
			</navigator>
			<navigator url='/pages/search-page/search-page?stype=2' class='search-input'>
				<text class='iconfont icon-sousuo'></text>搜影院</navigator>
		</view>
		<view class='nav-wrapper'>
	    <filter-nav :city-cinema-info='cityCinemaInfo' @change='changeCondition' @toggleShow='toggleShow'/>
		</view>
		<view class='cinema-list'>
			<block v-for="(cinema,index) in cinemas" :key="cinema.id">
				<cinemaSection :cinema="cinema"></cinemaSection>
			</block>
		</view>
		<view v-if='!loadComplete && cinemas.length'>
			<loadingMore></loadingMore>
		</view>
		<view v-show='nothing'>
			<empty message="暂无符合条件的影院"></empty>
		</view>
	</view>
</template>

<script>
	import cinemaSection from '@/components/cinemaSection.vue'
	import empty from '@/components/empty.vue'
	import filterNav from '@/components/filter-nav.vue'
	import request from '@/utils/request.js'
	import loadingMore from '@/components/loadingMore.vue'
	import {getToday} from '@/utils/util.js'
	const app = getApp()
	export default {
		components: {
			cinemaSection,
			empty,
			filterNav,
			loadingMore
		},
		data() {
			return {
				params: { //url请求参数对象
					day: getToday(),
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
					updateShowDay: false
				},
				nothing: false, //结果是否为空
				cinemas: [], //影院列表
				cityCinemaInfo: {}, //城市影院信息
				loadComplete: false, //数据是否加载完
				isShow: false, //导航下拉框是否展开
			}

		},
		computed: {
			city(){
				if (!this.$store.state.selectCity) {
					return '正在定位'
				} else {
					return this.$store.state.selectCity.cityName
				}
			}
		},
		methods: {
			//初始化页面
			initPage() {
				uni.showLoading({
					title: '正在加载...'
				})
				this.getCinemas(this.params).then((res) => {
					this.cinemas = [...this.cinemas, ...res[1].data.cinemas]
					this.loadComplete = !res[1].data.paging.hasMore
					uni.hideLoading()
				})
				request('/ajax/filterCinemas').then((res) => {
					this.cityCinemaInfo = res[1].data
				})
			},
			//获取影院列表
			getCinemas(params) {
				return request('/ajax/cinemaList', params)
			},
			// 当过滤条件变化时调用的函数
			changeCondition(obj) {
				uni.showLoading({
					title: '正在加载...'
				})
				this.params = {
					...this.params,
					...obj
				}
				this.cinemas = []
				this.nothing = false
				this.getCinemas(this.params).then((list) => {
					if (!list[1].data.cinemas.length) {
						this.nothing = true
					}
					this.cinemas = [...this.cinemas, ...list[1].data.cinemas]
					this.loadComplete = !list[1].data.paging.hasMore
					uni.hideLoading()
				})
			},
			//导航下拉框状态变化时的处理
			toggleShow(e) {
				const item = e.detail.item
				this.isShow = item !== -1
			},
		},
		created() {
			this.initPage()
		},

		//上拉触底加载更多
		onReachBottom() {
			if (this.loadComplete) {
				return
			}
			const params = { ...this.params,
				offset: this.cinemas.length
			}
			this.getCinemas(params).then((res) => {
				this.cinemas = [...this.cinemas, ...res[1].data.cinemas]
				this.loadComplete = !res[1].data.paging.hasMore
				uni.hideLoading()
			})
		},
		//转发
		onShareAppMessage(res) {
			return {
				title: '最近上映的这些电影你都看了吗？',
				path: 'pages/tabBar/movie/movie'
			}
		}
	}
</script>

<style lang="scss">
	.topbar {
	  position: fixed;
	  width: 100vw;
	  top: 0;
	  height: 90rpx;
	  border: none;
	  background-color: #f5f5f5;
	}
	
	.search-input {
	  flex-grow: 1;
	  height: 56rpx;
	  font-size: 26rpx;
	  color: #999;
	  border: 1rpx solid #e6e6e6;
	  border-radius: 10rpx;
	  margin: 0 30rpx;
	  background: #fff;
	  line-height: 56rpx;
	  text-align: center;
	}
	
	.icon-sousuo {
	  display: inline-block;
	  margin-right: 10rpx;
	  font-size: 24rpx;
	  color: #999;
	}
	
	.nav-wrapper {
	  position: fixed;
	  z-index: 10;
	  top: 90rpx;
	  left: 0;
	  width: 100vw;
	  height: 80rpx;
	  background: #fff;
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
