<template>
  <div>
    <tab>
      <tab-item v-for="item in channel.list" :selected="item.id==channel.current.id" @click="channel.current=item"
                @on-item-click="onItemClick">
        {{item.name}}
      </tab-item>
    </tab>
    <div class="myContent tab-content ">
      <div class="food-cate-wrap hp100">
        <div class="order-left hp100">
          <ul class="list-group mb30">
            <div class="list-group-cate"
                 v-for="item in menu_category.list"
                 :class="menu_category.current.id==item.id?'active':''"
                 @click="menu_category.current=item">
              <li class="order-left-list">{{item.name}}</li>
            </div>
          </ul>
        </div>
        <div class="order-right">
          <a class="order-right-cate delete-style">
            <!--<div class="order-right-title">早餐 （7）</div>-->
            <!--<div class="order-right-title hidden order-right-title-hidden">早餐 （7）</div>-->
            <div class="order-right-content-wrap">
              <div class="order-right-content borderbottom-f5"
                   v-for="item in setting.list">
                <img :src="item.photo" class="w75 h75 pos-absolute">
                <div class="food-intro">
                  <div class="food-title mmt2">{{item.food_name}}</div>
                  <div class="food-detail mt8">{{item.description}}</div>
                  <div class="food-number mt8">单日已预订66单</div>
                  <div class="mt8">
                    <div class="fred fl fs16 lh23 food-price">￥<span class="food-price-span">{{item.price}}</span></div>
                    <div class="free-collocation fr" v-if="item.rule==1" @click="ruleSelect(item)">
                      自由搭配
                    </div>
                    <div class="fr playflex" v-else>
                      <img src="../../assets/images/substract.png" class="w23 h23 sub-btn"
                           v-show="computed_ss_count(item)>0" @click="removeSt(item)">
                      <div class="food-amount" v-show="computed_ss_count(item)>0">{{computed_ss_count(item)}}</div>
                      <img src="../../assets/images/plus.png" class="w23 h23 plus-btn" @click="addSt(item)">
                    </div>
                    <div class="clear"></div>
                  </div>
                </div>
              </div>
            </div>
          </a>

        </div>

      </div>
    </div>

    <div v-transfer-dom>
      <popup v-model="show_shop_car" position="bottom" max-height="50%">
        <div class="alert-car-title h40">
          <div class="f222 fs14 fw600">购物车</div>
          <div class="f999 fs13 empty-car" @click="emptyShopCar">
            <img src="../../assets/images/trash.png" class="h14 mr5">
            <div>清空</div>
          </div>
        </div>
        <div class="alert-car-content" style="max-height:200px;overflow:scroll;background: white">
          <div class="order-right-content borderbottom-f5 ml15" v-for="item in setting.selected">
            <img src="../../assets/images/food1.png" class="w43 h43 pos-absolute">
            <div class="ml58">
              <div class="food-title mmt2">{{item.name}}</div>
              <div class="food-detail mt8">{{item.description}}</div>
              <div class="mt8">
                <div class="fred fl fs16 lh23 food-price">￥<span class="food-price-span">{{item.price}}</span></div>
                <div class="fr playflex">
                  <img src="../../assets/images/substract.png" class="w23 h23 sub-btn" @click="carRemoveSt(item)">
                  <div class="food-amount">{{item.amount}}</div>
                  <img src="../../assets/images/plus.png" class="w23 h23 plus-btn" @click="carAddSt(item)">
                </div>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>

        <div style="padding: 15px;background: #fff"></div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup id="rule-pop"  v-model="show_rule_pop" position="bottom">
        <div class="con pb50" >
          <popup-header left-text="取消"  title="自由搭配"></popup-header>

          <img src="../../assets/images/big-img.png" class="widthp100">
          <div class="pt15 pr20 pl20">
            <div class=" mb15">
              <span class="fs16 f222 fw600  mr4">{{rule.current.food_name}}</span>
              <span class="fs13 f999">{{rule.current.description}}</span>
            </div>
            <div class="mb5">
              <div class="fred fs16 lh23 food-price">￥<span class="food-price-span">{{rule.current.price}}</span></div>
            </div>
            <div class="collaction-wrap">
              <div class="free-food-part borderbottom-f5" v-for="item in rule.categories" @click="ruleCateSelect(item)">
                <div class="playflex aligncenter">
                  <img src="../../assets/images/food1.png" class="w40 h40 mr8">
                  <div class="f999 fs14 show-choose-food">{{rule.select_foods[item.category_id]?rule.select_foods[item.category_id].food_name:item.category_name}}</div>
                </div>
                <img src="../../assets/images/arrow-right.png" class="h13">
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>

    <div v-transfer-dom>
      <popup v-model="show_rule_setting" position="bottom">
        <div class="con" style="height: 100vh;background: white">
          <div class="pt15 pr20 pl20">
            <div class=" mb15">
              <span class="fs16 f222 fw600  mr4">{{rule.select_category.category_name}}</span>
            </div>
            <div class="collaction-wrap">
              <div class="free-food-part borderbottom-f5" v-for="item in rule.foods" @click="ruleSelectFood(item)">
                <div class="playflex aligncenter">
                  <img src="../../assets/images/food1.png" class="w40 h40 mr8">
                  <div class="f999 fs14 show-choose-food">{{item.food_name}}</div>
                </div>
                <img src="../../assets/images/arrow-right.png" class="h13">
              </div>
            </div>
          </div>
        </div>
      </popup>
    </div>

    <nav class="navbar navbar-default navbar-fixed-bottom bwhite z1044" v-if="!show_rule_pop" id="footer-choose-no"
         style="z-index:1041;">
      <div class="playflex justbetween">

        <div class="mh50 playflex playcenter pl10 h50" v-if="setting.selected.length>0"
             @click="show_shop_car = show_shop_car?false:true">
          <div class="pos-relative car-wrap">
            <img src="../../assets/images/green-car.png" class="green-car">
            <div class="circle-number">{{total_amount}}</div>
          </div>
          <div class="ml10 fred fs16 w95 text-ellipsis">￥<span class="total-price">{{total_amt}}</span></div>
        </div>

        <div class="mh50 playflex playcenter pl10" v-else>
          <img src="../../assets/../assets/images/order-car.png" class="order-car">
          <div class="ml10 fgrey">未选中商品</div>
        </div>

        <div class="w138 fs15 mh50 playflex playcenter fwhite bgreen" v-if="setting.selected.length>0" @click="submitOrder()">选好了</div>
        <div class="w138 bgrey fs15 mh50 playflex playcenter fwhite " v-else>1份起预定</div>

      </div>
    </nav>

    <nav class="navbar navbar-default navbar-fixed-bottom z1041 bgreen" v-if="show_rule_pop&&!show_rule_setting" @click="ruleSubmit()" style="z-index:1041;">
      <div class="fs15 fwhite lh50 center">
        确定
      </div>
    </nav>
    <nav class="navbar navbar-default navbar-fixed-bottom z1041" v-if="show_rule_pop&&show_rule_setting" style="z-index:1041;background: #ff6e6e">
      <div class="fs15 fwhite lh50 center" @click="show_rule_setting=false">
        取消
      </div>
    </nav>

  </div>
</template>

<script>
  import {TransferDom, Tab, TabItem, Group, Popup, Cell, Panel,XButton,PopupHeader} from 'vux'
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
      XButton,
      PopupHeader
    },
    data() {
      return {
        keywords: '',
        channel: {
          list: [],
          current: {}
        },
        menu_category: {
          list: [],
          current: {}
        },
        setting: {
          list: [],
          selected: []
        },
        rule: {
          current: {},
          foods: [],
          select_foods: [],
          categories: [],
          select_category: {}
        },
        show_shop_car: false,
        show_rule_pop: false,
        show_rule_setting : false
      }
    },
    mounted() {


    },
    created: function () {
      this.channels();
//      this.settings();
    },
    computed: {
      menu_date: function () {
        let date = new Date();
        let month = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1);
        let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
        let date_str = date.getFullYear() + '-' + month + '-' + day

        return date_str;
      },
      total_amt: function () {
        let amt = 0;
        this.setting.selected.forEach(function (item, index) {
          amt += parseFloat(item.price);
        });

        return amt;
      },
      total_amount: function () {
        let amount = 0;
        this.setting.selected.forEach(function (item, index) {
          amount += item.amount;
        });

        return amount;
      },
      rule_select_food_count : function () {
        let count = 0;
        this.rule.select_foods.forEach(function (item) {
          count += 1;
        });
      }

    },
    watch: {
      'channel.current': function () {
        this.menuCategories();
        this.settings();
      },
      'rule.current': function () {
        this.ruleCategories();
      },
      'rule.select_category': function () {
        this.ruleFoods();
      },
      'menu_category.current': function () {
        this.settings();
      },
    },
    methods: {
      onItemClick(index) {
        this.channel.current = this.channel.list[index];
      },
      channels: function () {
        let self = this;
        Request.get('/api/menu-channel/pagination', {}, function (data) {
          self.channel.list = data;
          self.channel.current = data[0]
        })
      },
      menuCategories: function () {
        let self = this;
        Request.get('/api/menu-category/pagination', {
          'date': self.menu_date,
          'channel_id': self.channel.current ? self.channel.current.id : ''
        }, function (data) {
          self.menu_category.list = data;
          self.menu_category.current = data[0];
        })

      },
      settings: function () {
        let self = this;
        Request.get('/api/view-menu-setting/pagination', {
          'date': self.menu_date,
          'channel_id': self.channel.current ? self.channel.current.id : '',
          'menu_category_id': self.menu_category.current ? self.menu_category.current.id : ''
        }, function (data) {
          self.setting.list = data;
        })
      },
      addSt: function (data) {
        let is_exist = false;
        let food = {};
        food.id = data.id;
        food.name = data.food_name;
        food.price = data.price;
        food.rule = data.rule;
        food.description = data.description;
        food.amount = 1;

        if (data.rule == 1) {
          let description = '';
          this.rule.select_foods.forEach(function (item) {
            description += item.food_name;
          });
          food.description = description;
        } else {
          this.setting.selected.forEach(function (item) {
            if (item.id == food.id) {
              item.amount += 1;
              item.price = item.amount * food.price;
              is_exist = true;
            }
          });
        }


        if (!is_exist) {
          this.setting.selected.push(food);
        }
      },
      removeSt: function (food) {
        let is_exist = false;
        let self = this;
        this.setting.selected.forEach(function (item, index) {
          if (item.id == food.id) {
            if (item.amount == 1) {
              self.setting.selected.splice(index)
              return;
            }

            item.amount -= 1;
            item.price = item.amount * food.price;
            is_exist = true;
          }
        });
      },
      carAddSt : function (data) {
        let self = this;
        this.setting.list.forEach(function (item, index) {
          if (item.id == data.id) {
            self.addSt(item);
          }
        });
      },
      carRemoveSt : function (data) {
        let self = this;
        this.setting.list.forEach(function (item, index) {
          if (item.id == data.id) {
            self.removeSt(item);
          }
        });
      },
      ruleSelect: function (item) {
        this.clearRule();
        this.rule.current = item;
        this.show_rule_pop = this.show_rule_pop ? false : true

      },
      ruleCategories: function () {
        let self = this;
        Request.get('/api/view-group-rules/pagination', {
          'group_id': self.rule.current ? self.rule.current.food_id : ''
        }, function (data) {
          self.rule.categories = data;
        })
      },
      ruleFoods: function () {
        let self = this;
        Request.get('/api/view-group-foods/pagination', {
          'group_id': self.rule.current ? self.rule.current.food_id : '',
          'category_id': self.rule.select_category ? self.rule.select_category.category_id : ''
        }, function (data) {
          self.rule.foods = data;
        })
      },
      ruleCateSelect : function (data) {
        this.rule.select_category=data
        this.show_rule_setting = true;
      },
      ruleSelectFood: function (data) {
        this.show_rule_setting = false;
        this.rule.select_foods[this.rule.select_category.category_id] = data;
      },
      ruleSubmit: function () {
        let count = 0;
        this.rule.select_foods.forEach(function (item) {
          count += 1;
        });
        if (this.rule.categories.length != count) {
          slayer.alert('您还没有搭配好哦！');

          return;
        }

        this.addSt(this.rule.current);
        this.show_rule_pop = false;
      },
      clearRule: function () {
        this.rule.current = {},
          this.rule.foods = [],
          this.rule.select_foods = [],
          this.rule.categories = [],
          this.rule.select_category = {}
      },
      submitOrder: function () {
        let self = this;

        let el = slayer.loading('正在提交订单中...')
        Request.post('/api/food-order/store', {
          'data': self.setting.selected
        }, function (data) {
          slayer.closeLoading();
          if (data.success) {
            slayer.alert(data.success,function () {
              alert('跳转页面')
            });
          } else {
            slayer.alert('系统繁忙，请稍后再试')
          }
        })
      },
      emptyShopCar : function () {
        let self = this;
        slayer.confirm('确定要清空购物车吗？',function () {
          self.setting.selected = [];
        })
      },
      computed_ss_count: function (food) { //setting select count
        let amount = 0;
        this.setting.selected.forEach(function (item) {
          if (item.id == food.id) {
            amount = item.amount;
          }
        });
        return amount;
      }
    }
  }
</script>

<style>
  .vux-tab {
    border-bottom: 1px solid #eeeeee;
    height: 1rem;
  }

  .myContent {
    margin-top: 4px;
  }

  .order-left-list {
    padding-top: 0px;
    padding-bottom: 0px;
    line-height: 50px;
  }

  .navbar {
    position: fixed;
    bottom: 0;
    width: 100%;
  }

  .vux-popup-dialog {
    margin-bottom: 50px;
  }

  .weui-panel {
    margin-top: 0px !important;
  }

  #rule-pop {
    background: white;
    height: 100% !important;
  }
</style>
