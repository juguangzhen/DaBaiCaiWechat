<template>
  <div style="height:100%;">
    <x-header :left-options="{backText: ''}">我的账户</x-header>
    <group>
      <cell title="现金余额" is-link link="/consumeDetail">&yen; {{myAccount.accountBalance}}</cell>
      <cell title="索要发票" is-link link="/invoice">可开发票金额：&yen; {{myAccount.canReceipt}}</cell>
      <cell title="充值" class="recharge"></cell>
      <cell is-link link="/wechatRecharge" class="wechatPay">
        <img src="../../../static/img/wechatPay.png" alt="">
        <span>微信充值</span>
      </cell>
    </group>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Group, Cell } from 'vux'
  export default {
    name: 'myAccount',
    components: {
      ViewBox,
      XHeader,
      Group,
      Cell
    },
    data () {
      return {
        myAccount: ''
      }
    },
    computed: {
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('order/user/getAccountInfo', null, (res) => {
          console.log(res)
          this.myAccount = res
        })
      }
    }
  }
</script>

<style>
  .vux-header{
    background: #51C332 !important;
  }
  .weui-cells{
    background: #f0f0f0 !important;
  }
  .weui-cell{
    background: #fff;
  }
  .recharge{
    margin-top: 10px;
  }
  .wechatPay>.weui-cell__ft{
    width: 100%;
  }
  .wechatPay img{
    width: 20px;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>


