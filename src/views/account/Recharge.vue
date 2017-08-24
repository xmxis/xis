<template>
  <div class="body">
    <div class="pt20 pb20 mr20 ml20 borderbottom">
      <div class="pos-relative">
        <x-input type="tel" placeholder="请输入电话号码" v-model="account_name"></x-input>
        <!--<img src="../../assets/images/delete_right_btn.png" class="delete-number-btn">-->
      </div>
      <div class="username">
        <span>姓名：</span>
        <span>{{name}}</span>
      </div>
    </div>

    <div class="amt-list">
      <div class="fs14 f666 mt24 mb12 pr5 pl5">充值金额</div>
      <flexbox>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==50?'active':''" @click="current_amt=50">
            50元
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==100?'active':''" @click="current_amt=100">
            100元
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==200?'active':''" @click="current_amt=200">
            200元
          </div>
        </flexbox-item>
      </flexbox>

      <flexbox>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==500?'active':''" @click="current_amt=500">
            500元
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==1000?'active':''" @click="current_amt=1000">
            1000元
          </div>
        </flexbox-item>
        <flexbox-item>
          <div class="recharge-wrap" :class="current_amt==2000?'active':''" @click="current_amt=2000">
            2000元
          </div>
        </flexbox-item>
      </flexbox>

      <div class="fs14 f666 mt24 mb12 pr5 pl5">自定义金额</div>
      <input type="number" class="form-control free-input" placeholder="请输入自定义金额">
    </div>

    <div class="mt40 mb15 mr40 ml40">
      <div class="confirm-green-btn" @click="submitRecharge">确定</div>
    </div>
    <tool-bar></tool-bar>

  </div>
</template>

<script>
  import {XInput, Group, XButton, Cell,Flexbox, FlexboxItem, Divider} from 'vux'
  import Request from '../../assets/js/request.js'

  export default {
    components: {
      XInput,
      XButton,
      Group,
      Cell,
      Flexbox,
      FlexboxItem,
      Divider
    },
    mounted() {

    },
    watch:{
      'account_name' : function () {
        let self = this;
        Request.get('/api/account/pagination', {
          'account_name' : self.account_name
        }, function (data) {
          if (data.length>0){
            self.name = data[0].reference.full_name
          }
        })
      }
    },
    data(){
      return {
        account_name : '',
        current_amt : 50,
        name : ''
      }
    },
    methods:{
      submitRecharge : function () {

      }
    }
  }
</script>

<style>
  .body{
    background: white !important;
    height: 100vh;
  }
  .vux-flexbox{
    margin-top: 10px;
  }
  .free-input{
    display: block;
    width: 90%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  .amt-list {
    margin-top: 20px;
    padding-left: 15px;
    padding-right: 15px;
    font-size: 16px;
  }

</style>
