<template>
	<view class="select-page">
		<view class="info-block">
			<view class="movie-info">
				<view class="flex">
					<view class="title line-ellipsis">{{movie.movieName}}</view>
					<view class="info line-ellipsis">
						<text>{{show.showDate}}&nbsp;{{show.showTime}}</text>
						<text style="margin-left: 5px; ">{{show.dim}}{{show.lang}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="select-block">
			<view class="hall-name-wrapper" style="transform: translate3d(80px, 0px, 0px)">
				<text class="hall-name">{{hall.hallName}}</text>
			</view>
			<view style="margin-top:30px;display: flex;">
				<view class="row-nav">
					<view v-for='(item,index) in seat' :key="">{{item.rowId}}</view>
				</view>
				<view class="seats-block">
					<view class="m-line">
						<view class="viewider"></view>
					</view>
					<view class="seats-wrap">
						<block v-for='(item,index) in  seat' :key='index'>
							<view class="warp">
								<!-- 不知道为什么直接传入seat,rowId值不对 -->
								<view :class="['seat',{bgImg:seat.seatStatus===1},{bgChcked:seat.seatStatus===3},{bgUnchecked:seat.seatStatus===2}]"
								 v-for="(seat,index) in item.seats" :key='index' @click="chooseSeat({row:seat.rowId,col:seat.columnId})"></view>
							</view>
						</block>
					</view>
					<view class="type-seat">
						<view v-for="(item,index) in type_seat" :key="index" style="display: flex;margin-left:10upx">
							<image style="height:40upx;width:40upx;" :src="item.legendIcon" mode=""></image>
							<view>{{item.legendName}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="smart-choose-wrapper" v-if="!choosedSeats.length">
			<view class="title">推荐座位</view>
			<view class="recommend-seat">
				<view v-for="(item,index) in chooseNum" :key="index" @click = 'choosePersonNum(item.num)'>{{item.num}}人</view>
			</view>
		</view>
		<view class="price-block" v-else>  
			<view class="title">已选座位</view>
			<view class="ticket-block">
				<view class="select-seats-item" v-for="(seat,index) in choosedSeats" :key='index' @click="cancelTicketSelected(seat)">
					<view>{{seat.row}}排{{seat.col}}座</view>
					<view>¥{{price}}</view>
				</view>
			</view>
		</view>
		<view class="submit-block" >
			<button v-if="choosedSeats.length" class="submit" @click="goBuyTicket">¥{{totalPrice}} 确认选座</button>
			 <button class='submit disabled' style="color:#fff" disabled="true" v-else>请选择座位</button>
		</view>
		
	</view>
</template>

<script>
	import {seat} from '../../utils/seat.js'
	
	export default {
		data() {
			return {
				seqNo: '',
				cinema: '',
				hall: '',
				movie: '',
				price: [],
				seat: [],
				type_seat:[],
				show: '',
				chooseNum: [{
						num: 1
					},
					{
						num: 2
					},
					{
						num: 3
					},
					{
						num: 4
					},
					{
						num: 5
					}
				],
				choosedSeats:[],
				price:'',
				totalPrice:'',
				info:''
			};
		},
		onLoad(params) {
			const info = JSON.parse(params.info) 
			this.seqNo = info.seqNo
			this.info = info
			this.type_seat = seat.image.seatLegends
			this.seat = JSON.parse(JSON.stringify(seat.regions[0].rows))
			this.recommendation = seat.recommendation.bestRecommendation
			this.price = info.price
		},
		onShow() {
			this.getSeatDetail()
		},
		methods: {
			chooseSeat(item) {
				let row = Number(item.row) - 1
				let col =  Number(item.col) - 1
				let seatValue = this.seat[row].seats[col]
				let newArray = this.seat;
				let status = seatValue.seatStatus
				// 价格座位逻辑
				let seatsArr = this.choosedSeats
				let temp = {}
				temp.row= row + 1
				temp.col = col + 1
				let num;
				// 如果是已购座位，直接返回
				if (status === 3) return
				// 如果是已选座位点击后变未选
				if (status === 2) {  
					this.cancelTicketSelected(temp)
				} else if (status === 1) {
					if(seatsArr.length >= 6) {
						this.showToast('不能购买大于6张票','none')
						return 
					}else{
						newArray[row].seats[col].seatStatus = 2
						seatsArr.push(temp)
					}
				}
				// 必须整体更新二维数组，Vue无法检测到数组某一项更新,必须slice复制一个数组才行
				this.seat = newArray.slice();
				num = seatsArr.length
				this.totalPrice = this.price*num
			},
			// 取消选座
			cancelTicketSelected(seat){
				let seatsArr = this.choosedSeats
				let newArray = this.seat
				newArray[seat.row - 1].seats[seat.col - 1].seatStatus = 1
				seatsArr.forEach((item,index)=>{
					if( item.col == seat.col && item.row == seat.row){
						seatsArr.splice(index,1)					
					}
				})
				this.choosedSeats =  seatsArr.slice()
				this.seat = newArray.slice();
				let num = seatsArr.length
				this.totalPrice = this.price*num
			},
			// 跳转到支付页面
			goBuyTicket(){
				this.info.totalPrice = this.totalPrice
				this.info.seats = this.choosedSeats
				const info = JSON.stringify(this.info)  
				uni.navigateTo({
						url: `/pages/buy-ticket/buy-ticket?paramsStr=${info}`,
					})
			},
			getSeatDetail() {
				const params = {
					cityId: 1,
					ci: 1,
					optimus_uuid: '956D57E0CF8211E993E871C8F83C394D2DDE030C56294F179D9993A6B9814CCE',
					optimus_platform: 3,
					optimus_risk_level: 71,
					optimus_code: 10,
					seqNo: this.seqNo
				}
				uni.showLoading({
					title: '正在加载...'
				})
				this.$request(`/ajax/seatingPlan?timestamp=${new Date().getTime()}`, params, 'POST').then(res => {
					uni.hideLoading()
					const data = res[1].data.seatData
					this.setBarTitle(data.cinema.cinemaName)
					this.movie = data.movie
					this.show = data.show
					this.hall = data.hall
					data.seat.image.seatLegends.forEach(item => {
						item.legendIcon = 'https' + item.legendIcon.split('http')[1]
					})

				})
			},
			showToast(title,img){
				uni.showToast({
					title:title,
					duration:1000,
					icon:img
				})
			},
			choosePersonNum(num){
				const recommend = this.recommendation
				let temp = {}
				let col;
				let row;
				let seats;
				switch (num) {
				    case 1:
				        seats = recommend.bestOne.seats
				        break;
				    case 2:
				        seats = recommend.bestTwo.seats
				        break;
				    case 3:
				        seats = recommend.bestThree.seats
				         break;
				    case 4:
				        seats = recommend.bestFour.seats
				         break;
				    case 5:
						seats = recommend.bestFive.seats
				}
				this.showToast('选座成功')
				for(let i =0 ;i<seats.length;i++){
					temp.row = seats[i].rowId
					temp.col = seats[i].columnId
					this.chooseSeat(temp)
				}
			},
			setBarTitle(title = '') {
				uni.setNavigationBarTitle({
					title: title
				});
			}
		},
	}
</script>

<style lang="scss">
	.select-page {
		font-size: 14px;
		color: #777;
	}

	.info-block {
		position: relative;

		.movie-info {
			padding: 40upx;
			display: flex;

			.flex {
				flex: 1;

				.title {
					width: 80vw;
					height: 70upx;
					line-height: 60upx;
					font-size: 40upx;
					font-weight: 700;
					color: #333;
				}

				.info {
					font-size: 24upx;
					padding-top: 5upx;
					line-height: 1;
				}
			}
		}
	}

	.select-block {
		background-color: #f2f1f6;
		margin-top: 20upx;
		height: 70vh;
		position: relative;

		.hall-name {
			display: inline-block;
			width: 400upx;
			height: 40upx;
			background: #e3e3e3;
			border-radius: 0 0 30px 30px;
			z-index: 99;
			text-align: center;
		}

		.row-nav {
			z-index: 2;
			width: 50upx;
			font-size: 14px;
			text-align: center;
			background-color: rgba(0, 0, 0, .05);
			pointer-events: none;

			view {
				height: 40upx;
				line-height: 40upx;
				padding-top: 10upx;
			}
		}

		.seats-block {
			width: 500upx;
			margin-left: 60upx;

			.seats-wrap {
				width: 380px;

				.warp {
					display: flex;
					
					.seat {
						padding: 0 15upx;
						height: 40upx;
						width: 40upx;
						box-sizing: border-box;
						margin-left: 10upx;
						margin-top: 10upx;
					}

					.bgImg {
						background-image: url('https://p1.meituan.net/movie/9dfff6fd525a7119d44e5734ab0e9fb41244.png');
						background-size: 100% 100%;
					}

					.bgChcked {
						background-image: url('https://p1.meituan.net/movie/bdb0531259ae1188b9398520f9692cbd1249.png');
						background-size: 100% 100%;
					}

					.bgUnchecked {
						background-image: url('https://p0.meituan.net/movie/585588bd86828ed54eed828dcb89bfdd1401.png');
						background-size: 100% 100%;
					}
				}
			}

			.type-seat {
				display: flex;
				justify-content: center;
				position: absolute;
				bottom: 30upx;
				width: 500upx;
			}
		}
	}

	.smart-choose-wrapper {
		display: flex;
		padding: 30upx;

		.title {
			line-height: 65upx;
		}

		.recommend-seat {
			display: flex;

			view {
				line-height: 65upx;
				border: 1px solid #d7d7d7;
				border-radius: 4upx;
				font-size: 22upx;
				margin-left: 14upx;
				text-align: center;
				box-sizing: border-box;
				width: 100upx;
				height: 60upx;
			}
		}
	}
	.price-block{
		padding:30upx;
		align-items:center;
		
		.ticket-block{
			display:flex;
			flex-wrap:wrap;
			.select-seats-item{
				text-align: center;
				margin-right: 16upx;
				margin-top: 10upx;
				font-size:18upx;
				padding:4upx 20upx;
				border: 1px solid #EF4238;
				width:120upx;
				box-sizing: border-box;
			}
		}
		
	}
	
	.submit-block{
		    padding: 20upx;
			.submit{
				    line-height: 80upx;
				    font-size: 30upx;
				    font-weight: 700;
				    text-align: center;
				    color: #fff;
				    border-radius: 10upx;
					background-color:#f90!important;
				}
			.disabled{
				background-color: #ffddb2!important;
			}
			}
</style>
