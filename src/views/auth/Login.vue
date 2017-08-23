<template>

  <div>

    <div class="bgreen center">
      <div><img src="../../assets/images/logo-img.png" class="logo-img"></div>
      <div><img src="../../assets/images/logo.png" class="logo"></div>
    </div>
    <div class="login-content">
      <group label-width="4.5em" label-margin-right="2em" label-align="right">
        <x-input class="login-input" title="用户名" v-model="account_name"></x-input>
        <x-input type="password" class="login-input" title="密码" v-model="password"></x-input>
      </group>

      <x-button class="bgreen fwhite login-btn" :show-loading="loging" :disabled="loging" @click.native="login">登录</x-button>
    </div>
  </div>

</template>

<script>
  import {GroupTitle, Group, XInput, XButton} from 'vux'
  import Request from '../../assets/js/request.js'
  //  import { XButton, Box, GroupTitle, Group, Flexbox, FlexboxItem, Divider } from 'vux'
  export default {
    components: {
      Group,
      GroupTitle,
      XInput,
      XButton
    },
    mounted() {
      console.log('Component mounted.')
    },
    data() {
      return {
        account_name: '',
        password: '',
        loging: false
      }
    },
    methods: {
      login: function () {
        let self = this;
        self.loging = true;
        Request.post('/api/auth/login', {
//          'account_id': 1
          'account_name' : self.account_name,
          'password' : self.password,
        }, function (data) {
          localStorage.token = data.data;
          self.loging = false;
          self.$router.push({path: '/account/index'})
        },function () {
          self.loging = false;
        })
      }
    }
  }
</script>
<style scoped>

</style>
<style>
  .logo {
    height: 41px !important;
    width: auto !important;
  }

  .weui-cell {
    border-top: 0px solid !important;
  }

  .weui-cell:before {
    border-top: 0px solid !important;
  }

  .login-btn {
    color: white !important;
    margin-top: 15px;
  }

  .login-input {
    padding: 0px !important;
    text-align: left !important;
    font-size: 12px !important;
    margin-top: 10px;
  }
</style>
