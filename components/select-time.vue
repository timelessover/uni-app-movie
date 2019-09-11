<template>
	<view>
		<scroll-view class='timeline scroll-view_H' scroll-x>
			<view v-for='(item,index) in tdays' :class="['day', {'active':item.day==selectedDay}]"  :key='item' @click='selectDay(item.day)'>{{item.title}}</view>
		</scroll-view>
	</view>
</template>

<script>
	import {getToday,formatTime} from '../utils/util.js'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		props: {
			/**
			 * 模拟日期列表时开头的时间
			 */
			startTime: {
				type: String,
				default: getToday()
			},
		},
		data() {
			return {
				selectedDay:''
			};
		},
		mounted() {
			if (this.startTime) {
				this.getWeek(this.startTime)
			}
		},
		computed:{
			tdays(){
				return this.$store.state.days
			},
			day(){
				return this.$store.state.day
			}
		},
		methods: {
			// 模拟7天时间列表
			getWeek(startTime) {
				const todayTomorrow = ['今天', '明天', '后天']
				const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
				let days = []
				//当开始时间大于今天时，日期从大的时间开始算（主要是为了“预售”时间）
				let start = getToday()
				if (startTime > start) { //都是“2018-09-12”的格式，所以可以直接相减，否则转化为毫秒在相减
					start = startTime
				}
				for (let i = 0; i < 7; i++) {
					let day = new Date(start)
					day.setDate(day.getDate() + i) //往后推几天
					const num = (day - new Date(getToday())) / (1000 * 60 * 60 * 24) //计算相隔几天，减少必须是“今天”0时0分
					days.push({
						title: `${todayTomorrow[num] || week[day.getDay()]}${day.getMonth() + 1}月${day.getDate()}日`, //获取类似 “后天9月1日” 的字符串
						day: formatTime(day).split(' ')[0]
					})
				}
				this.$store.commit('getDays',days)
				this.selectDay()
			},
			selectDay(itemDay) {
				// 第一种情况是默认第一个日期
				// 第二种是切换过程中没有该日期，默认为第一个开始日期
				console.log(itemDay,this.findDefaultDay(),this.tdays.day)
				const day = itemDay || this.findDefaultDay() || this.tdays[0].day
				if (day === this.selectedDay) {
					return
				}
				this.selectedDay =  day
				this.$emit('selectDayEvent', {
					day
				})
			},
			// 第一次进入页面显示默认日期
			findDefaultDay() {
				console.log(this.tdays)
				const day = this.tdays.find(item => item.day == this.day)
				return day && day.day
			}
		}
	}
</script>

<style>
	.timeline {
		height: 90rpx;
		border-bottom: 1px solid #e6e6e6;
	}

	/* 设置了externalClasses 不起作用 */
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
	}

	.day {
		display: inline-block;
		height: 90rpx;
		width: 30%;
		line-height: 90rpx;
		text-align: center;
		box-sizing: border-box;
		margin: 0 10rpx;
		font-size: 28rpx;
		color: #333;
	}

	.day.active {
		color: #ef4238;
		border-bottom: 2px solid #ef4238;
	}
</style>
