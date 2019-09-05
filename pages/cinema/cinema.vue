<template>
	<view class='container' :style="getPositonStyle">
		<view class='topbar'>
			<navigator class='city-entry' url='../../subPages/city-select/city-select'>
				<text class='city-name'>{{city}}</text>
				<text class='city-entry-arrow'></text>
			</navigator>
			<navigator url='../../search-page/search-page?stype=2' class='search-input'>
				<text class='iconfont icon-sousuo'></text>搜影院</navigator>
		</view>
		<!-- <view class='nav-wrapper'>
	    <filter-nav :city-cinema-info='cityCinemaInfo' @change='changeCondition' @toggleShow='toggleShow'></filter-nav>
	  </view> -->
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
	// import filterNav from '@/components/filter-nav.vue'
	import request from '@/utils/request.js'
	import loadingMore from '@/components/loadingMore.vue'
	import util from '@/utils/util.js'
	const app = getApp()
	export default {
		components: {
			cinemaSection,
			empty,
			// filterNav
		},
		data() {
			return {
				params: { //url请求参数对象
					day: util.getToday(),
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
			getPositonStyle() {
				return {
					position: this.isShow ? "fixed" : ""
				}
			},
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
			changeCondition(e) {
				console.log(e)
				const obj = e.
				uni.showLoading({
					title: '正在加载...'
				})
				this.params = {
					...this.data.params,
					...obj
				}
				this.cinemas = []
				this.nothing = false
				this.getCinemas(this.params).then((list) => {
					if (!list[1].length) {
						this.nothing = true
					}
					uni.hideLoading()
				})
			},
			//导航下拉框状态变化时的处理
			toggleShow(e) {
				const item = e.detail.item
				this.isShow = item !== -1
			},
		},
		onLoad() {
			this.initPage()
		},

		//上拉触底加载更多
		onReachBottom() {
			if (this.data.loadComplete) {
				return
			}
			const params = { ...this.data.params,
				offset: this.data.cinemas.length
			}
			this.getCinemas(params)
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

</style>
