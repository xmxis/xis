<template>
  <div>
    <tabbar>
      <tabbar-item>
        <!--<img slot="icon" src="../assets/demo/icon_nav_button.png">-->
        <span slot="label" link="/account/index"  @click="$router.push({path: '/account/index'})">首页</span>
      </tabbar-item>
      <tabbar-item link="/ordering">
        <!--<img slot="icon" src="../assets/demo/icon_nav_msg.png">-->
        <span slot="label" >餐食预定</span>
      </tabbar-item>
      <tabbar-item link="/account/card">
        <!--<img slot="icon" src="../assets/demo/icon_nav_article.png">-->
        <span slot="label">我的校园卡</span>
      </tabbar-item>
      <tabbar-item link="/account/center">
        <!--<img slot="icon" src="../assets/demo/icon_nav_cell.png">-->
        <span slot="label">用户中心</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import {Tabbar, TabbarItem, Group, Cell} from 'vux'

  export default {
    components: {
      Tabbar,
      TabbarItem,
      Group,
      Cell
    }
  }

</script>
<style>
  .weui-tabbar{
    position: fixed;
  }
</style>
