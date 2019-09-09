<template>
	<view v-if='detailMovie'>
	  <view class='movie-header'>
	    <view class='movie-background' :style='style1'></view>
	    <view class='movie-mask'></view>
	    <view class='movie-content'>
	      <view class='movie-poster' :style='style1'></view>
	      <view class='movie-info'>
	        <view class='movie-name line-ellipsis'>{{detailMovie.nm}}</view>
	        <view class='movie-ename line-ellipsis'>{{detailMovie.enm}}</view>
	        <view v-if='detailMovie.globalReleased'>
	          <view v-if='detailMovie.sc'>
	            <view class='movie-score line-ellipsis'>
	              <!-- <image class='movie-star' v-for='(item,index) in detailMovie.stars' :key='index' src=`/assets/images/${item}.png`></image> -->
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
	  <!-- <view class='movie-body'>
	    <view class='section'>
	      <view class='section-title'>剧情简介</view>
	      <view class='synopsis' :style="{height:isFold?'120rpx':'auto'}">{{detailMovie.dra}}</view>
	      <view :class="['iconfont','icon-jiantouarrow483',{isFold?'':'unfold'} ]" @click='toggleFold'></view>
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
	        <image v-for='detailMovie.photos' :key='item' :src='item' class='photo' mode='aspectFill' @click='previewImage(index)'></image>
	      </scroll-view>
	    </view>
	    <view class='section' v-if='comments.total && comments.hcmts.length'>
	      <view class='section-title comment'>观众评论</view>
	      <view>
			  <commentSection v-for="(comment,index)in comments" :key="comment.id" :comment = "comment"></commentSection>
	      </view>
	      <navigator v-if='comments.total>3' class='total' url=`../comment-page/comment-page?movieId=${detailMovie.id}&movieName=${detailMovie.nm}`>查看全部{{comments.total}}条短评</navigator>
	    </view>
	  </view>
	  <navigator hover-class='none' url=`/pages/subPages/select-cinema/select-cinema?movieId=${detailMovie.id}&movieName=${detailMovie.nm}&showTime=${detailMovie.rt}` v-if='detailMovie.onSale' class='purchase'>优惠购票</navigator> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detailMovie:{img:''}
			};
		},
		computed: {
			style1() {
				return `background-image: url(${this.detailMovie.img})`
			}
		},
	}
</script>

<style lang="scss">

</style>
