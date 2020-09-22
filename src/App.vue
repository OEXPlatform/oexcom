<template>
  <div id="app">
    <!-- <router-link to="/">Home</router-link> |
    <router-view/> -->
    <div class="header">
      <div class="center">
        <img src="../src/assets/img/logo.png">
        <div class="right">
          <a href="#" class="whitebook active"  >{{$t('home.toHOME')}}</a>
          <a href="img/OEX1.0.pdf" target="_blank" class="whitebook" v-if="Language=='zh'">{{$t('home.toWHITEPAPER')}}</a>
         <a href="img/OEXEN1.0.pdf" target="_blank" class="whitebook" v-else>{{$t('home.toWHITEPAPER')}}</a>
          <a href="#"  class="whitebook">{{$t('home.toOEXCHAIN')}}</a>
		   <a href="https://uniswap.oexchain.io/#/swap"  class="whitebook" target="_blank">{{$t('OEXSWAP')}}</a>
		   <a href="https://oexservice.zendesk.com"  class="whitebook"  target="_blank">{{$t('Announcement')}}</a>
          <a class="download" href="#">
            <img src="../src/assets/img/appdownload.png" v-if="Language=='zh'"/>
			<img src="../src/assets/img/appdownloaden.png" v-else style="width:131px;"/>
            <!-- APP下载 -->
          </a>
          <div class="lanuage">
            <!-- <span class="lanuage_active">{{$t('language.name')}}</span> -->
            <img src="../src/assets/img/en.png" v-if="Language=='zh'"  @click="changeLanguage()" />
			<img src="../src/assets/img/zh.png" v-else  @click="changeLanguage()" />
          </div>
        </div>
      </div>
      
    </div>
    <img src="../src/assets/img/banner.png" class="banner"  v-if="Language=='zh'"/>
	<img src="../src/assets/img/banneren.png" class="banner" v-else/>

    <div class="part_one">
      <div class="part_one_center">
        <div class="img_box">
          <img src="../src/assets/img/part_one.png" v-if="Language=='zh'"/>
		  <img src="../src/assets/img/part_oneen.png"  v-else/>
        </div>
        <div class="part_one_text">
          <div class="text_box">
              {{$t('Module[0].one')}}
          </div>
        </div>
      </div>
    </div>

    <div class="part_two">
      <div class="part_tow_center">
        <div class="left_align">
          <div class="item green">
            <div  :class="{'item_left':Language=='zh'}" class="item_leften item_five">
                <img src="../src/assets/img/item1.png"/>
               <span>{{$t('Module[1].title')}}</span>
               <span>{{$t('Module[1].title2')}}</span>
            </div>
            <div class="item_right">
			{{$t('Module[1].two')}}
            </div>
          </div>
        </div>

        <div class="right_align">
          <div class="item gray">
            <div  :class="{'item_left':Language=='zh'}" class="item_leften item_five">
                <img src="../src/assets/img/item2.png"/>
				<span>{{$t('Module[2].title')}}</span>
				<span>{{$t('Module[2].title2')}}</span>
            </div>
            <div class="item_right">
                {{$t('Module[2].three')}}
            </div>
          </div>
        </div>

        <div class="left_align">
          <div class="item green">
            <div  :class="{'item_left':Language=='zh'}" class="item_leften item_five">
                <img src="../src/assets/img/item3.png"/>
				<span>{{$t('Module[3].title')}}</span>
				<span>{{$t('Module[3].title2')}}</span>
            </div>
            <div class="item_right">
                {{$t('Module[3].four')}}
            </div>
          </div>
        </div>


        <div class="right_align">
          <div class="item gray" >
            <div  :class="{'item_left':Language=='zh'}" class="item_leften item_five">
                <img src="../src/assets/img/item4.png"/>
                <span>{{$t('Module[4].title')}}</span>
                <span>{{$t('Module[4].title2')}}</span>
				<span>{{$t('Module[4].title3')}}</span>
            </div>
            <div class="item_right">
               {{$t('Module[4].five')}}
            </div>
          </div>
        </div>

        <div class="left_align">
          <div class="item green" style="margin-bottom:0"> 
            <div :class="{'item_left':Language=='zh'}" class="item_leften item_five">
                <img src="../src/assets/img/item5.png" />
                <span>{{$t('Module[5].title')}}</span>
            </div>
            <div class="item_right">
               {{$t('Module[5].six')}}
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="part_three">
      <div class="part_three_center">
        <div class="center_left">
          <div class="text_oex">OEX</div>
          <div   class="text_text" v-if="Language=='zh'">{{$t('text_text')}}</div>
		  <div  class="text_texten" v-else>{{$t('text_text')}}</div>
          <div  class="text_text_account" v-if="Language=='zh'">{{$t('text_text_account')}}</div>
		  <div   class="text_text_accounten " v-else>({{$t('text_text_account')}})</div>
        </div>
        <img src="../src/assets/img/part_three_right.png" class="center_right" v-if="Language=='zh'"/>
        <img src="../src/assets/img/part_three_righten.png" class="center_right" v-else/>
      </div>
    </div>
    
    <div class="part_four">
      <div class="text_partner">{{$t('text_partner')}}</div>
      <a href="https://github.com/OEXPlatform" target="_blank">
        <img src="../src/assets/img/join_us.png" class="join_us" v-if="Language=='zh'"/>
		 <img src="../src/assets/img/join_usen.png" class="join_us"  v-else/>
      </a>
    </div>

    <div class="footer">
      <div class="footer_center">
        <div class="center_left footer_left">
          <img src="../src/assets/img/footer_left.png"/>
        </div>
        <div class="footer_right">
          <div class="right_top">
            <a href="http://t.me/oexfund" target="_blank"><img src="../src/assets/img/f_r_1.png"/></a>
            <a href="http://t.me/oexfunder" target="_blank"><img src="../src/assets/img/f_r_2.png"/></a>
            <a href="https://www.facebook.com/fund.oex.7" target="_blank"><img src="../src/assets/img/f_r_3.png"/></a>
            <a href="https://twitter.com/Oex_team" target="_blank"><img src="../src/assets/img/f_r_4.png"/></a>
          </div>
          <!-- <p>© 2019 Theme designed by oex.com</p> -->
        </div>
      </div>
    </div>

    <div class="coypRight">
      <span>© 2019 Theme designed by oex.com</span>
      <span class="line">|</span>
      <span>oexfund@gmail.com</span>
    </div>

  </div>
</template>
<script>
		export default {
			data(){
			return {
				Language:"zh"
			}
			},
    methods:{
        changeLanguage(){
            this.$i18n.locale=='en'?this.$i18n.locale='zh':this.$i18n.locale='en'  ,
			console.log( this.$i18n.locale)
			this.Language= this.$i18n.locale
			//设置中英文模式
            localStorage.setItem('languageSet',this.$i18n.locale)   //将用户设置存储到localStorage以便用户下次打开时使用此设置
        },
        remind(){
            this.$toast(this.$t('user.loginUsername'))
        }
    },
	}
</script>
<style>
  @import url('../src/assets/styles/index.css');
</style>




          
          