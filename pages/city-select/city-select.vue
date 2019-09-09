<template>
	<view class='container'>
		<!-- 头部搜索框 -->
		<view class='search-city'>
			<input placeholder='输入城市名或拼音查询' class='search-input' v-model='searchValue' placeholder-class="phcolor"></input>
			<view class='iconfont icon-sousuo'></view>
		</view>
		<!-- 搜索为空时显示所有城市列表 -->
		<block v-if='!searchValue'>
			<view class='citylist-content'>
				<view v-for='(section,index) in citylist' :key='section.title' :data-title='section.title' class='section'>
					<view class='section-title'>{{section.title}}</view>
					<view :class="[section.style==='inline'?'section-body-inline':'section-body']">
						<view v-for='(city,index) in section.items' :key='city.id' class='section-item' @click='selectCity(city.city_name)'>{{city.city_name}}</view>
					</view>
				</view>
			</view>
			<!-- 右侧导航栏 -->
			<view class='citylist-nav' id='test' @touchmove='handleTouchmove' @touchstart='handleTouchstart' @touchend='handleTouchend'>
				<view v-for='(item,index) in citylist' :key='item.title' class='citylist-nav-item' @click='navSelect(index)'>{{item.style==='inline'?item.index:item.title}}</view>
			</view>
		</block>
		<!-- 搜索条件不为空时显示搜索结果列表 -->
		<block v-else>
			<view class='result-box'>
				<block v-if='result.length'>
					<view v-for='(city,index) in result' :key='city.id' @click='selectCity(city.city_name)' class='result-item'>{{city.city_name}}</view>
				</block>
				<block v-else>
					<empty message="没有找到相关内容"></empty>
				</block>
			</view>
		</block>
	</view>

</template>

<script>
	import empty from '@/components/empty.vue'
	import {throttle} from '../../utils/util.js'
	import {citys} from '../../utils/citys.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	const app = getApp()
	export default {
		name: 'city-select',
		components: {
			empty
		},
		data() {
			return {
				citylist: [],
				navTop: 0, //侧边导航距离窗口顶部的距离,
				navItemHeight: 0, //侧边导航项的高度
				sections: [], //所有section，保存每个section的节点在文档的位置信息
				inNavbar: false, //手指是否在侧边导航，主要是区别后面wx.pageScrollTo触发的滚动还是直接触发的滚动
				result: [] ,//城市查询结果列表
				searchValue:'' //搜索关键字
			};
		},
		onLoad() {
			this.normalizeCityList(citys)
		},
		onReady() {
			const query = uni.createSelectorQuery()
			query.select('.citylist-nav').boundingClientRect();
			query.select('.citylist-nav-item').boundingClientRect();
			query.selectAll('.section').fields({
				dataset: true,
				size: true,
				rect: true
			});
			query.exec((res) => {
				let sections = []
				let Y = 0
				res[2].forEach(item => {
					sections.push({
						top: Y,
						height: item.height,
						title: item.dataset.title
					})
					Y += item.height
				})
				this.navTop = res[0].top
				this.navItemHeight = res[1].height
				this.sections = sections
			})
		},
		onUnload() {
			uni.hideToast()
		},
		onPageScroll: throttle(function(e) {
			if (this.inNavbar || this.searchValue) {
				return // 如果是侧边栏的pageScrollTo触发的滚动则不执行下面的程序
			}
			const sections = this.sections
			const scrollTop = e.scrollTop
			this.handlePageScroll(sections, scrollTop)
		}),
		watch:{
			searchValue:function(val){
				const value = val.trim().toUpperCase()
				let result = []
				if (value) {
					result = citys.filter(item => {
						if (value.length === 1 && value >= 'A' && value <= 'Z') {
							return value === item.city_pre.toUpperCase()
						}
						return item.city_name.includes(value) || item.city_pinyin.toUpperCase().includes(value) || item.city_short.toUpperCase()
							.includes(value)
					})
				}
				this.result = result
			}
		},
		methods: {
			handlePageScroll(sections, scrollTop) {
				for (let item of sections) {
					if (scrollTop >= item.top && scrollTop < item.top + item.height) {
						uni.showToast({
							title: item.title,
							icon: 'none',
							duration: 500
						})
						break;
					}
				}
			},
			//处理API返回的城市列表数据
			normalizeCityList(citys) {
				let map = {}
				citys.forEach(item => {
					const key = item.city_pre.toUpperCase()
					//如果没有该字母索引，就创建该字母索引
					if (!map[key]) {
						map[key] = {
							title: key,
							items: []
						}
					}
					map[key].items.push(item)
				})
				let list = []
				for (let [index, value] of Object.entries(map)) {
					list.push(value)
				}
				//按字母顺序排序
				list.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0))
				//创建热门城市
				const hot = {
					title: '热门城市',
					index: '热门',
					style: 'inline',
					items: citys.slice(0, 10)
				}
				list.unshift(hot)
				//创建当前定位城市
				let current = {
					title: '当前定位城市',
					index: '定位',
					style: 'inline',
					items: []
				};
				// 判断是否获得用户定位城市
				if (this.$store.state.userLocation.status === 1) {
					let city = citys.find(item => item.city_name === this.$store.state.userLocation.cityName) || {
						city_name: '定位失败，请点击重试'
					}
					current.items = [city]
				} else {
					current.items = [{
						city_name: '定位失败，请点击重试'
					}]
				}
				list.unshift(current)
				this.citylist = list
			},
			//点击城市的事件处理程序
			selectCity(cityName) {
				const _this = this
				if (cityName === '定位失败，请点击重试') {
					uni.showModal({
						title: '',
						content: '需要先授权定位才可获得您的位置信息',
						confirmText: "打开定位",
						success(res) {
							if (res.confirm) {
								uni.openSetting({
									success(data) {
										if (data.authSetting['scope.userLocation']) {
											app.initPage()
										}
									}
								})
							}
						}
					})
				} else {
					uni.showModal({
						title: '提示',
						content: '没有获取猫眼城市ID的API，所以暂不支持切换城市',
						success(res) {
							if (res.confirm) {
								_this.$store.state.selectCity = {
									cityName
								}
								uni.switchTab({
									url: '/pages/movie/movie'
								})
							}
						}
					})
				}
			},
			//侧边栏导航的点击事件处理
			navSelect(index) {
				const {
					citylist,
					sections
				} = this
				uni.showToast({
					icon: 'none',
					title: citylist[index].title
				})
				uni.pageScrollTo({
					scrollTop: sections[index].top,
					duration: 0
				})
			},
			//在侧边栏上滑动的事件处理,使用函数节流优化
			handleTouchmove: throttle(function(e) {
				const {
					navTop,
					navItemHeight,
					citylist,
					sections
				} = this
				let index = Math.floor((e.changedTouches[0].clientY - navTop) / navItemHeight)
				if (index < 0 || index > citylist.length - 1) {
					return
				}
				uni.showToast({
					icon: 'none',
					title: citylist[index].title,
					duration: 500
				})
				uni.pageScrollTo({
					scrollTop: sections[index].top,
					duration: 0
				})
			}),
			//设置手指在侧边导航中
			handleTouchstart() {
				this.inNavbar = true
			},
			//设置手指离开侧边导航中
			handleTouchend() {
				this.inNavbar = false
			}
		}
	}
</script>

<style lang="scss">
	.container {
		background-color: #ebebeb;
		color: #333;
		font-size: 28rpx;
	}

	/* 搜索区样式 */

	.search-city {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #f5f5f5;
		padding: 22rpx 30rpx;
		box-sizing: border-box;
	}

	.search-input {
		height: 2em;
		background: #fff;
		padding-left: 60rpx;
		color: #999;
	}



	.icon-sousuo {
		position: absolute;
		z-index: 10;
		top: 50%;
		left: 50rpx;
		transform: translateY(-50%);
		color: #999;
	}

	/* 搜索结果区样式 */

	.result-box {
		min-height: calc(100vh - 100rpx);
		margin-top: 100rpx;
		background: #f5f5f5;

	}
	
	.result-item {
		height: 88rpx;
		line-height: 88rpx;
		margin-left: 30rpx;
		border-bottom: 1px solid #c8c7cc;
	}

	/* 城市列表样式 */
	.citylist-content {
		margin-top: 100rpx;
	}

	.section-title {
		padding-left: 30rpx;
		line-height: 60rpx;
	}

	.section-body {
		background-color: #f5f5f5;
		padding-right: 60rpx;
		.section-item:last-child {
			border: none;
		}
		.section-item {
			height: 88rpx;
			line-height: 88rpx;
			margin-left: 30rpx;
			border-bottom: 1px solid #c8c7cc;
		}
	}


	.section-body-inline {
		display: flex;
		flex-wrap: wrap;
		background-color: #f5f5f5;
		padding-bottom: 30rpx;
		padding-left: 30rpx;
		.section-item {
			min-width: 26%;
			background: #fff;
			margin-top: 30rpx;
			margin-right: 4%;
			border-radius: 6rpx;
			line-height: 66rpx;
			text-align: center;
			box-sizing: border-box;
			border: 1px solid #e6e6e6;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			padding: 0 30rpx;
		}
	}


	/* 城市侧边栏导航样式 */

	.citylist-nav {
		position: fixed;
		top: 13vh;
		right: 0;
		width: 30px;
		text-align: center;
		>view {
			font-size: 24rpx;
			line-height: 1.5;
		}
	}
</style>
