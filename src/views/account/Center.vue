<template>
  <div>
    <div style="" class="playflex aligncenter justcenter head">
      <div>
        <img src="../../assets/images/logo2.png" class="w65 h65">
        <div class="fs15 fwhite mt13 center">用户姓名</div>
      </div>
    </div>
    <group >
      <cell class="module-item" title="我的校园卡" is-link>
        <img slot="icon" src="../../assets/images/blue_icon.png">
      </cell>
      <cell class="module-item"  title="我的交易记录" is-link>
        <img slot="icon"  src="../../assets/images/red_icon.png">
      </cell>
      <cell class="module-item" title="我的订餐记录" is-link>
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
