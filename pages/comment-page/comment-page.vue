<template>
	<view>
		<view>
			<view class='hot' v-if='hcmts.length'>
				<view class='comment-title'>热门评论</view>
				<view  v-for='(comment,index) in hcmts' :key='comment.id'>
					<commentSection :comment='comment'></commentSection>
				</view>
				</view>
			</view>
			<view class='hot' v-if='cmts.length'>
				<view class='comment-title'>最新评论</view>
				<view  v-for='(comment,index) in cmts' :key='comment.id'>
					<commentSection :comment='comment'></commentSection>
				</view>
			</view>
			<view class='loadingMore' v-if='!loadComplete && cmts.length && hcmts.length'>
				<view class='loading-text'>加载更多...</view>
			</view>
		</view>
	</view>
</template>

<script>
	import commentSection from '@/components/commentSection.vue';

	import {handleImgandStars} from '@/mixin/handleImgandStars.js';
	export default {
		components: {
			commentSection
		},
		mixins: [handleImgandStars],
		data() {
			return {
				movieId: '',
				cmts: [], //最新评论
				hcmts: [], //热门评论
				loadComplete: false //是否加载完
			};
		},
		onLoad(options) {
			this.initPage(options)
		},
		onReachBottom() {
			this.getComment(this.movieId)
		},
		methods: {
			//初始化页面
			initPage(options) {
				const movieId = options.movieId
				const movieName = options.movieName
				this.movieId = movieId
				uni.setNavigationBarTitle({
					title: `观众评论-${movieName}`
				})
				uni.showLoading({
					title: '正在加载...',
				})
				this.getComment(movieId)

			},
			//获取观众评论
			getComment(movieId) {
				if (this.loadComplete) {
					return
				}
				const cmts = this.cmts
				this.$request(`/mmdb/comments/movie/${movieId}.json?_v_=yes&offset=${cmts.length}`).then(res => {
					let comments = { ...res[1].data
					}
					const newCmts = cmts.concat(this.formatData(comments.cmts))
					uni.hideLoading()
					this.hcmts = this.formatData(comments.hcmts)
					this.cmts = newCmts
					this.loadComplete = newCmts.length >= comments.total
				})
			},
		}
	}
</script>

<style lang="scss">
.comment-title{
  height: 60rpx;
  font-size: 28rpx;
  background: #f5f5f5;
  color: #666;
  line-height: 60rpx;
  padding-left: 30rpx;
}
.loading-text{
  margin-top: 0;
  margin-bottom: 8rpx;
  padding: 10rpx 0;
  background: #f5f5f5;  
}
</style>
