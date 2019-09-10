<template>
	<view v-if='detailMovie'>
		<view class='movie-header'>
			<view class='movie-background' :style='detailMovieImg'></view>
			<view class='movie-mask'></view>
			<view class='movie-content'>
				<view class='movie-poster' :style='detailMovieImg'></view>
				<view class='movie-info'>
					<view class='movie-name line-ellipsis'>{{detailMovie.nm}}</view>
					<view class='movie-ename line-ellipsis'>{{detailMovie.enm}}</view>
					<view v-if='detailMovie.globalReleased'>
						<view v-if='detailMovie.sc'>
							<view class='movie-score line-ellipsis'>
								<image class='movie-star' v-for='(item,index) in detailMovie.stars' :key='index' :src='item'></image>
								{{detailMovie.sc}}
							</view>
							<view class='score-num line-ellipsis'>({{detailMovie.snum}}万人评分)</view>
						</view>
						<view class='no-score' v-else>暂无评分</view>
					</view>
					<view v-else class='movie-score'>{{detailMovie.wish}}人想看</view>
					<view class='movie-category line-ellipsis'>
						<view>{{detailMovie.cat}}</view>
						<view class='tag-box' v-if='detailMovie.version'>
							<text class='tag-d'>{{detailMovie.version[0]}}</text>
							<text v-if='detailMovie.version[1]' class='tag-imax'>{{detailMovie.version[1]}}</text>
						</view>
					</view>
					<view class='movie-time line-ellipsis'>{{detailMovie.src}} / {{detailMovie.dur}}分钟</view>
					<view class='movie-time line-ellipsis'>{{detailMovie.pubDesc}}</view>
				</view>
			</view>
		</view>
		<view class='movie-body'>
	    <view class='section'>
	      <view class='section-title'>剧情简介</view>
	      <view class='synopsis' :style="{height:toggleHeight}">{{detailMovie.dra}}</view>
	     <view :class="['iconfont','icon-jiantouarrow483',{unfold:isFold} ]" @click='toggleFold'></view>
	    </view>
	    <view class='section'>
	      <view class='section-title'>演职人员</view>
	      <scroll-view scroll-x class='scroll-view_H'>暂无数据...</scroll-view>
	    </view>
	    <view class='section'>
	      <view class='section-title'>媒体库</view>
	      <scroll-view scroll-x class='scroll-view_H'>
	        <view v-if='!detailMovie.videoImg && !detailMovie.photos.length'>暂无数据...</view>
	        <view class='videoImg-box' v-if='detailMovie.videoImg' @click='toVideo'>
	          <image :src='detailMovie.videoImg' class='videoImg' mode='aspectFill'></image>
	          <view class='iconfont icon-zanting'></view>
	        </view>
	        <image v-for='(item,index) in detailMovie.photos' :key='item' :src='item' class='photo' mode='aspectFill' @click='previewImage(index)'></image>
	      </scroll-view>
	    </view>
	    <view class='section' v-if='comments.total && comments.hcmts.length'>
	      <view class='section-title comment'>观众评论</view>
	      <view v-for="(comment,index) in comments.hcmts" :key="comment.id">
			  <comment-section  :comment = "comment"></comment-section>
	      </view>
	      <navigator v-if='comments.total>3' class='total' :url='watchAllUrl'>查看全部{{comments.total}}条短评</navigator>
	    </view>
	  </view>
	 <navigator hover-class='none' :url='purchaseUrl' v-if='detailMovie.onSale' class='purchase'>优惠购票</navigator>
	</view>
</template>

<script>
	import {
		calcTime
	} from '../../utils/util.js'
	import commentSection from '@/components/commentSection.vue'
	export default {
		components: {
			commentSection
		},
		data() {
			return {
				detailMovie: null, //电影详情
				isFold: true,
				comments: {} //观众评论
			};
		},
		onLoad(options) {
			const movieId = options.movieId
			this.initPage(movieId)
		},
		computed: {
			detailMovieImg() {
				if (this.detailMovie) {
					return `background-image: url(${this.detailMovie.img})`
				}
			},
			toggleHeight(){
				return this.isFold ? '120rpx':'auto'
			},
			watchAllUrl(){
				if(this.detailMovie){
					return `../comment-page/comment-page?movieId=${this.detailMovie.id}&movieName=${this.detailMovie.nm}`
				}
				
			},
			purchaseUrl(){
				if(this.detailMovie){
					return `/pages/select-cinema/select-cinema?movieId=${this.detailMovie.id}&movieName=${this.detailMovie.nm}&showTime=${this.detailMovie.rt}`
				}
				
			}
		},
		methods: {
			//初始页面
			initPage(movieId) {
				uni.showLoading({
					title: '加载中...',
				})
				this.getComment(movieId)
				this.$request(`/ajax/detailmovie?movieId=${movieId}`).then(res => {
					this.detailMovie = this.handleData(res[1].data.detailMovie)
					uni.hideLoading()
				})
			},
			//获取观众评论
			getComment(movieId) {
				this.$request(`/mmdb/comments/movie/${movieId}.json?_v_=yes&offset=0`).then(res => {
					let comments = { ...res[1].data
					}
					if (comments.total) {
						const arr = comments.hcmts.length ? comments.hcmts : comments.cmts
						comments.hcmts = this.formatData(arr.slice(0, 3))
					}
					this.comments = comments
				})
			},
			//处理数据
			formatData(arr) {
				let list = []
				if (arr.length) {
					list = arr.map(item => {
						let temp = { ...item
						}
						temp.avatarurl = temp.avatarurl || '/static/images/avatar.png'
						temp.purchase = !!(temp.tagList && temp.tagList.fixed.some(item => item.id === 4))
						temp.stars = this.formatStar(temp.score)
						temp.calcTime = calcTime(temp.startTime)
						return temp
					})
				}
				return list
			},
			//预览图片
			previewImage(currentIndex) {
				const urls = this.detailMovie.photos.map(item => item.replace('180w_140h', '375w_250h'))
				uni.previewImage({
					urls,
					current: urls[currentIndex]
				})
			},
			//处理评分星星
			formatStar(sc) {
				//1分对应满星，0.5对应半星
				let stars = new Array(5).fill('star-empty')
				const fullStars = Math.floor(sc) //满星的个数
				const halfStar = sc % 1 ? 'star-half' : 'star-empty' //半星的个数，半星最多1个
				stars.fill('star-full', 0, fullStars) //填充满星
				if (fullStars < 5) {
					stars[fullStars] = halfStar; //填充半星
				}
				let url = stars.map(item=>{
					 return item = `/static/images/${item}.png`
				})
				return url
			},
			//处理数据
			handleData(data) {
				let obj = data
				obj.img = obj.img.replace('w.h', '177.249')
				//将类似“v3d imax”转化为['3D','IMAX']
				obj.version = obj.version && obj.version.split(' ').map(item => {
					return item.toUpperCase().replace('V', '')
				})
				//将评分人数单位由个转化为万
				obj.snum = obj.snum / 10000
				obj.snum = obj.snum.toFixed(1)
			
				//评分星星,满分10分，一颗满星代表2分
				obj.stars = this.formatStar(obj.sc / 2)
				console.log(obj)
				//处理媒体库的图片
				obj.photos = obj.photos.map(item => item.replace('w.h/', '') + '@180w_140h_1e_1c.webp')
				return obj
			},
			//折叠与展开剧情简介
			toggleFold() {
				this.isFold = !this.isFold
			},
			//跳转到video页面
			toVideo() {
				const detailMovie = this.detailMovie;
				const paramsStr = JSON.stringify({
					video: {
						videourl: detailMovie.videourl,
						videoImg: detailMovie.videoImg,
						videoName: detailMovie.videoName,
					},
					movieName: detailMovie.nm, //电影名称
					id: detailMovie.id, //电影ID
					version: detailMovie.version, //电影类型（3d、IMAX）
					release: detailMovie.pubDesc, //上映时间
					rt: detailMovie.rt, //电影上映时间
					wish: detailMovie.wish, //想看的人数
					globalReleased: detailMovie.globalReleased, //是否上映
					sc: detailMovie.sc, //评分
					showst: detailMovie.showst //判读“想看”、“预售”
				})
				uni.navigateTo({
					url: `../video-page/video-page?paramsStr=${paramsStr}`
				})
			}
		}
	}
</script>

<style lang="scss">
	.movie-header {
		position: relative;
		height: 366rpx;
		box-sizing: border-box;
		padding: 30rpx;
		filter: blur(0);
		overflow: hidden;
	}

	.movie-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-size: cover;
		background-repeat: no-repeat;
		filter: blur(30rpx);
		z-index: -1;
	}

	.movie-mask {
		position: absolute;
		z-index: -1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: #40454e;
		opacity: 0.55;
	}

	.movie-content {
		display: flex;
		align-items: center;
		width: 100%;
		height: 100%;
		color: #fff;
	}

	.movie-poster {
		width: 214rpx;
		height: 300rpx;
		background-size: cover;
		background-repeat: no-repeat;
		border: solid 1px #f0f2f3;
	}

	.movie-info {
		height: 300rpx;
		width: 60%;
		margin-left: 30rpx;
		padding-top: 10rpx;
		font-size: 22rpx;
		color: #e5e5e5;
	}

	.movie-name {
		font-size: 36rpx;
		font-weight: 600;
		color: #fff;
	}

	.movie-ename {
		color: #fff;
		margin-bottom: 12rpx;
	}

	.movie-score {
		color: #ffc600;
		font-size: 36rpx;
	}

	.movie-star {
		width: 36rpx;
		height: 36rpx;
		margin-right: 6rpx;
	}

	.score-num {
		font-size: 20rpx;
	}

	.no-score {
		font-size: 32rpx;
	}

	.movie-category {
		display: flex;
		align-items: center;
		margin-top: 12rpx;
	}

	.tag-box {
		color: #fff;
		border: 0.02rem solid rgba(255, 255, 255, 0.4);
		border-radius: 4rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		margin-left: 4rpx;
	}

	.tag-d {
		padding: 0 4rpx;
		background-color: rgba(255, 255, 255, 0.4);
	}

	.tag-imax {
		padding: 0 4rpx;
	}

	.movie-body {
		margin-bottom: 110rpx;
	}

	.section {
		padding-bottom: 20rpx;
		border-bottom: 20rpx solid #f5f5f5;
		color: #555;
	}

	.section-title {
		padding: 20rpx 30rpx 10rpx;
		font-size: 32rpx;
		color: #444;
	}

	.synopsis {
		padding: 0 30rpx;
		line-height: 1.42;
		font-size: 30rpx;
		overflow: hidden;
	}

	.icon-jiantouarrow483 {
		height: 44rpx;
		width: 50rpx;
		background: red;
		text-align: center;
		font-size: 32rpx;
		line-height: 44rpx;
		
	}

	.unfold {
		transform: rotate(180deg);
	}

	.scroll-view_H {
		padding: 0 30rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}

	.videoImg-box {
		position: relative;
		display: inline-block;
	}

	.icon-zanting {
		position: absolute;
		bottom: 15rpx;
		right: 20rpx;
		font-size: 40rpx;
		opacity: 0.7;
		color: #fff;
	}

	.videoImg {
		width: 330rpx;
		height: 180rpx;
		margin-right: 10rpx;
	}

	.photo {
		width: 240rpx;
		height: 180rpx;
		margin-left: 10rpx;
	}

	.purchase {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background: #e54847;
		color: #fff;
		font-size: 40rpx;
		line-height: 100rpx;
		text-align: center;
	}

	.comment {
		padding: 20rpx 30rpx;
		border-bottom: 1px solid #e6e6e6;
	}

	.total {
		height: 80rpx;
		line-height: 80rpx;
		font-size: 30rpx;
		color: #f63;
		text-align: center;
		border-top: 1px solid #e6e6e6;
	}
</style>
