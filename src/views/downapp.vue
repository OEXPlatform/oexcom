<template>
	<div class="" style="font-family: PingFang SC;"  v-loading="loading">
		<!--手机适配-->
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
				geticodebyip: "",
				edition: "",
				loading: false
			}
		},
		created() {
			var b = window.navigator.userAgent.toLowerCase()
			if (b.indexOf('micromessenger') > -1) {
				this.mc = "display:block"
			} else {
				this.mc = "display:none"
			}
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
					_this.edition = res.data.data
				} else {
					alert(res.data.message)
				}
			}).catch(function(error) {
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
						axios.get('https://api.oexchain.com/api/bundipcode.oex?icode=' + geticodebyip, { // 还可以直接把参数拼接在url后边
						}).then(function(res) {}).catch(function(error) {});
						// console.log("有参数")
					} else {
						// console.log("无参数")
					}
				}
			},
			downios() {
				window.open("https://testflight.apple.com/join/TL6j6Jbn");
				var href = window.location.href
				if (href.split("=")[1]) {
					var geticodebyip = href.split("=")[1]
					axios.get('https://api.oexchain.com/api/bundipcode.oex?icode=' + geticodebyip, { // 还可以直接把参数拼接在url后边
					}).then(function(res) {
					}).catch(function(error) {
					});
					// console.log("有参数")
				} else {
					// console.log("无参数")
				}
			},
			changeLanguage() {
				this.$i18n.locale == 'en' ? this.$i18n.locale = 'zh' : this.$i18n.locale = 'en',
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
