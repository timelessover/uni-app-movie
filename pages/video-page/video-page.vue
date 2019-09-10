<template>
	<view v-if='info && current !==-1'>
		<view class='video-box'>
			<video :key='current' id='my-video' :src='videoList[current].videourl' autoplay @ended='endHandle'
			 @error='errorHandle'></video>
		</view>
		<scroll-view class='my-scroll' scroll-y>
			<view class='movie-intro-desc'>
				<view class='name-box'>
					<view class='name'>{{info.movieName}}</view>
					<view class='tag-box' v-if='info.version'>
						<text class='tag-d'>{{info.version[0]}}</text>
						<text v-if='info.version[1]' class='tag-imax'>{{info.version[1]}}</text>
					</view>
				</view>
				<view class='sc-box'>
					<view v-if='info.globalReleased'>
						<view v-if='info.sc'>猫眼评分
							<text class='yellow'>{{info.sc}}</text>
						</view>
						<view v-else>暂无评分</view>
					</view>
					<view v-else>
						<text class='yellow'>{{info.wish}}</text>人想看</view>
				</view>
				<view class='release'>{{info.release}}</view>
				<view class='buy-tickets' @click='goTo'>
					<view v-if='info.showst===3' class='btn'>购票</view>
					<view v-else-if='info.showst===1' class='btn want-see'>想看</view>
					<view v-else-if='info.showst===4' class='btn pre-sale'>预售</view>
				</view>
			</view>
			<view class='list-box' v-if='videoList.length'>
				<view class='play-title'>播放列表 （{{videoList.length}}）</view>
				<view v-for='(item,index) in videoList' :key='item' class='video-item' @click='selectItem(index)'>
					<view class='img-box'>
						<image :src='item.videoImg' mode='aspectFill'></image>
						<view class='txt' v-if='current===index'>播放中</view>
					</view>
					<view :class="['video-name', {'red':current === index}]">{{item.videoName}}</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		getRandom
	} from '../../utils/util.js'
	export default {
		data() {
			return {
				info: null,
				videoList: [], //播放列表
				current: -1 //当前播放视频索引
			}
		},
		onLoad(opt) {
		    const paramsObj = JSON.parse(opt.paramsStr)
		    this.initData(paramsObj)
		  },
		methods: {
			initData(obj) {
			    //没有获取video列表的API，所以只能自己模拟一个播放列表
			    const random = getRandom(1, 4)
			    const videoList = [{
			        ...obj.video
			      },
			      {
			        videoImg: 'https://p0.meituan.net/movie/bf98c928c915aafe9b44a55c1d6b6d1025670.jpg',
			        videoName: '今日爆燃上映 十月最爽解压大片没有之一',
			        videourl: 'https://maoyan.meituan.net/movie/videos/854x4806c4105439189467588ce837ee08bc123.mp4',
			      }, {
			        videoImg: 'https://p0.meituan.net/movie/f87a64c44eaa0216d541fb6f013eba4123888.jpg',
			        videoName: '小美好”版终极预告片 今年最减龄减压的青春片！',
			        videourl: 'https://maoyan.meituan.net/movie/videos/854x48041256160be8947b182921987f3e9da4c.mp4',
			      }, {
			        videoImg: 'https://p1.meituan.net/movie/2e0b6243ca72bc212f5288be3d36f41225058.jpg',
			        videoName: '悲伤逆流成河 终极预告片',
			        videourl: 'https://maoyan.meituan.net/movie/videos/854x480ba7b338968d44f90a099254eea294ef0.mp4',
			      }
			    ]
				this.videoList = videoList
				this.info = obj
			    this.setCurrent(0)
			  },
			  //设置当前播放视频
			  setCurrent(current) {
			    const {
			      info,
			      videoList
			    } = this
			    uni.setNavigationBarTitle({
			      title: `${info.movieName} ${videoList[current].videoName}`,
			    })
			    this.current = current
			  },
			  //播放列表的点击事件
			  selectItem(index) {
			    if (index !== this.current) {
			      this.setCurrent(index)
			    }
			  },
			  //视频播放结束
			  endHandle() {
			    const {
			      current,
			      videoList
			    } = this
			    let index = current + 1
			    if (index === videoList.length) {
			      index = 0
			    }
			    this.setCurrent(index)
			  },
			  //播放错误时
			  errorHandle() {
			    uni.showToast({
			      title: '播放错误',
			      icon: 'none'
			    })
			  },
			  //购票
			  goTo() {
			    const info = this.info;
			    const VideoContext = uni.createVideoContext('my-video', this);
			    VideoContext.pause()
			    uni.navigateTo({
			      url: `../select-cinema/select-cinema?movieId=${info.id}&movieName=${info.movieName}&showTime=${info.rt}`,
			    })
			  }
		}
	}
</script>

<style>
	.video-box {
		width: 100%;
		height: 420rpx;
	}

	#my-video {
		width: 100%;
		height: 420rpx;
	}

	.my-scroll {
		height: calc(100vh - 420rpx);
		width: 100%;
	}

	.movie-intro-desc {
		position: relative;
		padding: 30rpx;
		border-bottom: 20rpx solid #f5f5f5;
		color: #666;
		font-size: 26rpx;
	}

	.name-box {
		display: flex;
		align-items: center;
		color: #333;
		font-size: 38rpx;
	}

	.tag-box {
		border: 0.02rem solid #b3b5b9;
		border-radius: 4rpx;
		box-sizing: border-box;
		font-size: 20rpx;
		margin-left: 4rpx;
	}

	.tag-d {
		color: #fff;
		padding: 0 4rpx;
		background-color: #b3b5b9;
	}

	.tag-imax {
		color: #b3b5b9;
		padding: 0 4rpx;
	}

	.yellow {
		color: #ffc600;
		font-size: 32rpx;
	}

	.sc-box {
		margin: 10rpx 0;
	}

	.buy-tickets {
		position: absolute;
		top: 50%;
		right: 30rpx;
		transform: translateY(-50%);
	}

	.play-title {
		padding: 30rpx;
		border: 1px solid #f5f5f5;
		font-size: 30rpx;
		color: #333;
	}

	.video-item {
		display: flex;
		padding: 30rpx;
		padding-left: 0;
		margin-left: 30rpx;
		border-bottom: 1px solid #f5f5f5;
	}

	.img-box {
		position: relative;
		width: 220rpx;
		height: 124rpx;
	}

	.img-box image {
		width: 220rpx;
		height: 124rpx;
	}

	.txt {
		position: absolute;
		left: 10rpx;
		bottom: 10rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.video-name {
		/* 多行文字溢出打省略号 */
		flex: 1;
		margin-left: 30rpx;
		word-break: break-all;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
		font-size: 30rpx;
		color: #666;
	}

	.red {
		color: #f03d37;
	}

	/* 隐藏滚动条 */

	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}
</style>
