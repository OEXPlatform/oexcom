<template>
	<div :style="allpage">
		<div :style="one">
			<div class="resAllopen">
				<header v-if="sm==false">
					<div class="title">OEX钱包</div>
					<a href="" class="header-btn">在 App 内打开</a>
				</header>
				<div class="redbg"></div>
				<div class="openname">{{name}}</div>
				<div class="openremake">{{remaketext}}</div>
				<div class="allamount">
					<span class="amountnum">{{amountnum}}</span>
					<span class="assetname">{{assetname}}</span>
				</div>
				<div class="hx"></div>
				<div class="redlist">
					<div class="redtext" v-if="status">领取{{status}}/{{alllist.length}}个</div>
					<div class="redtext" v-else>领取{{status}}/{{alllist.length}}个</div>
					<div class="redkuang">
						<div class="redListAll" v-for="(item,index) in redlist">
							<div class="modular">
								<img src="../assets/img/redlogo.png" />
								<div>
									<div v-if="item.receiveaccount='null'" class="redusername" style="margin-top:5px">{{item.rpk}}</div>
									<div v-else class="redusername" style="margin-top:5px">{{item.receiveaccount}}</div>
									<div v-if="item.status==2" class="redusername" style="color:rgba(20, 20, 38, 0.5);font-size:26px">未领取</div>
									<div v-else class="redusername" style="color:rgba(20, 20, 38, 0.5);font-size:26px">已领取</div>
								</div>
							</div>
							<div class="reduseramount"> <span style="font-size: 34px;font-weight: 600 ;">{{item.amount}}</span>
								{{item.assetname}}</div>
						</div>

					</div>
				</div>
			</div>
		</div>
		<div class="phone" style="font-family: PingFang SC;width: 100%;" :style="mc">
			<div class="resAllphone" tyle="font-family: PingFang SC;width: 100%;max-width:850px;z-index:9999" :style="mc1">
				<!--抢红包-->
				<header v-if="sm==false">
					<div class="title">OEX钱包</div>
					<a href="" class="header-btn">在 App 内打开</a>
				</header>
				<div class="redEnvelopes" @click="openhongbaoclick">
					<div class="red-content">
						<div>{{name}}</div>
						<div style="margin-top: 180px;">{{remaketext}}</div>
					</div>
				</div>
			</div>
			<div class="resAllphone" tyle="font-family: PingFang SC;width: 100%;max-width:850px;z-index:9999" :style="mcclose">
				<!--抢红包-->
				<header v-if="sm==false">
					<div class="title">OEX钱包</div>
					<a href="" class="header-btn">在 App 内打开</a>
				</header>
				<div class="phoneredEnvelopeskuang" @click="openhongbaoclick">
					<div class="red-content">
						<div>{{name}}</div>
						<div>{{redtext}}</div>
						<div style="margin-top: 180px;" v-if="timeout">超过24小时未领取</div>
					</div>
				</div>
			</div>
			<header v-if="sm==false">
				<div class="title">OEX钱包</div>
				<a href="" class="header-btn">在 App 内打开</a>
			</header>
			<div class="greenbg">
				<div class="greenbgtext">
					<div class="title1">登陆OEX账号</div>
					<div class="title2">通过手机号登陆账号</div>
					<div class="phoneredEnvelopes">
						<div class="phoneinput">
							<input type="text" style="width: 80%;	position: absolute;right: 20px;height: 89%;background: transparent;border:none;outline:0;font-size: 26px;color:#fff;text-align: right;"
							 v-model="getNum" placeholder="输入手机/邮箱" @blur="input1" />
						</div>
						<div style="display: flex;justify-content: space-between;">
							<div class="phoneyzm">
								<input type="number" style="width: 80%;	position: absolute;right: 20px;height: 89%;background: transparent;border:none;outline:0;font-size: 26px;color:#fff;text-align: right;"
								 v-model="getyzm" placeholder="输入验证码" @input="yzm" />
							</div>
							<div class="yzmbtn" @click="send_vcode" v-if="sendVode" v-loading="loading">获取验证码</div>
							<div class="yzmbtn" v-else>{{vtext}}</div>
						</div>
						<div @click="next" class="btn">
	<!-- 								<router-link to="/redsEnvelopes?code=YoM0Pf0EwGfO6AZDciCTFA==&redtype=2&mobile=15910223706&vcode=1234" style="z-index: 999;" v-if="navred=='111'" @click="routerLink">
								<div class="btn">11</div>
							</router-link -->>
						</div>

					</div>
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
				Language: "zh",
				sm: true,
				name: "",
				beOverdue: false,
				getNum: "",
				nav: "",
				mc: "display:none",
				vtext: '发送验证码',
				sendVode: true,
				input: "",
				getyzm: "",
				rtype: "",
				redtype: "",
				navred: "",
				openhongbao: "display:block",
				remaketext: "",
				amountnum: "",
				assetname: "",
				mc1: "display:none",
				mcclose: "display:none",
				getNumhc: "",
				one: "display:none",
				allpage: "display:none",
				redlist: [],
				status: "0",
				alllist: [],
				redtext: "",
				timeout: "",
				url: "http://192.168.1.19:80",
				// url:"http://api.oexchain.com"
				loading: false
			}
		},
		created() {
			var _this = this
			//获取url尾部参数开始
			var href = window.location.href
			if (href.split("=")[1]) {
				var geticodebyip = href.split("=")[1]
				var href1 = geticodebyip.split("&")[0] //红包类型 1是拼手气 2是普通红包 href3
				var href2 = href.split("&")[1]
				var href3 = href2.split("=")[1]
				_this.geticodebyip = href1
				_this.redtype = href3
			} else {}
			//获取url尾部参数结束
			//微信显示 网页隐藏开始
			var b = window.navigator.userAgent.toLowerCase()
			var bIsAndroid = b.match(/android/i) == "android"
			var bIsIpad = b.match(/ipad/i) == "ipad";
			var bIsIphoneOs = b.match(/iphone os/i) == "iphone os";
			if (b.indexOf('micromessenger') > -1) {
				_this.allpage = "display:block"
			} else {
				_this.allpage = "display:block"
				// return
			}
			//微信显示 网页隐藏结束
			//判断geticodebyip和是否和缓存相同开始
			if (localStorage.getItem(_this.geticodebyip) != "1") { //无缓存
				_this.one = "display:none" //详情隐藏
				_this.mc = "display:block" //领取红包显示
				axios.post(_this.url + '/api/redgift/getexists.oex?redid=' + _this.geticodebyip, { // 判断红包状态
				}).then(function(res) {
					if (res.data.data != "timeout" && res.data.data != "none") { //可以领取
						_this.mc1 = "display:block" //红包可领取图片显示
						_this.mcclose = "display:none" //红包不可领取图片隐藏
					} else {

						//改变红包上的字显示
						if (res.data.data == "timeout") {
							_this.redtext = "该红包已失效"
							_this.timeout = true
						} else if (res.data.data == "none") {
							_this.redtext = "该红包已全部领取"
						}		
						_this.one = "display:block" //红包列表
						_this.mc = "display:none" //登陆页
						axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyip, { //查看当前红包的详情
						}).then(function(res) {
							if (res.data.code == 200) { //筛选
								var arr1 = res.data.data
								let arr2 = arr1.filter(item => { //抢成功了但是没有领取的
									return item.status == 2;
								})
								let arr3 = arr1.filter(item => { //领取成功的
									return item.status == 3;
								})
								var arr4 = arr2.concat(arr3)
								var rpk = localStorage.getItem(_this.geticodebyip + "pk")
								let me = arr1.filter(item => {
									return item.rpk == rpk;
								})
								_this.amountnum = ""
								_this.assetname = ""
								// }
								_this.status = arr2.length
								_this.redlist = arr4
								_this.alllist = res.data.data
							}
						}).catch(function(error) {
							// console.log(error);
						});
						axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip + "&pk=" + _this.emailPhone, { //获取用户信息
						}).then(function(res) {
							_this.name = res.data.data.sender
							_this.remaketext = res.data.data.remake
							// _this.amountnum=res.data.data.amount
							// _this.assetname=res.data.data.assetname
						}).catch(function(error) {
							console.log(error);
						});

					}
				}).catch(function(error) {
					console.log(error);
				});
				axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip, { //获取红包信息接口
				}).then(function(res) {
					console.log(res)
					_this.name = res.data.data.sender
					_this.remaketext = res.data.data.remake
					_this.amountnum = res.data.data.amount
					_this.assetname = res.data.data.assetname
				}).catch(function(error) {
					console.log(error);
				});
			} else { //有缓存
				_this.one = "display:block" //红包列表
				_this.mc = "display:none" //登陆页
				axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyip, { //查看当前红包的详情
				}).then(function(res) {
					if (res.data.code == 200) { //筛选
						var arr1 = res.data.data
						let arr2 = arr1.filter(item => { //抢成功了但是没有领取的
							return item.status == 2;
						})
						let arr3 = arr1.filter(item => { //领取成功的
							return item.status == 3;
						})
						var arr4 = arr2.concat(arr3)
						var rpk = localStorage.getItem(_this.geticodebyip + "pk")
						let me = arr1.filter(item => {
							return item.rpk == rpk;
						})
						if (me.length > 0) {
							_this.amountnum = me[0].amount
							_this.assetname = me[0].assetname
						}
						_this.status = arr2.length
						_this.redlist = arr4
						_this.alllist = res.data.data
					}
				}).catch(function(error) {
					console.log(error);
				});
				axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip + "&pk=" + _this.emailPhone, { //获取用户信息
				}).then(function(res) {
					_this.name = res.data.data.sender
					_this.remaketext = res.data.data.remake
					// _this.amountnum=res.data.data.amount
					// _this.assetname=res.data.data.assetname
				}).catch(function(error) {
					console.log(error);
				});
			}
		},
		methods: {
			openhongbaoclick() {
				var _this = this
				_this.mc1 = "display:none"
				_this.mcclose = "display:none"
			},
			input1() {
				var _this = this
				console.log(_this.getNum)
				if (_this.getNum.indexOf("@") != -1) {
					_this.rtype = 1
				} else {
					_this.rtype = 0
				}
			},
			yzm() {
				var v = this

			},
			next() {
				var v = this
				console.log(111)
				if (v.getNum == '') {
					alert("请输入手机/邮箱!")
					return;
				}

				if (!v.getyzm) {
					alert('请输入验证码')
					return;
				}

				//判断邮箱 或手机号
				if (v.getNum.indexOf("@") != -1) {} else {
					if (!(/^1[3456789]\d{9}$/.test(v.getNum))) {
						alert("手机号有误!")
						return;
					}
					var numb = this.getNum
					var numb2 = numb.substring(0, 3)
					if (numb2 == "165" || numb2 == "171" || numb2 == "170" || numb2 == "199" || numb2 == "147") {
						alert("手机号有误!")
						return;
					}
				}
					alert(1234)
				//验证手机或者邮箱是否和验证码相符
				axios.post(v.url + '/api/ouser/valPk.oex?&mobile=' + v.getNum + '&vcode=' + v.getyzm, { // 还可以直接把参数拼接在url后边
				}).then(function(res) {
					console.log(res)
					if (res.data.code == 200) {
						// //判断是否过期
						v.beOverdue = true
						v.name = res.data.data.sender
					const par = {
						pk: v.getNum,
						redid: v.geticodebyip,
						code: v.getyzm,
						redtype: v.redtype
					};
					 v.$router.push({
					    path:'/redsEnvelopes',
					    query: par
					 })
					} else {
						alert(res.data.message)
					}
				}).catch(function(error) {
					v.nav = window.location.href
					
					console.log(window.location.href)
					console.log(error);
				});
			},
			// next2() {
			// 	var v = this
			// 	if (v.getNum == '') {
			// 		alert("请输入手机/邮箱!")
			// 		return;
			// 	}

			// 	if (!v.getyzm) {
			// 		alert('请输入验证码')
			// 		return;
			// 	}

			// 	//判断邮箱 或手机号
			// 	if (v.getNum.indexOf("@") != -1) {} else {
			// 		if (!(/^1[3456789]\d{9}$/.test(v.getNum))) {
			// 			alert("手机号有误!")
			// 			return;
			// 		}
			// 		var numb = this.getNum
			// 		var numb2 = numb.substring(0, 3)
			// 		if (numb2 == "165" || numb2 == "171" || numb2 == "170" || numb2 == "199" || numb2 == "147") {
			// 			alert("手机号有误!")
			// 			return;
			// 		}
			// 	}
			// 	v.navred = "111"
			// 	//验证手机或者邮箱是否和验证码相符
			// 	axios.post(v.url + '/api/ouser/valPk.oex?&mobile=' + v.getNum + '&vcode=' + v.getyzm, { // 还可以直接把参数拼接在url后边
			// 	}).then(function(res) {
			// 		if (res.data.code == 200) {
			// 			v.nav = "/redsEnvelopes?pk=" + v.getNum + '&redid=' + v.geticodebyip + '&code=' + v.getyzm + '&redtype=' + v.redtype
			// 			console.log(v.nav)
			// 			// //判断是否过期
			// 			v.beOverdue = true
			// 			v.name = res.data.data.sender

			// 		} else {
			// 			// alert(res.data)
			// 			alert(res.data.message)
			// 			v.nav = window.location.href
			// 			console.log(window.location.href)
			// 		}
			// 	}).catch(function(error) {
			// 		console.log(error);
			// 		v.nav = window.location.href
			// 	});

			// },
			send_vcode() {
				//发送验证码
				const _this = this;
				if (!this.getNum) {
					alert('请输入手机/邮箱')
					return;
				}
				_this.loading = true
				console.log(_this.rtype)
				axios.post(_this.url + '/api/ouser/getcode.oex?mobile=' + _this.getNum + "&rtype=" + _this.rtype + "&codetype=3", { // 还可以直接把参数拼接在url后边
				}).then(function(res) {
					if (res.data.code == 200) {
						_this.loading = false
						alert(res.data.message)
						_this.getTime();
					} else {
						_this.loading = false
						alert(res.data.message)

					}
				}).catch(function(error) {
					console.log(error);
					_this.loading = false
				});
			},
			getTime() {
				//倒计时
				var _this = this;
				var num = 60;
				var timer = setInterval(function() {
					if (num <= 0) {
						clearInterval(timer);
						_this.vtext = "";
						_this.sendVode = true;
						return;
					}

					_this.vtext = (_this._i18n.locale == 'zh_CN' ? '重新发送' + num + 's' : 'Resend' + num + 's');

					num--;
				}, 1000)
				_this.sendVode = !_this.sendVode;
			},
			routerLink() {
				var _this = this

			}
		}
	}
</script>

<style scoped>
	@import url('../../src/assets/styles/phone.css');
</style>
