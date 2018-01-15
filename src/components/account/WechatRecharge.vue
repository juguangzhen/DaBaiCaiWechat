<template>
    <div style="height:100%;">
      <x-header :left-options="{backText: ''}">微信充值</x-header>
      <div class="box">
        <checker v-model="money" radio-required default-item-class="moneyItem" selected-item-class="moneyItemSelected">
          <checker-item v-for="(item, index) in rechargeNumber" :key="index" :value="item.rechargeAccount">{{ item.rechargeAccount }}</checker-item>
        </checker>
      </div>
      <div>
        <x-button type="primary" @click.native="doSome">立即充值</x-button>
      </div>
      <div v-transfer-dom>
        <alert v-model="show" title="温馨提示">请选择充值金额</alert>
      </div>
    </div>
</template>

<script>
  import { ViewBox, XHeader, Checker, CheckerItem, XButton, Alert, TransferDomDirective as TransferDom } from 'vux'

  export default {
    name: 'wechatRecharge',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Checker,
      CheckerItem,
      XButton,
      Alert
    },
    data () {
      return {
        money: '',
        show: false,
        rechargeNumber: ''
      }
    },
    computed: {},
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('user/rechargePrice/getList', null, (res) => {
          this.rechargeNumber = res
        })
      },
      doSome () {
        if (!this.money) {
          this.show = true
        } else {
          console.log(this.money)
          this.$api.post('order/user/weichat_pay/js_api_pay', {totalFee: this.money}, (res) => {
            this.activeWechatPay(res)
          })
        }
      },
      activeWechatPay (wechatPayData) {
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
              title: '恭喜您',
              content: '充值成功',
              onHide: () => {
              }
            })
          } else {
            that.$vux.alert.show({
              title: '温馨提示',
              content: '支付失败！',
              onHide: () => {
              }
            })
          }
        })
      }
    }
  }
</script>

<style scoped>
  .vux-header{
    background: #51C332 !important;
  }
  button.weui-btn, input.weui-btn{
    width: 90%;
    background: #00A0E9;
  }
  .box,
  .vux-checker-box{
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
  .moneyItem {
    border: 1px solid #ececec;
    padding: 5px 15px;
    text-align: center;
    width: 31%;
    margin: 1%;
    box-sizing: border-box;
  }
  .moneyItemSelected {
    color: #51C332;
    border: 1px solid #51C332;
  }
</style>
