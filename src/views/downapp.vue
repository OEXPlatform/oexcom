<template>
	<div  class="" style="font-family: PingFang SC;">
		<!--手机适配-->
		<div class="sm">
			<img src="../assets/img/iphone1.png" class="iphone1" v-if="Language=='zh'">
			<img src="../assets/img/iphone1en.png" class="iphone1" v-else>
			
			<img src="../assets/img/iphone5.png" class="iphone5"  v-if="Language=='zh'">
			<img src="../assets/img/iphone5en.png" class="iphone5" v-else>
			<img src="../assets/img/iphone6.png" class="iphone6" @click="down11"  v-if="Language=='zh'">
			<img src="../assets/img/iphone6en.png" class="iphone6" @click="down11" v-else>
			<!-- <div class="downbutton">
				<div class="ios" v-if="Language=='zh'" @click="downios">
					<img src="../assets/img/down5.png" class="downixon">
					<div class="downText">ios下载</div>
				</div>
				<div class="ios" v-else @click="downios">
					<img src="../assets/img/down5.png" class="downixon">
					<div class="downText">ios</div>
				</div>
			
				<div class="android" v-if="Language=='zh'" @click="down11">
					<img src="../assets/img/down6.png" class="downixon">
					<div class="downText" style="margin-left:15px">android下载</div>
				</div>
				<div class="android" v-else @click="down11">
					<img src="../assets/img/down6.png" class="downixon">
					<div class="downText" style="margin-left:15px">android</div>
				</div>
			</div> -->
			<img src="../assets/img/iphone2.png" class="iphone2" >
			<!-- <a href="https://www.btctool.cn/app-download/oexwallet.apk" class="iphone6"></a> -->
			
			
			<div class="mcstyle" :style="mc">
				<img src="../assets/img/iphone3en.png" class="iphone3" v-if="Language=='zh'">
				<img src="../assets/img/iphone3.png" class="iphone3" v-else>
				<img src="../assets/img/iphone4en.png" class="iphone4" v-if="Language=='zh'">
				<img src="../assets/img/iphone4.png" class="iphone4" v-else>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "wbsm",
		data() {
			return {
				mc:"",
				Language: "zh",
				clientHeight: '',
			}
		},
		created() {
			var b=window.navigator.userAgent.toLowerCase()
			console.log(b)
			// if(b=='micromessenger'){
			// if(b=='mozilla/5.0'){
				if (b.indexOf('micromessenger') > -1) {
				console.log(11)
				this.mc="display:block"
			}else{
				this.mc="display:none"
			}
		},
		components: {},
		mouted() {},
		methods: {	
			down11(){
				 window.open("https://www.btctool.cn/app-download/oexwallet.apk");
			},
			downios(){
				window.open("http://d.ayxfjc.com/oex");
			},
			changeLanguage() {
				this.$i18n.locale == 'en' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en',
					console.log(this.$i18n.locale)
				this.Language = this.$i18n.locale
				//设置中英文模式
				localStorage.setItem('languageSet', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
			},
			remind() {
				this.$toast(this.$t('user.loginUsername'))
			}
			
		}
	}
</script>
<style scoped>
	@import url('../../src/assets/styles/downapp.css');
</style>
