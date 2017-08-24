<template>
<div>
	<div class="mh30 borderbottom pr15 pl15 playflex aligncenter justbetween fs14">
	        <div class="f999">{{ school.name }}</div>
	        <div>
	            <span class="f999">欢迎您</span>
	            <span class="f666">{{ account.account_name }}</span>
	        </div>
	   </div>

   <div class="content mt20 pr15 pl15" >
        <div  class="food-order pos-relative mb20" @click="$router.push({path: '/ordering'})">
              <div class="card-left">
                    <div class="fwhite fs17 mb8">餐食预定</div>
                    <div class="fwhite fs14 opacity5">为您精心准备的美食</div>
              </div>
              <div class="card-right">
                  <img src="../../assets/images/account/index_2.png" class="w89 h89">
              </div>
        </div>
        <div  class="my-school-card pos-relative mb20" @click="$router.push({path: '/account/card'})">
              <div class="card-left">
                    <div class="fwhite fs17 mb8">我的校园卡</div>
                    <div class="fwhite fs14 opacity5">校园一卡通 生活更精彩</div>
              </div>
              <div class="card-right">
                  <img src="../../assets/images/account/index_1.png" class="w89 h89">
              </div>
        </div>
   </div>


      <tool-bar></tool-bar>
</div>
</template>

<script>
  import Request from '../../assets/js/request.js'
  export default {
    mounted() {
      console.log('Component mounted.')
    },
    data(){
      return {
        account:{},
        school:{},
      }
    },
    created: function () {
      this.getUser();
//      this.settings();
    },
    methods:{
      getUser:function(){
        let self = this;
        Request.get('/api/account/get-user', {}, function (data) {
          self.account = data;
          self.school = data.school;
        })
      }
    }


  }
</script>

<style >
  .food-order {
    background-image:url('../../assets/images/account/back_1.png');
    background-size:100% 100%;min-height:190px;
  }
  .my-school-card {
    background-image:url('../../assets/images/account/back_2.png');
    background-size:100% 100%;min-height:190px;
  }
</style>


