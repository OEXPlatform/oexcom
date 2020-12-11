<template>
	<div class="receiveRedEnvelope" style="font-family: PingFang SC;" v-show="receiveRedEnvelopeYM">
		<!--顶部-->
		<div class="receiveRedEnvelopetop" v-show="header">
			<div class="redtitle">OEX钱包</div>
			<a href="http://oexswap.com/index.html#/downapp" target="_blank" class="header-btn">下载APP</a>
		</div>
		<!--登陆页面-->
		<div class="landingPage" v-show="Page1==true">
			<div class="content">
				<div class="Headline">注册并登陆OEX账号</div>
				<div class="Subtitle">通过手机/邮箱登陆账号</div>
				<div class="phoneredEnvelopes">
					<div class="phoneinput">
						<input type="text" style="width: 80%;	position: absolute;right: 20px;height: 89%;background: transparent;border:none;outline:0;font-size: 26px;color:#fff;text-align: right;"
						 v-model="getNum" placeholder="输入手机/邮箱" @blur="information" />
					</div>
					<div style="display: flex;justify-content: space-between;">
						<div class="phoneyzm">
							<input type="number" style="width: 80%;	position: absolute;right: 20px;height: 89%;background: transparent;border:none;outline:0;font-size: 26px;color:#fff;text-align: right;"
							 v-model="getyzm" placeholder="输入验证码" @input="codeClick" />
						</div>
						<div class="yzmbtn" @click="send_vcode" v-if="sendVode" v-loading="loading" style="text-align: center">获取验证码</div>
						<div class="yzmbtn" v-else style="text-align: center;">{{vtext}}</div>
					</div>
					<div style="text-align: left;color:#ee3f4d;font-size: 25px;margin-top: 20px;text-align:left">*已有OEX账户，领取后前往app领取</div>
					<div @click="next" :class="isGreen==true? 'btnGreen':'btn'">
					</div>
				</div>
			</div>
		</div>
		<!--红包封面-->
		<div class="redCover" v-show="Page2==true">
			<div class="redCoverBG" v-if="redState==0" @click="grabRed">
				<div class="redCoverText">
					<div>{{sender}}</div>
					<div>{{remake}}</div>
				</div>
			</div>
			<div class="redCoverBGNO" v-else @click="closeRedCover">
				<div class="redCoverText">
					<div>{{sender}}</div>
					<div>{{remake}}</div>
				</div>
				<div class="ListDetails">查看红包详情</div>
			</div>
		</div>
		<!--红包列表-->
		<div class="redList" v-show="Page3==true">
			<div>
				<img src="../assets/img/openheader.png" style="position: fixed;box-shadow: 1px 3px 10px #fafafa;background: #fafafa;top:60px;z-index: 7;" />
				<div style="padding-top: 30vh;position: relative;overflow-x: hidden;background: #fafafa;">
					<div class="redListText">
						<p>{{sender}}</p>
						<p>{{remake}}</p>
						<p>{{amount}}<span>{{assetname}}</span> </p>
					</div>
					<div class="hx"></div>
					<div class="ALLlist">
						<div class="quantity">领取{{alllist.length}}/{{alllistLength}}个</div>
						<div class="flow" style="padding-bottom: 100px;">
							<div class="redListAll" v-for="(item,index) in alllist">
								<div class="modular">
									<img v-if="item.assetid==0" src="../assets/img/icon_detail.png" style="height: 75px;widht:75px;margin-top: 20px;margin-right: 10px;">
									<img v-else src="../assets/img/greylogo.png" style="height: 75px;widht:75px;margin-top: 20px;margin-right: 10px;">
									<div>
										<div v-if="item.receiveaccount='null'" class="redusername">{{item.rpkyc}}</div>
										<div v-else class="redusername">{{item.receiveaccount}}</div>
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
			<div style="font-size: 26px;color:#ee3f4d;text-align: center;position: fixed;bottom: 0;width: 100%;background: #fafafa;padding-bottom: 20px;z-index: 10;">*未领取的红包，将于24小时后发起退款至原账户</div>
		</div>
		<div v-loading="loadingALL" style="width: 100%;height:100vh;position: fixed;z-index: 100;background: rgb(0,0,0,0.6);" v-show="loadingALLxs"></div>
	</div>
</template>
<script>
	import axios from 'axios'
	export default {
		data() {
			return {
				// url: "http://47.95.192.213:8888",
				url: "https://api.oexchain.com",
				loading: false,
				loadingALL: true,
				loadingALLxs: true,
				header: true, //header
				Page1: false, //登陆页面
				Page2: false, //红包封面
				geticodebyipys: "",
				sender: "",
				remake: "",
				assetname: "",
				Page3: false, //红包列表
				status: "",
				amount: "",
				alllistLength: "",
				alllist: "",
				redState: 0, //红包状态
				geticodebyip: "", //红包ip
				redtype: "", //红包类型
				getNum: "", //手机号邮箱
				sendVode: true,
				vtext: '发送验证码',
				getyzm: "", //验证码
				me: "",
				isGreen: false,
				receiveRedEnvelopeYM:true
			}
		},
		created() {
			var _this = this
			if ((window.location.href).indexOf("?") != -1) {
				var a = ((window.location.href).split("?")[1]).split("&") //获取网页链接
				var arr = Array.from(a)
				for (var i = 0; i < arr.length; i++) {
					arr[i] = arr[i].split("=")[1]
				}
				_this.geticodebyip = arr[0]
				_this.geticodebyipys = arr[0]
				_this.redtype = arr[1]
			}
			/*--------------------------------微信显示 网页隐藏开始-----------------------------------------*/
			var b = window.navigator.userAgent.toLowerCase()
			if (b.indexOf('micromessenger') > -1) {
				_this.receiveRedEnvelopeYM = true
			} else {
				_this.receiveRedEnvelopeYM = false
				return;
			}
			
			/*--------------------------------------开始判断----------------------------------------------*/
			
			var mobileinfo = _this.getCookie("mobileflag");
			if (mobileinfo != "") { //有缓存
				_this.Page1 = false
				_this.getNum = mobileinfo.split(":")[0]
				_this.getyzm = mobileinfo.split(":")[1]
				_this.startAPI()

			} else {
				_this.Page1 = true
				_this.loadingALL = false
				_this.loadingALLxs=false
			}

		},
		methods: {
			startAPI() {
				var _this = this
				//判断用户有没有抢过红包
				axios.post(_this.url + '/api/redgift/getexists.oex?redid=' + _this.geticodebyip + '&pk=' + _this.getNum).then(
					function(res) { //用户有没有有抢过
						if (res.data.code == 200) {
							_this.loadingALL = false
							_this.loadingALLxs=false
							if (res.data.data == "noget") { //没有抢过红包
								//判断红包能不能抢
								axios.post(_this.url + '/api/redgift/getexists.oex?redid=' + _this.geticodebyip).then(function(res) {
									if (res.data.code == 200) {
										if (res.data.data != "timeout" && res.data.data != "none") { //红包没过期
											_this.redState = 0
											_this.Page2 = true
											_this.envelopeDetails()
										} else { //过期
											_this.Page2 = true
											_this.redState = 1
											_this.Page3 = true
											axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyipys, { //红包列表
											}).then(function(res) {
												if (res.data.code == 200) {
													_this.alllistLength = res.data.data.length
													var arr = res.data.data.filter(item => { //领取成功的
														return item.status == 3 || item.status == 2;
													})
													for (var i = 0; i < arr.length; i++) {
														arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
													}
													_this.alllist = arr
													axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip).then(function(
														res) { //红包信息
														if (res.data.code == 200) {
															_this.sender = res.data.data.sender
															_this.remake = res.data.data.remake
															_this.assetname = res.data.data.assetname
															_this.amount = res.data.data.amount
														} else {
															alert(res.data.message)
														}
													}).catch(function(error) {
														alert("网络异常")
													});
												} else {
													alert(res.data.message)
												}
											}).catch(function(error) {
												alert("网络异常")
											});
										}
									} else {
										alert(res.data.message)
									}
								}).catch(function(error) {
									alert("网络异常")
								});
							} else { //抢过的话
								_this.Page3 = true
								axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyipys, { //红包列表
								}).then(function(res) {
									if (res.data.code == 200) {
										_this.alllistLength = res.data.data.length
										var arr = res.data.data.filter(item => { //领取成功的
											return item.status == 3 || item.status == 2;
										})
										for (var i = 0; i < arr.length; i++) {
											arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
										}
										_this.alllist = arr
										var me = res.data.data.filter(item => { //领取成功的
											return item.rpk == _this.getNum;
										})
										_this.amount = me[0].amount
										_this.envelopeDetails()
									} else {
										alert(res.data.message)
									}
								}).catch(function(error) {
									alert("网络异常")
								});
							}
						} else {
							alert(res.data.message)
						}
					}).catch(function(error) {
					alert("网络异常")
				});
			},
			envelopeDetails() { //红包详情
				var _this = this
				axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip).then(function(
					res) { //红包信息
					if (res.data.code == 200) {
						_this.remake = res.data.data.remake
						_this.sender = res.data.data.sender
						_this.assetname = res.data.data.assetname
						// _this.amount=res.data.data.amount
						axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyipys, { //红包列表
						}).then(function(res) {
							if (res.data.code == 200) {
								_this.alllistLength = res.data.data.length
								var arr = res.data.data.filter(item => { //领取成功的
									return item.status == 3 || item.status == 2;
								})
								for (var i = 0; i < arr.length; i++) {
									arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
								}
								_this.alllist = arr
							} else {
								alert(res.data.message)
							}
						}).catch(function(error) {
							alert("网络异常")
						});

					} else {
						alert(res.data.message)
					}
				}).catch(function(error) {
					alert("网络异常")
				});
			},
			setCookie: function(cname, cvalue) { //存cookie
				var _this = this
				var d = new Date();
				d.setTime(d.getTime() + _this.getExpireTime());
				var expires = "expires=" + d.toUTCString();
				console.info(cname + "=" + cvalue + "; " + expires);
				document.cookie = cname + "=" + cvalue + "; " + expires;
				console.info(document.cookie);
			},
			getCookie: function(cname) { //获取cookie
				var name = cname + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1);
					if (c.indexOf(name) != -1) {
						return c.substring(name.length, c.length);
					}
				}
				return "";
			},
			getExpireTime: function getExpireTime() {
				var date = new Date();
				var hour = 23 - date.getHours();
				var min = 59 - date.getMinutes();
				var ms = (3600 * hour + 60 * min) * 1000;
				return ms;
			},
			hidingInformation(tel) { //隐藏信息
				var tel = tel;
				tel = "" + tel;
				var ary = tel.split("");
				ary.splice(3, 4, "****");
				var tel1 = ary.join("");
				return tel1
			},
			closeRedCover() { //点击关闭红包封面
				var _this = this
				_this.Page2 = false
			},
			information() { //用户信息input
				var _this = this
				_this.redtype = _this.typesInformation(_this.getNum)
			},
			typesInformation(information) { //判断邮箱还是手机号
				if (information.indexOf("@") != -1) {
					return 1
				} else {
					return 0
				}
			},
			codeClick() {
				var _this = this
				if (_this.getNum != "" && _this.getyzm != "") {
					_this.isGreen = true
				} else {
					_this.isGreen = false
				}
			},
			send_vcode() { //点击发送验证码
				var _this = this;
				if (!this.getNum) {
					alert('请输入手机/邮箱')
					return;
				}
				_this.loading = true
				axios.post(_this.url + '/api/ouser/getcode.oex?mobile=' + _this.getNum + "&rtype=" + _this.redtype +
						"&codetype=3")
					.then(function(res) {
						if (res.data.code == 200) {
							_this.loading = false
							_this.getTime();
							alert(res.data.message)
						} else {
							_this.loading = false
							alert(res.data.message)
						}
					}).catch(function(error) {
						_this.loading = false
					});
			},
			getTime() { //倒计时
				var _this = this;
				var num = 60;
				var timer = setInterval(function() {
					if (num <= 0) {
						clearInterval(timer);
						_this.vtext = "";
						_this.sendVode = true;
						return;
					}
					_this.vtext = ('重新发送' + num + 's');
					num--;
				}, 1000)
				_this.sendVode = !_this.sendVode;
			},
			next() { //只有用户无缓存的时候需要掉此步骤
				var _this = this
				if (_this.getNum == '') {
					alert("请输入手机/邮箱!")
					return;
				}

				if (!_this.getyzm) {
					alert('请输入验证码')
					return;
				}

				if (_this.getNum.indexOf("@") != -1) { //判断邮箱 或手机号

				} else {
					if (!(/^1[3456789]\d{9}$/.test(_this.getNum))) {
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
				_this.loadingALL = true
				_this.loadingALLxs=true
				axios.post(_this.url + '/api/ouser/valPk.oex?&mobile=' + _this.getNum + '&vcode=' + _this.getyzm).then(function(
					res) { //验证手机号邮箱是不是相符
					if (res.data.code == 200) {
						_this.loadingALL = false
						_this.loadingALLxs=false
						// alert("提交成功")
						_this.Page1 = false
						//判断用户是否抢过这个红包
						axios.post(_this.url + '/api/redgift/getexists.oex?redid=' + _this.geticodebyip + '&pk=' + _this.getNum).then(
							function(res) {
								if (res.data.code == 200) {
									if (res.data.data == "noget") { //没有抢过红包
										//判断红包能不能抢
										axios.post(_this.url + '/api/redgift/getexists.oex?redid=' + _this.geticodebyip).then(function(res) {
											if (res.data.code = 200) {
												if (res.data.data != "timeout" && res.data.data != "none") { //可以抢
													_this.redState = 0
													_this.Page2 = true
													_this.envelopeDetails()
												} else { //不可以抢
													//显示红包不可以抢封面  以及红包列表
													_this.redState = 1
													_this.Page2 = true
													_this.Page3 = true
													axios.post(_this.url + '/api/redgift/getRedGiftDetail?redid=' + _this.geticodebyip).then(function(
														res) { //红包信息
														if (res.data.code == 200) {
															_this.sender = res.data.data.sender
															_this.remake = res.data.data.remake
															_this.assetname = res.data.data.assetname
															_this.amount = res.data.data.amount
														} else {
															alert(res.data.message)
														}
													}).catch(function(error) {
														alert("网络异常")
													});
													//列表
													axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyipys, { //红包列表
													}).then(function(res) {
														if (res.data.code == 200) {
															_this.alllistLength = res.data.data.length
															var arr = res.data.data.filter(item => { //领取成功的
																return item.status == 3 || item.status == 2;
															})
															for (var i = 0; i < arr.length; i++) {
																arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
															}
															_this.alllist = arr
														} else {
															alert(res.data.message)
														}
													}).catch(function(error) {
														alert("网络异常")
													});
												}
											} else {
												alert(res.data.message)
											}
										}).catch(function(error) {
											alert("网络异常")
										});
									} else { //有抢过这个红包
										//直接显示列表
										_this.Page3 = true
										var getNum = _this.getNum
										var getyzm = _this.getyzm

										axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyipys, { //红包列表
										}).then(function(res) {
											if (res.data.code == 200) {
												_this.alllistLength = res.data.data.length
												var arr = res.data.data.filter(item => { //领取成功的
													return item.status == 3 || item.status == 2;
												})
												for (var i = 0; i < arr.length; i++) {
													arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
												}
												var me = res.data.data.filter(item => { //领取成功的
													return item.rpk == _this.getNum;
												})
												_this.amount = me[0].amount
												_this.alllist = arr
												_this.envelopeDetails()
											} else {
												alert(res.data.message)
											}
										}).catch(function(error) {});
									}
								} else {
									alert(res.data.message)
								}
							}).catch(function(error) {
							alert("网络异常")
						});
					} else {
						_this.loadingALL = false
						_this.loadingALLxs=false
						alert(res.data.message)
					}
				}).catch(function(error) {
					alert("网络异常")
					_this.loadingALL = false
					_this.loadingALLxs=false
				});
			},
			grabRed() { //抢红包
				var _this = this
				axios.post(_this.url + '/api/redgift/rob.oex?redid=' + _this.geticodebyip + '&pk=' + _this.getNum + '&vcode=' +
					_this.getyzm).then(function(res) {
					if (res.data.code == 200) {
						_this.amount = res.data.data.amount
						_this.Page2 = false
						_this.Page3 = true
						axios.post(_this.url + '/api/redgift/getAlreadyList.oex?redid=' + _this.geticodebyip).then(function(res) { //红包列表
							if (res.data.code == 200) {
								_this.alllistLength = res.data.data.length
								var arr = res.data.data.filter(item => { //领取成功的
									return item.status == 3 || item.status == 2;
								})
								for (var i = 0; i < arr.length; i++) {
									arr[i].rpkyc = _this.hidingInformation(arr[i].rpk)
								}
								_this.alllist = arr
								//将当前领取红包的手机号放入缓存 方便下次使用 只有为空的是否才能放
								var mobileinfo = _this.getCookie("mobileflag");
								if (mobileinfo == "") {
									var info = _this.getNum + ":" + _this.getyzm;
									_this.setCookie("mobileflag", info);
								}
								//全部操作完成
								localStorage.setItem(_this.geticodebyip, "1")
								localStorage.setItem(_this.geticodebyip + "pk", _this.getNum)
							} else {
								alert(res.data.message)
							}
						}).catch(function(error) {
							alert("网络异常")
						})
					} else {
						alert(res.data.message)
					}
				}).catch(function(error) {
					alert("网络异常")
				})
			},
		},

	}
</script>

<style scoped>
	@import url('../../src/assets/styles/receiveRedEnvelope.css');
	@import url('../../src/assets/styles/phone.css');
</style>
