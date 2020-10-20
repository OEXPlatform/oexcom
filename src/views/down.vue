<template>
	<div class="down" style="font-family: PingFang SC;width: 100%;">
		<div class="bightml" v-if="sm==true">
			<div class="downheader" >
				<div class="downcenter" >
					<img src="../../src/assets/img/logo.png" class="logo">
					<div class="right">
						<router-link to="/" class="whitebook active">{{$t('home.toHOME')}}</router-link>
						<a href="img/OEX1.0.pdf" target="_blank" class="whitebook" v-if="Language=='zh'">{{$t('home.toWHITEPAPER')}}</a>
						<a href="img/OEXEN1.0.pdf" target="_blank" class="whitebook" v-else>{{$t('home.toWHITEPAPER')}}</a>
						<a href="https://oexchain.com" class="whitebook" target="_blank">{{$t('home.toOEXCHAIN')}}</a>
						<a href="https://uniswap.oexchain.com/#/swap" class="whitebook" target="_blank">{{$t('OEXSWAP')}}</a>
						<a href="https://oexservice.zendesk.com/hc/zh-hk" class="whitebook" target="_blank">{{$t('Announcement')}}</a>
						<router-link to="/down" class="download"><img src="../../src/assets/img/appdownload.png" v-if="Language=='zh'" />
							<img src="../../src/assets/img/appdownloaden.png" v-else style="width:131px;" /></router-link>
						<div class="lanuage">
							<img src="../../src/assets/img/en.png" v-if="Language=='zh'" @click="changeLanguage()" />
							<img src="../../src/assets/img/zh.png" v-else @click="changeLanguage()" />
						</div>
					</div>
				</div>
			</div>
			<div class="part_two1">
				<div class="part_tow_center1">
					<div class="img1">
						<img src="../assets/img/down1.png" v-if="Language=='zh'">
						<img src="../assets/img/down1en.png" v-else>
					</div>
					<div class="img2"></div>
					<div class="img3"></div>
					<div class="img4"></div>
					<div class="img5">
						<a href="" target="_blank">
						<div style="height:auto;position: relative;" @mouseover="mouseOver" @mouseleave="mouseLeave">
							<div style=" display: inline;">
								<img src="../assets/img/down5.png" style="margin-top:10px" />
							</div>
							<div style=" display: inline;">
								<span class="span1">{{$t('ios')}}</span>
							</div>
							<!-- <div class="ewm" :style="active">
							</div> -->
						</div>
						</a>
					</div>
					<div class="img6">
						<div style="height:auto;position: relative;" @mouseover="mouseOver2" @mouseleave="mouseLeave2">
							<div style=" display: inline;">
								<img src="../assets/img/down6.png" style="margin-top:10px" />
							</div>
							<div style=" display: inline;">
								<span class="span2">{{$t('andr')}}</span>
							</div>
							<div class="ewm" :style="active2">
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="footer" style="width: 104%;min-width: 1500px;">
				<div class="footer_center">
					<div class="center_left footer_left">
						<img src="../../src/assets/img/footer_left.png" />
					</div>
					<div class="footer_right">
						<div class="right_top">
							<a href="http://t.me/oexfund" target="_blank"><img src="../../src/assets/img/f_r_1.png" /></a>
							<a href="http://t.me/oexfunder" target="_blank"><img src="../../src/assets/img/f_r_2.png" /></a>
							<a href="https://www.facebook.com/fund.oex.7" target="_blank"><img src="../../src/assets/img/f_r_3.png" /></a>
							<a href="https://twitter.com/Oex_team" target="_blank"><img src="../../src/assets/img/f_r_4.png" /></a>
						</div>
					</div>
				</div>
			</div>

			<div class="coypRight"  style="width: 104%;min-width: 1500px">
				<span>© 2019 Theme designed by oex.com</span>
				<span class="line">|</span>
				<span>冀ICP备2020025490号</span>
				<span class="line">|</span>
				<span>oexfund@gmail.com</span>
			</div>
		</div>
		<div class="smhtml"  v-else>
			<div class="sm">
				<img src="../assets/img/iphone1.png" class="iphone1" v-if="Language=='zh'">
				<img src="../assets/img/iphone1en.png" class="iphone1" v-else>
				
				<img src="../assets/img/iphone5.png" class="iphone5"    v-if="Language=='zh'">
				<img src="../assets/img/iphone5en.png" class="iphone5"  v-else >
				<img src="../assets/img/iphone6.png" class="iphone6" @click="down11"  v-if="Language=='zh'">
				<img src="../assets/img/iphone6en.png" class="iphone6" @click="down11" v-else>
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
				active2:"display:none",
				active:"display:none",
				sm:true,
				mc:"",
			}
		},
		created() {
			var _this=this
			var b=window.navigator.userAgent.toLowerCase()
			var bIsAndroid = b.match(/android/i) == "android"
			// var iphone=b.match(/iPhone/i) == "iPhone"
			// var iPad=b.match(/iPad/i) == "iPad"
		
			var bIsIpad = b.match(/ipad/i) == "ipad";
			 var bIsIphoneOs = b.match(/iphone os/i) == "iphone os";
			
			
			if (b.indexOf('micromessenger') > -1) {
				console.log(11)
				this.mc="display:block"
			}else{
				this.mc="display:none"
			}
			if (bIsAndroid ||bIsIphoneOs||bIsIpad) {
			        _this.sm=false
					
			                 }
			            else {
			 console.log(2222)
			 
						}
		},
		components: {},
		mouted() {},
		methods: {	
			down11(){
				 window.open("https://www.btctool.cn/app-download/oexwallet.apk");
			},
			// down22(){
			// 	 window.open("https://www.btctool.cn/app-download/");
			// },
			changeLanguage() {
				this.$i18n.locale == 'en' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en',
					console.log(this.$i18n.locale)
				this.Language = this.$i18n.locale
				//设置中英文模式
				localStorage.setItem('languageSet', this.$i18n.locale) //将用户设置存储到localStorage以便用户下次打开时使用此设置
			},
			remind() {
				this.$toast(this.$t('user.loginUsername'))
			},
			// 移入
			mouseOver() {
				this.active = "display:block";
			},
			// 移出
			mouseLeave() {
				this.active = "display:none";
			},
			// 移入
			mouseOver2() {
				this.active2 = "display:block";
			},
			// 移出
			mouseLeave2() {
				this.active2 = "display:none";
			}
		}
	}
</script>

<style scoped>
	@import url('../../src/assets/styles/down.css');
	@import url('../../src/assets/styles/downapp.css');
</style>
