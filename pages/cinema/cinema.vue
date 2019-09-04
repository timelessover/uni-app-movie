<template>
	<view>
		{{title}}
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '影院'
				
			};
		},
		onLoad(){
			uni.getLocation({
				success(e) {
					console.log(e)
				}
			})
		}
	}
</script>

<style lang="scss">

</style>
