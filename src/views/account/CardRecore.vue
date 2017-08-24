<template>
    <div>
   <div class="h40 lh40 fs14 fw600 borderbottom bwhite pl15">交易记录</div>

   <div class="pb15">
        <div class="trac-record" v-for="item in record">
            <img v-if="checkAmtType(item)" src="../../assets/images/account/circle_orange.png" class="record-circle">
            <img v-else src="../../assets/images/account/circle_green.png" class="record-circle">
            <div class="fl ml50 mwp57">
                <div class="fs14 f222 mb3">{{ getTypeVal(item) }}</div>
                <div class="fs12 f222 mb3">{{ getChannelVal(item) }}</div>
                <div class="fs12 f666">{{ item.created_at }}</div>
            </div>
            <div class="fs14 trac-record-number" :class="checkAmtType(item)?'forange':'fgreen'">
              <span>{{checkAmtType(item)?'+':'-'}}{{ item.amt }}</span>
            </div>
            <span class="fs666 fs12 trac-record-state">{{ item.status == 1?'成功':'失败' }}</span>
            <div class="clear"></div>
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
            record:[]
          }
        },
        created: function () {
            this.getCardRecord();
           // console.log(this.$route.params.cardId);
        },        
        methods:{
          getCardRecord:function(){
            let self = this;
            Request.get('/api/account/get-card-record', {
              'id':self.$route.query.cardId
            }, function (data) {
                self.record = data;
            })
          },
          getTypeVal:function(item)
          { 
            if (item.type == 1)
              return '充值';
            else if (item.type == 2)
              return '消费';
            else if (item.type == 3)
              return '挂失入账';
            else if (item.type == 4)
              return '挂失出账';    
            return '其他';            
          },
          getChannelVal:function(item)
          {
            if (item.channel == 1)
              return '现金';
            else if (item.channel == 2)
              return '刷卡';
            else if (item.channel == 3)
              return '微信';
            else if (item.channel == 4)
              return '支付宝';    
            return '其他'; 
          },
          checkAmtType:function(item)
          {
            if (item.type == 1 || item.type == 4)
              return true;
            else if (item.type == 2 || item.type == 3)
              return false;
          }
           
    


        }

    }
</script>
