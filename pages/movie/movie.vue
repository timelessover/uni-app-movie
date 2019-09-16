<template>
	<view>
		<view class='topbar'>
			<navigator class='city-entry' url='/pages/city-select/city-select'>
				<text class='city-name'>{{city}}</text>
				<text class='city-entry-arrow'></text>
			</navigator>
			<view class='switch-hot'>
				<view v-for="(item,index) in tabList" :key="index" :class="['hot-item',{ 'active':index == switchItem}]" @click='selectItem(index)'>
					{{item.title}}
				</view>
			</view>
			<navigator class='search-entry' url='/pages/search-page/search-page?stype=-1'>
				<text class='iconfont icon-sousuo'></text>
			</navigator>
		</view>
		<!-- tab1列表 -->
		<view class='switch-content'>
			<view v-show="switchItem === 0">
				<block v-for="(item,index) in movieList0" :key="index">
					<movie-section :movie='item'></movie-section>
				</block>
				<view v-if='!loadComplete0 && movieList0.length'>
					<loadingMore></loadingMore>
				</view>
			</view>
			<!-- tab2列表 -->
			<view v-show="switchItem===1">
				<view class='most-expected' v-if='mostExpectedList.length'>
					<view class='title'>近期最受期待</view>
					<scroll-view class='scroll-view_H' scroll-x @scrolltolower='lower'>
						<block v-for="(movie,index) in mostExpectedList" :key='movie.id'>
							<navigator :url="movie.url" class='expected-item'>
								<image :src='movie.img' class='poster'></image>
								<view class='name line-ellipsis'>{{movie.nm}}</view>
								<view class='data line-ellipsis'>{{movie.wish}}人想看</view>
								<view class='data'>{{movie.comingTitle}}</view>
							</navigator>
						</block>

					</scroll-view>
				</view>
				<block v-for='(movie,index) in movieList1' :key='movie.id'>
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
	import movieSection from '@/components/movieSection.vue';
	import loadingMore from '@/components/loadingMore.vue'
	import request from '@/utils/request.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	const app = getApp()
	export default {
		components: {
			movieSection,
			loadingMore
		},
		data() {
			return {
				tabList: [{
						title: '热映'
					},
					{
						title: '待映'
					}
				],
				switchItem: 0,
				movieList0: [],
				movieIds0: [],
				loadComplete0: false, //‘正在上映’数据是否加载到最后一条
				mostExpectedList: [],
				movieList1: [],
				movieIds1: [],
				loadComplete1: false,
				loadComplete2: false, //水平滚动加载的数据是否加载完毕
			};
		},
		computed: {
			city() {
				if (!this.$store.state.selectCity) {
					return '正在定位'
				} else {
					return this.$store.state.selectCity.cityName || city_name
				}
			}
		},
		methods: {
			selectItem(index) {
				this.switchItem = index
				if (index === 1 && !this.mostExpectedList.length) {
					uni.showLoading({
						title: '正在加载...'
					})
					this.getComing()
				}
			},
			getComing(index = 0) {
				request('/ajax/mostExpected?limit=10&offset=0&token=').then(res => {
					uni.hideLoading()
					let mostExpectedList = this.formatImgUrl(res[1].data.coming, true)
					mostExpectedList.forEach((item) => {
						item.url = `/pages/movie-detail/movie-detail?movieId=${item.id}`
					})
					this.mostExpectedList = mostExpectedList
					if(index === 1){
						if(res[1].statusCode === 200){
							uni.stopPullDownRefresh();
							uni.showToast({
								title:'刷新成功',
								duration:2000
							})
						}
					}
				})

				request('/ajax/comingList?token=&limit=10').then(res => {
					uni.hideLoading()
					this.movieIds1 = res[1].data.movieIds
					this.movieList1 = this.formatImgUrl(res[1].data.coming)
				})
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
				this.firstLoad()
			},
			getFrirstList(index = 0){
				request('/ajax/movieOnInfoList?token=').then(res => {
					this.movieList0 = this.formatImgUrl(res[1].data.movieList)
					uni.hideLoading()
					this.movieIds0 = res[1].data.movieIds
					if (res[1].data.movieList.length >= res[1].data.movieIds.length) {
						this.loadComplete0 = true
					}
					if(index === 1){
						if(res[1].statusCode === 200){
							uni.stopPullDownRefresh();
							uni.showToast({
								title:'刷新成功',
								duration:2000
							})
						}
					}
				})
			},
			//第一次加载页面时请求‘正在热映的数据’
			firstLoad() {
				uni.showLoading({
					title: '正在加载...'
				})
				this.getFrirstList()
			},
			//上拉触底刷新的加载函数
			ReachBottom(list, ids, complete, item) {
				if (complete) {
					return
				}
				const length = list.length
				if (length + 10 >= ids.length) {
					this[`loadComplete${item}`] = true
				}
				let query = ids.slice(length, length + 10).join('%2C')
				request(`/ajax/moreComingList?token=&movieIds=${query}`).then(res => {
					const arr = this.formatImgUrl(res[1].data.coming)
					this[`movieList${item}`] = [...list, ...arr]
				})
			},
			//滚动到最右边时的事件处理函数
			lower() {
				const {
					mostExpectedList,
					loadComplete2
				} = this
				const length = mostExpectedList.length
				if (loadComplete2) {
					return
				}
				request(`/ajax/mostExpected?limit=10&offset=${length}&token=`).then(res => {
					this.tmostExpectedList = mostExpectedList.concat(this.formatImgUrl(res[1].data.coming, true))
					this.loadComplete2 = !res[1].data.paging.hasMore || !res[1].data.coming.length //当返回的数组长度为0时也认为数据请求完毕
				})
			},
		},
		onLoad() {
			this.initPage()
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
		onPullDownRefresh() {
		        const {switchItem} = this
				if(switchItem === 0){
					this.getFrirstList(1)
				}else{
					this.getComing(1)
				}
				 
		    },
		//转发
		onShareAppMessage(res) {
			return {
				title: '快来看看附近的电影院',
				path: 'pages/movie/movie'
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
		width: 15vw;
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
