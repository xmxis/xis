<template>
    <div>

<div class="pt15 pr15 pl15 pb15">
      
          <div class="card-type pt20 pl20" v-for="item in cards" :class="item.status==1?inuse:nouse">
                <div class="card-title">
                    <div class="card-number">￥{{ item.balance }}</div>
                    <div class="vertical-divide"></div>
                    <div class="fs17">{{ getStatusName(item) }}</div>
                </div>
                <div>
                  <span>开卡时间：</span>
                  <span>{{ item.created_at }}</span>
                </div>
                <div class="card-btn-group">
                    <div :class="item.status == 1?'':'nouse'" class="card-btn mr10">充值</div>
                    <div class="card-btn" @click="$router.push({path: '/account/cardrecord',query:{cardId: item.id}})">交易记录</div>
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
            cards:[],
            account:{},
            className:null,
            inuse:null,
            nouse:null,

          }
        },
        created: function () {
            this.getCards();
        },        
        methods:{
          getCards:function(){
            let self = this;
            Request.get('/api/account/get-card', {}, function (data) {
              self.cards = data.cards;
              self.account = data;
              self.checkAccountType(self.account);
            })
          },
           
          checkAccountType:function(account)
          {
              if (account.role == 'teacher')
                  this.className="teacher-card";
              else if (account.role == 'parent')
                  this.className="parent-card";
              else if (account.role == 'company')
                  this.className="company-card";
              else if (account.role == 'out')
                  this.className="out-card";   
              this.inuse = this.className + '-inuse';
              this.nouse = this.className + '-nouse';
          },
          getStatusName:function(item)
          {
              if (item.status ==  1) 
                return '使用中';
              else if (item.status ==  2) 
                return '挂失';                      
              else if (item.status ==  3) 
                return '未激活';     
              return '异常状态'                     
          },
          redirect:function()
          {
          
            self.$router.push({path: '/account/index'})

          }


        }

    }
</script>
