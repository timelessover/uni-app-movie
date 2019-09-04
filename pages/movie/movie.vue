<template>
	<view>
		<view class='topbar'>
			<navigator class='city-entry' url='../../subPages/city-select/city-select'>
				<text class='city-name'>{{city}}</text>
				<text class='city-entry-arrow'></text>
			</navigator>
			<view class='switch-hot'>
				<view v-for="(item,index) in tabList" :key="index" :class="['hot-item',{ 'active':index == switchItem}]" @click='selectItem(index)'>
					{{item.title}}
				</view>
			</view>
			<navigator class='search-entry' url='../../subPages/search-page/search-page?stype=-1'>
				<text class='iconfont icon-sousuo'></text>
			</navigator>
		</view>
		<!--  头部轮播 -->
		<swiper :indicator-dots="false" :autoplay="false" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in imgList" :key="index">
				<view class="swiper-item">{{item.img}}</view>
			</swiper-item>
		</swiper>
		<!-- 列表 -->
		<view class='switch-content'>
			<view v-show="switchItem === 1">
				<block v-for="(item,index) in dataList" :key="index">
					<movie-section :movie='item'></movie-section>
				</block>
				<view v-if='!loadComplete0 && movieList0.length'>
					<loadingMore></loadingMore>
				</view>
			</view>
			<view v-show="switchItem===0">
				<view class='most-expected' v-if='mostExpectedList.length'>
					<view class='title'>近期最受期待</view>
					<scroll-view class='scroll-view_H' scroll-x bindscrolltolower='lower'>
						<navigator url=`/pages/subPages/movie-detail/movie-detail?movieId=${movie.id}` v-for="(movie,index) in mostExpectedList"
						 :key='movie.id' class='expected-item'>
							<image :src='movie.img' class='poster'></image>
							<view class='name line-ellipsis'>{{movie.nm}}</view>
							<view class='data line-ellipsis'>{{movie.wish}}人想看</view>
							<view class='data'>{{movie.comingTitle}}</view>
						</navigator>
					</scroll-view>
				</view>
				<block v-for='(movie,index) in movieList1' :key='movie.id'>
					<block v-if='index===0||movieList1[index-1].comingTitle!==movie.comingTitle'>
						<view class='title'>{{movie.comingTitle}}</view>
						<movie-section :movie='movie' rt=true></movie-section>
					</block>
					<movie-section :movie='movie' rt=true></movie-section>
				</block>
				<view v-if='!loadComplete1 && movieList1.length'>
					<loadingMore></loadingMore>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import movieSection from '../../components/movieSection.vue';
	import loadingMore from '../../components/loadingMore.vue'
	import request from '../../utils/request.js'
	const app = getApp()
	export default {
		components: {
			movieSection,
			loadingMore
		},
		data() {
			return {
				tabList: [{
						title: '正在热映'
					},
					{
						title: '即将上映'
					}
				],
				switchItem: 0,
				dataList: [],
				city: '正在定位...',
				switchItem: 0, //默认选择‘正在热映’
				//‘正在热映’数据
				movieList0: [],
				movieIds0: [],
				loadComplete0: false, //‘正在上映’数据是否加载到最后一条
				//‘即将上映’数据
				mostExpectedList: [],
				movieList1: [],
				movieIds1: [],
				loadComplete1: false,
				loadComplete2: false //水平滚动加载的数据是否加载完毕
			};
		},
		computed: {
			url() {
				return '/pages/test/test'
			}
		},
		methods: {
			selectItem(index) {
				const that = this
				this.switchItem = index
				if (index === 1 && !this.mostExpectedList.length) {
					uni.showLoading({
						title: '正在加载...'
					})

					request('/ajax/movieOnInfoList?token=').then(res => {
						uni.hideLoading()
						this.mostExpectedList = this.formatImgUrl(res[1].data.coming, true)
					})

					request('/ajax/comingList?token=&limit=10').then(res => {
						uni.hideLoading()
						that.movieIds1 = res[1].data.movieIds
						that.movieList1 = this.formatImgUrl(res.data.coming)
					})
				}
			},
			//处理图片url
			formatImgUrl(arr, cutTitle = false) {
				if (!Array.isArray(arr)) {
					return
				}
				let newArr = []
				arr.forEach(item => {
					let title = item.comingTitle
					if (cutTitle) {
						title = item.comingTitle.split(' ')[0]
					}
					let imgUrl = item.img.replace('w.h', '128.180')
					newArr.push({ ...item,
						comingTitle: title,
						img: imgUrl
					})
				})
				return newArr
			},
			initPage() {
				if (app.globalData.userLocation) {
						this.city =  app.globalData.selectCity ? app.globalData.selectCity.cityName : '定位失败'
				} else {
					const timer = setInterval(()=>{
						if(this.city !== '定位失败'){
							this.city = app.globalData.selectCity.cityName
							clearInterval(timer)
						}
					},1500)
				}
				this.firstLoad()
			},
			//第一次加载页面时请求‘正在热映的数据’
			firstLoad() {
				const that = this
				uni.showLoading({
					title: '正在加载...'
				})
				request('/ajax/movieOnInfoList?token=').then(res => {
					const movieList0 = that.formatImgUrl(res[1].data.movieList)
					uni.hideLoading()
					that.movieIds0 = res[1].data.movieIds
					if (res[1].data.movieList.length >= res[1].data.movieIds.length) {
						this.loadComplete0 = true
					}
				})
			},
			//上拉触底刷新的加载函数
			ReachBottom(list, ids, complete, item) {
				const that = this
				if (complete) {
					return
				}
				const length = list.length
				if (length + 10 >= ids.length) {
					this[`loadComplete${item}`] = true
				}
				let query = ids.slice(length, length + 10).join('%2C')
				request(`ajax/moreComingList?token=&movieIds=${query}`).then(res => {
					const arr = list.concat(that.formatImgUrl(res.data.coming))
					this[`movieList${item}`] = arr
				})
			},
			//滚动到最右边时的事件处理函数
			lower() {
				const {
					mostExpectedList,
					loadComplete2
				} = this
				const length = mostExpectedList.length
				const that = this
				if (loadComplete2) {
					return
				}
				request(`/ajax/mostExpected?limit=10&offset=${length}&token=`).then(res => {
					that.tmostExpectedList =  mostExpectedList.concat(that.formatImgUrl(res.data.coming, true))
				    that.loadComplete2 =  !res.data.paging.hasMore || !res.data.coming.length //当返回的数组长度为0时也认为数据请求完毕
				})
			},
		},
		onLoad() {
			this.initPage()
		},
		onShow() {
			if (app.globalData.selectCity) {
				this.city =  app.globalData.selectCity.cityName
			}
		},
		//上拉触底刷新
		onReachBottom() {
			const {
				switchItem,
				movieList0,
				movieIds0,
				loadComplete0,
				movieList1,
				movieIds1,
				loadComplete1
			} = this
			if (this.switchItem === 0) {
				this.ReachBottom(movieList0, movieIds0, loadComplete0, 0)
			} else {
				this.ReachBottom(movieList1, movieIds1, loadComplete1, 1)
			}
		},
		//转发
		onShareAppMessage(res) {
			return {
				title: '快来看看附近的电影院',
				path: 'pages/tabBar/movie/movie'
			}
		}
	}
</script>

<style lang="scss">
	.switch-hot {
		display: flex;
		height: 88rpx;
		line-height: 88rpx;
		position: relative;
	}

	.hot-item {
		font-size: 30rpx;
		color: #666;
		width: 21.33333vw;
		text-align: center;
		margin: 0 24rpx;
		font-weight: 700;
	}

	.hot-item.active {
		color: #ef4238;
		border-bottom: 2px solid #ef4238;
	}


	.search-entry {
		color: #ef4238;
		font-weight: 700;
		height: 100%;
		line-height: 90rpx;
		padding: 0 30rpx;
	}

	.search-entry .iconfont {
		font-size: 36rpx;
	}

	/* switch-content */

	.switch-content {
		padding-bottom: 30rpx;
	}

	.title {
		padding: 0 30rpx;
		padding-top: 20rpx;
		font-size: 28rpx;
		color: #333;
	}

	.most-expected {
		position: relative;
		padding: 0 30rpx;
		padding-bottom: 20rpx;
		border-bottom: 20rpx solid #f5f5f5;
	}

	.most-expected .title {
		padding-left: 0;
		margin-bottom: 20rpx;
	}

	.expected-item {
		display: inline-block;
		width: 170rpx;
		overflow: hidden;
		margin-right: 20rpx;
	}

	.poster {
		position: relative;
		width: 170rpx;
		height: 230rpx;
		margin-bottom: 12rpx;
	}

	.name {
		margin-bottom: 3px;
		font-size: 24rpx;
		color: #333;
	}

	.data {
		font-size: 24rpx;
		color: #999;
	}
</style>
