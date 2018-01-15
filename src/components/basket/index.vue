<template>
  <div style="height:100%;">
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="53px">
        <!-- 页面的 header部分 -->
        <x-header slot="header"
        class="content-header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
        :left-options="{showBack:true}"
        title="菜篮子">
        </x-header>
        <!-- 页面的 content 部分 -->
        <div class="basket-content">
          <group gutter="0">
            <cell  value="value" value-align="left" @click.native="toSelectAddr" is-link>
              <img slot="icon" src="../../../static/img/adress.png"  width="20" style="display:block;margin-right:10px;">
              <div class="address-cell-content">
                <div><span>{{defaultAddress.receiveName}}</span><span>{{defaultAddress.phoneUser}}</span></div>
                <p>{{defaultAddress.addDesc}}</p>
              </div>
            </cell>
          </group>
          <group :gutter="groupGutter" label-margin-right="10px">
              <popup-picker v-model="timePicker" :data="timeList" :column-width="[5]" @on-change="selectTime" value-text-align="left" placeholder="请选择送货时间" :display-format="timeFormat">
                 <template slot="title" slot-scope="props">
                    <div :class="props.labelClass" :style="props.labelStyle" style="height:24px;">
                      <img src="../../../static/img/time.png" width="20" style="display:block;margin-right:9px;float:left;margin-top:2px;">
                      <span style="vertical-align:middle;">收菜时间</span>
                    </div>
                  </template>
              </popup-picker>
          </group>
          <div class="orderGoodsList">
            <div class="orderListContent title">
              <p>名称</p>
              <p>规格/单价</p>
              <p>份</p>
              <p>小计(元)</p>
            </div>
            <swipeout>
            <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for="(commodity, index) in commodityList" :key="index" :class="(liIndex === commodity.idCommodity&&idSpec === commodity.idCommoditySpecifications)?'vux-pop-out-enter':''">
              <div slot="right-menu">
                <!--<swipeout-button @click.native="onButtonClick('fav')" type="primary">收藏</swipeout-button>-->
                <swipeout-button @click.native="isDelet(commodity, index)" type="warn">删除</swipeout-button>
              </div>
              <div slot="content" class="orderListContent">
                <p>{{commodity.commodityName}}</p>
                <p>{{commodity.saleDescribe}}/{{commodity.unitPrice}}</p>
                <p><x-number :value="commodity.commodityNum" ref="inputNum" class="inputNumber" width="32px" :min="0" @on-change="editNum($event,commodity,index)" fillable></x-number></p>
                <p>{{commodity.totalPrices.toFixed(2)}}</p>
              </div>
            </swipeout-item>
            </swipeout>
            <div class="orderListContent title">
              <p>总计</p>
              <p>&nbsp;</p>
              <p>{{totalNum}}</p>
              <p>{{totalMoney}}</p>
            </div>
          </div>
          <!--<group :gutter="groupGutter">-->
            <!--<x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">-->
              <!--<thead>-->
                <!--<tr>-->
                  <!--<th>名称</th>-->
                  <!--<th>规格/单价</th>-->
                  <!--<th>份</th>-->
                  <!--<th>小计(元)</th>-->
                <!--</tr>-->
              <!--</thead>-->
              <!--<tbody style="font-size:12px;">-->
                <!--<tr v-for="(commodity, index) in commodityList" :key="index" :class="(liIndex === commodity.idCommodity&&idSpec === commodity.idCommoditySpecifications)?'vux-pop-out-enter':''">-->
                  <!--<td>{{commodity.commodityName}}</td>-->
                  <!--<td>{{commodity.saleDescribe}}/{{commodity.unitPrice}}</td>-->
                  <!--<td><x-number :value="commodity.commodityNum" ref="inputNum" class="inputNumber" width="32px" :min="0" @on-change="editNum($event,commodity,index)" fillable></x-number></td>-->
                  <!--<td>{{commodity.totalPrices.toFixed(2)}}</td>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>总计</td>-->
                  <!--<td></td>-->
                  <!--<td>{{totalNum}}</td>-->
                  <!--<td>{{totalMoney}}</td>-->
                <!--</tr>-->
              <!--</tbody>-->
            <!--</x-table>-->
          <!--</group>-->
          <group :gutter="groupGutter">
            <cell value-align="right">
              <img slot="icon" src="../../../static/img/balancePay.png" width="20" style="display:block;margin-right:6px;">
              <!--<p slot="title"></p>-->
              <check-icon :value.sync="blanceCheck" class="radios">现金支付{{payBalance}}，余额{{leftUserBalance}}</check-icon>
            </cell>
            <cell value-align="right">
              <img slot="icon" src="../../../static/img/wechatPay.png" width="20" style="display:block;margin-right:6px;">
              <!--<p slot="title"></p>-->
              <check-icon :value.sync="wechatCheck" class="radios">微信支付{{payWechat}}</check-icon>
            </cell>
          </group>
           <group :gutter="groupGutter">
             <x-textarea title="备注" v-model="orderRemark" placeholder="如有特殊说明请在备注中说明" :max="50"></x-textarea>
          </group>
        </div>
        <div v-transfer-dom>
          <confirm v-model="show"
                   title="温馨提示"
                   @on-confirm="onConfirm"
          >
            <p style="text-align:center;">您要从此订单中删除此商品吗？</p>
          </confirm>
        </div>
        <!-- 页面的 bottom 部分 -->
        <div slot="bottom" class="bottom-content">
           <flexbox>
            <flexbox-item>
              <x-button link="/home" plain type="primary" class="bottom-button">继续买菜</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button @click.native="submitOrder" type="primary" class="bottom-button">结算</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </view-box>
  </div>
</template>

<script>
import { Confirm, Group, Cell, ViewBox, XHeader, Loading, XTable, XNumber, CheckIcon, XTextarea, XButton, Flexbox, FlexboxItem, PopupPicker, Swipeout, SwipeoutItem, SwipeoutButton, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'basket',
  directives: {
    TransferDom
  },
  components: {
    Confirm,
    Group,
    Cell,
    ViewBox,
    XHeader,
    Loading,
    XTable,
    XNumber,
    CheckIcon,
    XTextarea,
    XButton,
    Flexbox,
    FlexboxItem,
    PopupPicker,
    Swipeout,
    SwipeoutItem,
    SwipeoutButton
  },
  data () {
    return {
      groupGutter: '10px',
      orderRemark: '',
      blanceCheck: false,
      wechatCheck: false,
      defaultAddress: {idUserAddrMgr: -1},
      orderRecord: null,
      phoneUser: null,
      commodityInfo: {},
      commodityList: [],
      userAddrMgrList: [],
      userBalance: 0,
      requestTimeList: [],
      timePicker: [],
      hourList: ['07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18'],
      timeList: [],
      liIndex: '',
      idSpec: '',
      commodity: '',
      index: '',
      show: false,
      shipState: '',
      t: '',
      timeFormat: function (value, name) {
        return `${name} ${value[1]}:${value[2]}`
      }
    }
  },
  computed: {
    minuteList () {
      let minuteList = []
      for (let i = 0; i < 60; i++) {
        minuteList.push(formatMinute(i))
      }
      return minuteList
    },
    totalNum () {
      let totalNum = 0
      for (let i = 0; i < this.commodityList.length; i++) {
        totalNum += this.commodityList[i].commodityNum
      }
      return totalNum
    },
    totalMoney () {
      let totalMoney = 0
      for (let i = 0; i < this.commodityList.length; i++) {
        totalMoney += this.commodityList[i].totalPrices
      }
      return totalMoney.toFixed(2)
    },
    payBalance () {
      return this.blanceCheck ? (Math.min(this.totalMoney, this.userBalance)).toFixed(2) : '0.00'
    },
    leftUserBalance () {
      return (this.userBalance - parseFloat(this.payBalance)).toFixed(2)
    },
    payWechat () {
      return this.wechatCheck ? (this.totalMoney - parseFloat(this.payBalance)).toFixed(2) : '0.00'
    }
  },
  methods: {
    onButtonClick (type) {
      alert('on button click ' + type)
    },
    handleEvents (type) {
      console.log('event: ', type)
    },
    getBasketData () {
      let params = this.$route.params.idOrder && parseInt(this.$route.params.idOrder) !== -1 ? {idOrder: parseInt(this.$route.params.idOrder)} : null
      this.$api.get('order/user/getSubmitOrderinfo', params, data => {
        this.orderRecord = data.orderRecord
        this.commodityInfo = data.commodityInfo
        this.shipState = data.orderRecord.shipState
        this.userAddrMgrList = data.userAddrMgrList
        this.userBalance = data.userBalance
        this.requestTimeList = data.requestTimeList
        this.commodityList = data.commodityInfo.commodityList
        this.orderRemark = data.orderRecord.orderRemark
        this.setTime(data.requestTimeList, data.orderRecord.requireTime)
        this.phoneUser = data.userInfo.phone
        if (data.userAddrMgrList.length === 0) return
        this.defaultAddress = !data.orderRecord.idUserAddrMgr ? data.userAddrMgrList[0].poUserAddrMgr : this.getOrderAddr(data.orderRecord.idUserAddrMgr, data.userAddrMgrList)
      })
    },
    getOrderAddr (idUserAddrMgr, userAddrList) {
      for (var i = 0; i < userAddrList.length; i++) {
        if (idUserAddrMgr === userAddrList[i].poUserAddrMgr.idUserAddrMgr) return userAddrList[i].poUserAddrMgr
      }
      return userAddrList[0].poUserAddrMgr
    },
    setTime (requestTimeList, requireTime) {
      let dayList = []
      for (let i = 0; i < requestTimeList.length; i++) {
        dayList.push({name: requestTimeList[i].show_require_time, value: requestTimeList[i].send_require_time})
      }
      this.timeList = [dayList, this.hourList, this.minuteList]
      if (requireTime) {
        let day = requireTime.split(' ')[0]
        let time = requireTime.split(' ')[1]
        let hour = time.split(':')[0]
        let minute = time.split(':')[1]
        this.timePicker = [day, hour, minute]
      }
    },
    selectTime (value) {
      this.timePicker = value
      let requireTime = value[0] + ' ' + value[1] + ':' + value[2] + ':00'
      let params = {
        idOrder: parseInt(this.orderRecord.idOrder),
        requireTime
      }
      this.$api.post('order/user/order/modifyOrderInfo', params, data => {
      })
    },
    onConfirm (value) {
      console.log(value)
      this.isDelet(this.commodity, this.index)
    },
    isDelet (commodity, index) {
      let idOrder = this.orderRecord.idOrder
      let idCommoditySpecifications = commodity.idCommoditySpecifications
      let idCommodity = commodity.idCommodity
      var oldNum = commodity.commodityNum
      let commodityNum = 0
      let params = {
        idOrder,
        idCommodity,
        idCommoditySpecifications,
        commodityNum
      }
      this.$api.get('order/user/modifyShoppingInfo', params, data => {
        commodity.totalPrices = commodity.unitPrice * 0
        this.liIndex = commodity.idCommodity
        this.idSpec = commodity.idCommoditySpecifications
        this.commodityList.forEach((item, index, arr) => {
          if (commodity.idCommodity === item.idCommodity && commodity.idCommoditySpecifications === item.idCommoditySpecifications) {
            setTimeout(() => {
              this.commodityList.splice(index, 1)
              if (this.commodityList.length === 0) this.$router.go(-1)
            }, 500)
          }
        })
      }, data => {
        this.$refs.inputNum[index].currentValue = oldNum
        this.$vux.toast.text(data.message, 'middle')
      })
    },
    editNum (val, commodity, index) {
      clearTimeout(this.t)
      this.t = setTimeout(() => {
        if (val === commodity.commodityNum) return
        if (!val) {
          val = 0
//          this.show = true
        }
        this.commodity = commodity
        this.index = index
        var oldNum = commodity.commodityNum
        let idOrder = this.orderRecord.idOrder
        let idCommoditySpecifications = commodity.idCommoditySpecifications
        let idCommodity = commodity.idCommodity
        let commodityNum = val
        let params = {
          idOrder,
          idCommodity,
          idCommoditySpecifications,
          commodityNum
        }
        this.$api.get('order/user/modifyShoppingInfo', params, data => {
          console.log(data)
          if (this.shipState === 12) {
            if (!data) {
              this.$router.go(-2)
              return
            }
          }
          commodity.commodityNum = val
          commodity.totalPrices = commodity.unitPrice * val
        }, data => {
          this.$refs.inputNum[index].currentValue = oldNum
          this.$vux.toast.text(data.message, 'middle')
        })
      }, 500)
    },
    submitOrder () {
      if (!this.checkPhoneUser() || !this.inspectBeforeSubmit()) return  // 校验信息是否完整，和是否有手机号
      let requireTimeStr = this.timePicker[0] + ' ' + this.timePicker[1] + ':' + this.timePicker[2]
      let params = {
        idOrder: this.orderRecord.idOrder,
        orderRemark: this.orderRemark,
        requireTime: requireTimeStr,
        idUserAddrMgr: this.defaultAddress.idUserAddrMgr,
        channelType: 0,
        payWay: this.wechatCheck ? 1 : 0,
        isLeftMoney: this.blanceCheck ? 0 : 1
      }
      this.$api.post('order/user/order/submitOrder', params, data => {
        if (this.wechatCheck && data.wx) {
          this.activeWechatPay(data.wx, requireTimeStr)
        } else {
          this.$vux.alert.show({
            title: '结算成功',
            content: '订单将在' + requireTimeStr + '前后三十分钟送达',
            onHide: () => {
              this.$router.replace({name: 'historyOrder'})
            }
          })
        }
      })
    },
    inspectBeforeSubmit () {
      if (this.timePicker.length <= 0) {
        this.$vux.alert.show({
          title: '',
          content: '请选择收货时间'
        })
        return false
      }
      if (!this.blanceCheck && !this.wechatCheck) {
        this.$vux.alert.show({
          title: '',
          content: '请勾选支付方式'
        })
        return false
      }
      return true
    },
    activeWechatPay (wechatPayData, requireTimeStr) {
      let that = this
      WeixinJSBridge.invoke('getBrandWCPayRequest', { // eslint-disable-line
        'appId': wechatPayData.appId,
        'timeStamp': wechatPayData.timeStamp,
        'nonceStr': wechatPayData.nonceStr,
        'package': wechatPayData.packages,
        'signType': 'MD5',
        'paySign': wechatPayData.paySign
      },
      function (res) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          that.$vux.alert.show({
            title: '结算成功',
            content: '订单将在' + requireTimeStr + '前后三十分钟送达',
            onHide: () => {
              console.log(that.$router, 'aaaa')
              that.$router.replace({name: 'historyOrder'})
            }
          })
        } else {
          that.$vux.alert.show({
            title: '支付失败',
            content: '前往历史订单继续支付',
            onHide: () => {
              that.$router.replace({name: 'historyOrder'})
            }
          })
        }
      })
    },
    toSelectAddr () {
      this.checkPhoneUser() && this.$router.push({name: 'selectAddress', params: {idUserAddrMgr: this.defaultAddress.idUserAddrMgr, idOrder: this.orderRecord.idOrder}})
    },
    checkPhoneUser () {
      if (!this.phoneUser) {
        this.$vux.alert.show({
          title: '',
          content: '请先完善用户信息',
          onHide: () => {
            this.$router.push({name: 'completeInfo'})
          }
        })
        return false
      }
      return true
    }

  },
  created () {
    this.getBasketData()
  }
}

function formatMinute (d) { // 格式化分钟
  return d < 10 ? ('0' + d) : (d + '')
}
</script>

<style lang="less">
.address-cell-content span {
  margin-right: 1.5em;
  color:#000;
}
.bottom-content {
  background:#fff;
  padding:10px 30px;
  position:absolute;
  bottom:0;
  width:100%;
  box-sizing: border-box;
}
.basket-content .inputNumber{
  padding: 0;
  min-width: 102px;
}
.basket-content .inputNumber a{
  padding: 3px !important;
}
.bottom-button {
  font-size:15px !important;
}
.basket-content .radios{
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  padding-left: 45px;
}
.basket-content .radios span{
  float: left;
  width: 85%;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.vux-pop-out-enter {
  transform: translate3d(100%, 0, 0);
  transition: all 500ms;
}
.orderListContent{
  padding: 5px;
  box-sizing: border-box;
  border-bottom: 1px solid #f0f0f0;
}
.orderListContent:after{
  content: "";
  display: block;
  clear: both;
}
.orderListContent p{
  /*display: inline-block;*/
  float: left;
  font-size: 12px;
  line-height: 28px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.orderListContent p:first-child{
  width: 25%;
}
.orderListContent p:nth-child(2){
  width: 20%;
}
.orderListContent p:nth-child(3){
  width: 98px;
  text-align: center;
}
.orderListContent p:last-child{
  float: right;
  width: 18%;
  padding-right: 5px;
  text-align: left;
}
.orderListContent.title{
  width:100%;
  background: #fff;
}
.orderListContent.title p{
  font-size: 14px !important;
  font-weight: 600!important;
  background: #fff;
}
</style>


