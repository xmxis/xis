<template>
  <div>
    <tab>
      <tab-item v-for="(item , index) in list"  @on-item-click="onItemClick(item.status)"   :selected="index == 0">
             {{ item.name }}
      </tab-item>
    </tab>
    <div class="tab-content mt40 mb50">
      <div class="tab-pane fade in active hp100" id="order-finished">
     <div class="bwhite mb10 pr15 pl15" v-for="item in order">
            <div class="pt15 pb15 radius5">
                <img :src="item.photo_id" class="w40 h40 pos-absolute">
                <div class="ml50">
                    <div class="fl widthp70">
                      <div class="f222 fs14 mb5">{{ item.name }}</div>
                      <div>
                          <div class="f222 break-word mb3">￥{{ item.price }}
                          <span class="fs12">×{{ item.amount }}</span>
                          </div>
                      </div>
                      <div class="f999 fs11 mb5">{{ item.channel?item.channel.name:'' }}</div>
                      <div class="f666">2017-08-20 {{ item.start_time }}至{{ item.end_time }}</div>
                    </div>
                    <div class="fs14 fr widthp30 text-right">
                        <div class="fblue">{{ getStatusVal(item.status) }}</div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
            <div v-show="item.cancel" class="pb15 f999 fs11 text-right">
                开餐24小时内不可退餐
            </div>
        </div>
       </div>
        </div>
  </div>
</template>
<script>
  import {TransferDom, Tab, TabItem, Group, Popup, Cell, Panel,XButton} from 'vux'
  import Request from '../../assets/js/request.js'
  import slayer from '../../assets/js/s_layer.js'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Tab,
      TabItem,
      Request,
      Group,
      Popup,
      Cell,
      Panel,
      XButton
    },
    data() {
      return {
        list:[
          {name:'待取餐',status:'1'},
          {name:'已取餐',status:'3'},
          {name:'已退餐',status:'2'},
          {name:'已过期',status:'5'}
        ],
        order:[],
      }
    },
    mounted() {
    },
    created: function () {
      this.onItemClick(1);
    },
    computed: {
      menu_date: function () {
        let date = new Date();
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let date_str = date.getFullYear() + '-' + month + '-' + day
        return date_str;
      }
    },
    watch: {
      'channel.current': function () {
        this.menuCategories();
        this.settings();
      } 
    },
    methods: {
      onItemClick(status) {
        let self = this;
        Request.get('/api/food-order/user-order', {
          'status':status
        }, function (data) {
          self.order = data;
        })
      },
      getStatusVal:function(status)
      {
        if (status == 1) 
          return '待取餐';
        else if (status == 2)
          return '已退餐';
        else if (status == 3)
          return '已取餐';
        else if (status == 5)
          return '已过期';                
      }
 
    }
  }
</script>

<style>
  .tab-content {
    margin-top: 0px;
  }
</style>
