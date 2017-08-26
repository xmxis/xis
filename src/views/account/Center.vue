<template>
  <div>
    <div style="" class="playflex aligncenter justcenter head">
      <div>
        <img v-if="head_img" v-bind:src="head_img" class="w65 h65">
        <img v-else src="../../assets/images/logo2.png" class="w65 h65">
        <div class="fs15 fwhite mt13 center">{{ account_name }}</div>
      </div>
    </div>
    <group >
      <cell link="/account/card" class="module-item" title="我的校园卡" is-link>
        <img slot="icon" src="../../assets/images/blue_icon.png">
      </cell>
      <cell link="/account/cardrecord?cardId=all" class="module-item"  title="我的交易记录" is-link>
        <img slot="icon"  src="../../assets/images/red_icon.png">
      </cell>
      <cell link="/order-record" class="module-item" title="我的订餐记录" is-link>
        <img slot="icon"  src="../../assets/images/yellow_icon.png">
      </cell>

    </group>

    <div class="h50"></div>
    <tool-bar></tool-bar>
  </div>
</template>

<script>
  import {Cell,Group} from 'vux'

  export default {
    components: {
      Group,
      Cell
    },
    mounted() {
      console.log('Component mounted.')
    },
    data(){
      return {
        account_name:null,
        head_img : null,
      }
    },    
    created: function () {
      this.getUserInfo();
//      this.settings();
    },
    methods:{    
      getUserInfo:function()
      {
        this.account_name = localStorage.getItem('account_name'); 
        this.head_img = localStorage.getItem('head_img_url'); 
      },
    }
  }
</script>

<style >
  .head {
    background-image: url('../../assets/images/green_back.png');
    background-size: 100% 100%;
    min-height: 185px;
  }
  .module-item img{
    display:block;margin-right:15px;
  }
</style>
