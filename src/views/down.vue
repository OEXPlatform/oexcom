<template>
	<div class="down" style="font-family: PingFang SC;width: 100%;">
		<div class="bightml" v-if="sm==true">
			<div class="downheader">
				<div class="downcenter">
					<img src="../../src/assets/img/logo.png" class="logo">
					<div class="right">
						<router-link to="/" class="whitebook active">{{$t('home.toHOME')}}</router-link>
						<a href="img/OEX1.0.pdf" target="_blank" class="whitebook" v-if="Language=='zh'">{{$t('home.toWHITEPAPER')}}</a>
						<a href="img/OEXEN1.0.pdf" target="_blank" class="whitebook" v-else>{{$t('home.toWHITEPAPER')}}</a>
						<a href="https://oexchain.com/" class="whitebook" target="_blank">{{$t('home.toOEXCHAIN')}}</a>
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
						<div style="height:auto;position: relative;" @mouseover="mouseOver" @mouseleave="mouseLeave">
							<div style=" display: inline;">
								<img src="../assets/img/down5.png" style="margin-top:10px" />
							</div>
							<div style=" display: inline;">
								<span class="span1">{{$t('ios')}}</span>
							</div>
							<div class="ewm" :style="active">
							</div>
						</div>
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
			<div class="coypRight" style="width: 104%;min-width: 1500px">
				<span>© 2019 Theme designed by oex.com</span>
				<span class="line">|</span>
				<span>冀ICP备2020025490号</span>
				<span class="line">|</span>
				<span>oexfund@gmail.com</span>
			</div>
		</div>
		<div class="smhtml" v-else  v-loading="loading">
			<div class="sm">
				<img src="../assets/img/iphone1.png" class="iphone1" v-if="Language=='zh'">
				<img src="../assets/img/iphone1en.png" class="iphone1" v-else>
				<div class="code" v-if="geticodebyip">邀请码：{{geticodebyip}}</div>
				<div class="downbutton">
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
				</div>
				<img src="../assets/img/iphone2.png" class="iphone2">
				<div class="mcstyle" :style="mc">
					<div class="mckuangtext" v-if="Language=='zh'">
						<div>在浏览器中打开后</div>
						<div>点击页面的Android、IOS</div>
						<div>下载即可</div>
					</div>
					<div class="mckuangtext" v-else>
						<div style="font-size: 50px;">Open it in the browser and</div>
						<div style="font-size: 50px;">click Android、IOS on the page to </div>
						<div style="font-size: 50px;">download it.</div>
					</div>
					<img src="../assets/img/iphone4en.png" class="iphone4" v-if="Language=='zh'">
					<img src="../assets/img/iphone4.png" class="iphone4" v-else>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {

		name: "wbsm",
		data() {
			return {
				mc: "",
				Language: "zh",
				clientHeight: '',
				active2: "display:none",
				active: "display:none",
				sm: true,
				mc: "",
				geticodebyip: "",
				edition: "",
				loading: false
			}
		},
		created() {
			var _this = this
			var b = window.navigator.userAgent.toLowerCase()
			var bIsAndroid = b.match(/android/i) == "android"
			var bIsIpad = b.match(/ipad/i) == "ipad";
			var bIsIphoneOs = b.match(/iphone os/i) == "iphone os";
			if (b.indexOf('micromessenger') > -1) {
				this.mc = "display:block"
			} else {
				this.mc = "display:none"
			}
			if (bIsAndroid || bIsIphoneOs || bIsIpad) {
				_this.sm = false
			} else {}
			//获取url尾部参数
			var _this = this
			var href = window.location.href
			if (href.split("=")[1]) {
				var geticodebyip = href.split("=")[1]
				_this.geticodebyip = geticodebyip
				// console.log("有参数") 
			} else {
				// console.log("无参数")
			}
			axios.get('https://api.oexchain.com/api/rpc/getlastversion').then(function(res) {
				if (res.data.code == 200) {
					console.log(res.data.data)
					_this.edition = res.data.data
				} else {
					alert(res.data.message)
				}
			}).catch(function(error) {
				console.log(error);
			});
		},
		components: {},
		mouted() {},
		methods: {
			down11() {
				var _this = this
				_this.loading=true
				if (_this.edition) {
					_this.loading=false
					window.open("https://app.oexswap.com/app-download/oexwallet" + _this.edition + ".apk");
					var href = window.location.href
					if (href.split("=")[1]) {
						var geticodebyip = href.split("=")[1]
						axios.get('https://api.oexchain.com/api/bundipcode.oex?icode=' + geticodebyip, { 
						}).then(function(res) {
						}).catch(function(error) {
						});
						// console.log("有参数")
					} else {
						// console.log("无参数")
					}
				}
			},
			downios() {
				var href = window.location.href
				if (href.split("=")[1]) {
					var geticodebyip = href.split("=")[1]
					axios.get('https://api.oexchain.com/api/bundipcode.oex?icode=' + geticodebyip, { 
					}).then(function(res) {
					}).catch(function(error) {
					});
					// console.log("有参数")
				} else {
					// console.log("无参数")
				}
				window.open("https://testflight.apple.com/join/TL6j6Jbn");
			},
			changeLanguage() {
				this.$i18n.locale == 'en' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en',
					console.log(this.$i18n.locale)
				this.Language = this.$i18n.locale
				//设置中英文模式
				localStorage.setItem('languageSet', this.$i18n.locale)
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
