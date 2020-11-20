<template>
	<div class="red" style="max-width: 850px;">
		<div class="resAll" tyle="font-family: PingFang SC;width: 100%;max-width:850px;z-index:9999" :style="mc">
			<!--抢红包-->
			<header v-if="sm==false">
				<div class="title">OEX钱包</div>
				<a href="" class="header-btn">在 App 内打开</a>
			</header>
			<div class="redEnvelopes" @click="openhongbao">
				<div class="red-content">
					<div>{{name}}</div>
					<div style="margin-top: 180px;">{{remaketext}}</div>
				</div>
			</div>
		</div>
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
				// beOverdue: false,
				mc: "display:block",
				remaketext: "",
				openredstyle: "display:block",
				href2: "",
				href4: "",
				amountnum: "",
				assetname: "",
				receiveaccount: "",
				redlist: [],
				status: "0",
				alllist: "",
				datalist: "",
				aaaa: sessionStorage.getItem("datalist"),
				remaketexthc: "",
				namehc: "",
				amountnumhc: "",
				assetnamehc: ""
			}
		},
		created() {
			var _this = this
			var b = window.navigator.userAgent.toLowerCase()
			if (b.indexOf('micromessenger') > -1) {
				this.mc = "display:block"
			} else {
				this.mc = "display:block"
				// return;
			}
			//获取url尾部参数
			var href = window.location.href
			var hrefALL = href.split("=")
			var data = {
				emailPhone: hrefALL[1].split("&")[0],
				geticodebyip: hrefALL[2].split("&")[0],
				vcode: hrefALL[3].split("&")[0],
				retype: hrefALL[4].split("&")[0]
			}
			_this.datalist = data
			//检查是否过期
			axios.post('http://api.oexchain.com/api/redgift/getexists.oex?redid=' + _this.datalist.geticodebyip + '&pk=' + _this.datalist
				.emailPhone, { // 还可以直接把参数拼接在url后边
				}).then(function(res) {
				if (res.data.data = "object") {
					console.log("可以领取  页面不一样")
				} else {
					console.log("不可以领取  页面不一样")
					_this.sm = true
				}
			}).catch(function(error) {
				console.log(error);
			});

			//缓存信息
			var str = JSON.stringify(data)
			sessionStorage.setItem('datalist', str);
			if (_this.datalist) {
				var thisobjarr = sessionStorage.getItem("datalist")
				_this.datalist = JSON.parse(thisobjarr)
			}
			if (_this.datalist.emailPhone && _this.datalist.geticodebyip && _this.datalist.vcode && _this.datalist.retype) {
				//检查当前红包还有没有未领取的 是否已经过期 当前用户是否已经领取过 
				axios.post('http://api.oexchain.com/api/redgift/getexists.oex?redid=' + _this.datalist.geticodebyip + '&pk=' + _this
					.datalist.emailPhone, { // 还可以直接把参数拼接在url后边
					}).then(function(res) {
					console.log(res)
					if (res.data.data == "noget") {
						console.log("未领取")
						_this.mc = "display:block"
						//获取用户信息
						axios.post('http://api.oexchain.com/api/redgift/getRedGiftDetail?redid=' + _this.datalist.geticodebyip + "&pk=" +
							_this.datalist.emailPhone, { // 还可以直接把参数拼接在url后边
							}).then(function(res) {
							console.log(res)
							_this.name = res.data.data.sender
							_this.remaketext = res.data.data.remake
							_this.amountnum = res.data.data.amount
						}).catch(function(error) {
							console.log(error);
						});
						//查看当前红包的详情
						axios.post('http://api.oexchain.com/api/redgift/getAlreadyList.oex?redid=' + _this.datalist.geticodebyip, { // 还可以直接把参数拼接在url后边
						}).then(function(res) {
							if (res.data.code == 200) {
								console.log(res)
								//筛选
								var arr1 = res.data.data
								let arr2 = arr1.filter(item => {
									return item.status == 2;
								})
								let arr3 = arr1.filter(item => {
									return item.status == 3;
								})
								var arr4 = arr2.concat(arr3)
								console.log(arr4)
								_this.status = arr2.length
								_this.redlist = arr4
								_this.alllist = res.data.data
								console.log(_this.alllist.length)
							}
						}).catch(function(error) {
							console.log(error);
						});
					} else {
						_this.mc = "display:none"
						console.log("已经领取领取等")
						//获取用户信息
						axios.post('http://api.oexchain.com/api/redgift/getRedGiftDetail?redid=' + _this.datalist.geticodebyip + "&pk=" +
							_this.datalist.emailPhone, { // 还可以直接把参数拼接在url后边
							}).then(function(res) {
							console.log(res)
							_this.name = res.data.data.sender
							_this.remaketext = res.data.data.remake
							// _this.amountnum=res.data.data.amount
							// _this.assetname=res.data.data.assetname
						}).catch(function(error) {
							console.log(error);
						});
						//查看当前红包的详情
						axios.post('http://api.oexchain.com/api/redgift/getAlreadyList.oex?redid=' + _this.datalist.geticodebyip, { // 还可以直接把参数拼接在url后边
						}).then(function(res) {
							if (res.data.code == 200) {
								console.log(res)
								//筛选
								var arr1 = res.data.data
								let arr2 = arr1.filter(item => {
									return item.status == 2;
								})
								let arr3 = arr1.filter(item => {
									return item.status == 3;
								})
								var arr4 = arr2.concat(arr3)
								console.log(arr4)
								let me = arr1.filter(item => {
									return item.rpk == _this.datalist.emailPhone;
								})
								console.log(me)
								_this.amountnum = me[0].amount
								_this.assetname = me[0].assetname
								_this.status = arr2.length
								_this.redlist = arr4
								_this.alllist = res.data.data
							}
						}).catch(function(error) {
							console.log(error);
						});
					}

					// if (typeof(res.data.data) == "object") {
					// 	//第一次
					// 	_this.name = res.data.data.sender
					// 	_this.remaketext = res.data.data.remake
					// 	//第二次
					// 	sessionStorage.setItem('namehc', res.data.data.sender);
					// 	_this.namehc = sessionStorage.getItem("namehc")
					// 	sessionStorage.setItem('remaketexthc', res.data.data.remake);
					// 	_this.remaketexthc = sessionStorage.getItem("remaketexthc")
					// 	sessionStorage.setItem('amountnumhc', res.data.data.amount);
					// 	_this.amountnumhc = sessionStorage.getItem("amountnumhc")
					// 	sessionStorage.setItem('assetnamehc', res.data.data.assetname);
					// 	_this.assetnamehc = sessionStorage.getItem("assetnamehc")
					// } else {
					// 			_this.mc = "display:none"
					// 			_this.openredstyle = "display"
					// 			var remaketexthc = sessionStorage.getItem("remaketexthc")
					// 			var namehc = sessionStorage.getItem("namehc")
					// 			_this.remaketext = remaketexthc
					// 			_this.name = namehc
					// 			var amountnumhc = sessionStorage.getItem("amountnumhc")
					// 			var assetnamehc = sessionStorage.getItem("assetnamehc")
					// 			_this.amountnum = amountnumhc
					// 			_this.assetname = assetnamehc
					// 			if (_this.remaketexthc || _this.namehc) {}
					// 			_this.openhongbao()
					// }

				}).catch(function(error) {
					console.log(error);
				});
			} else {
				// console.log("无参数")
			}
		},

		updated() {

		},
		methods: {
			//抢红包
			openhongbao() {
				var _this = this
				//抢红包接口
				axios.post('http://api.oexchain.com/api/redgift/rob.oex?redid=' + _this.datalist.geticodebyip + '&pk=' + _this.datalist
					.emailPhone + '&vcode=' + _this.datalist.vcode, { // 还可以直接把参数拼接在url后边
					}).then(function(res) {
					console.log(res)
					if (res.data.code == 200) {
						if (res.data.data == "already" || res.data.data == "none" || res.data.data == "timeout") {
							//查看当前红包的详情
							axios.post('http://api.oexchain.com/api/redgift/getAlreadyList.oex?redid=' + _this.datalist.geticodebyip, { // 还可以直接把参数拼接在url后边
							}).then(function(res) {
								console.log(res)
								if (res.data.code == 200) {
									//筛选
									var arr1 = res.data.data
									let arr2 = arr1.filter(item => {
										return item.status == 2;
									})
									let arr3 = arr1.filter(item => {
										return item.status == 3;
									})
									var arr4 = arr2.concat(arr3)
									_this.status = arr4.length
									_this.redlist = arr4
									_this.alllist = res.data.data
								}
							}).catch(function(error) {
								console.log(error);
							});
						} else {
							//#endif H5
											localStorage.setItem(_this.datalist.geticodebyip,"1")
											localStorage.setItem(_this.datalist.geticodebyip+"pk",_this.datalist.emailPhone)
							//#endif
							// //判断是否过期
							_this.beOverdue = true
							_this.amountnum = res.data.data.amount
							_this.assetname = res.data.data.assetname
							// _this.name = res.data.data.sender
							_this.mc = "display:none"
							_this.openredstyle = "display:block"
							// /api/redgift/getAlreadyList.oex
							//查看当前红包的详情
							axios.post('http://api.oexchain.com/api/redgift/getAlreadyList.oex?redid=' + _this.datalist.geticodebyip, { // 还可以直接把参数拼接在url后边
							}).then(function(res) {
								if (res.data.code == 200) {
									console.log(res)
									//筛选
									var arr1 = res.data.data
									let arr2 = arr1.filter(item => {
										return item.status == 2;
									})
									let arr3 = arr1.filter(item => {
										return item.status == 3;
									})
									var arr4 = arr2.concat(arr3)

									function geTel(tel) {
										return tel.substring(0, 3) + "****" + tel.substr(tel.length - 4);
									}
									for (var i = 0; i < arr4.length; i++) {
										arr4[i].rpk = geTel(arr4[i].rpk)
										console.log(arr4[0].rpk)
									}
									console.log(arr4)
									_this.status = arr2.length
									_this.redlist = arr4
									_this.alllist = res.data.data
								}
							}).catch(function(error) {
								console.log(error);
							});



						}
					}else{
						alert(res.data.message)
					}
				}).catch(function(error) {
					console.log(error);
				});
			}
		}
	}
</script>

<style scoped>
	@import url('../../src/assets/styles/redEnvelopes.css');
</style>
