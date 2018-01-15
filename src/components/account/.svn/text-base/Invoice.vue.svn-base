<template>
  <div style="height:100%;">
    <view-box ref="viewBox">
      <x-header slot="header"
                style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
                :left-options="{showBack: true, backText: ''}"
                title="索要发票"
                @on-click-more="goInvoiceHis"
      >
        <a slot="right" style="color: #fff;" @click="goInvoiceHis">开票记录</a>
      </x-header>
      <div class="invoceHead">
        <p>*1.家元卡部分的发票需要在购买家元卡时申请，不可在线申请；</p>
        <!--<p>*2.活动经费表示家乐宝赠送的费用，不可申请发票；</p>-->
        <p>*2.其它线上现金支付或充值的部分，可以在线申请发票。</p>
        <div class="moneyinfo">
          <ul>
            <li>充值总额</li>
            <li>消费总额</li>
            <!--<li>活动费用</li>-->
            <li>历史开票</li>
            <li><span>{{moneyInfo.totalRecharge}}</span>元</li>
            <li><span>{{moneyInfo.totalCostAmount}}</span>元</li>
            <!--<li>{{moneyInfo.xxx}}</li>-->
            <li><span>{{moneyInfo.hisTotalReceipt}}</span>元</li>
          </ul>
        </div>
      </div>
      <p class="canReceipt">(可开票金额：{{moneyInfo.canReceipt}}元)</p>
      <div class="invoiceInfo">
        <group label-width="4.5em" label-margin-right="1em" label-align="right">
          <x-input title="开票金额" placeholder="开票金额最多两位小数" v-model="invoiceMoney" :show-clear="false" class="invoiceMoney"></x-input>
          <popup-picker title="发票类型" :data="invoiceType" v-model="typeCurren" value-text-align="left" class="typeCurren" @on-change="sele"></popup-picker>
          <popup-picker title="发票内容" :data="invoiceContent" v-model="contCurren" value-text-align="left" class="contCurren"></popup-picker>
          <x-input title="发票抬头" placeholder="请输入发票抬头" v-model="invoiceHeader" :show-clear="false" class="invoiceHeader"></x-input>
          <x-input title="发票税号" v-show="isCompany" placeholder="请输入发票税号" :show-clear="false" v-model="tallageNumber" class="invoiceHeader"></x-input>
          <x-input title="公司地址" placeholder="请输入公司地址" v-model="companyAddress" :show-clear="false" class="invoiceHeader"></x-input>
          <popup-picker title="地址" :data="invoiceAddress" v-model="addrCurren" value-text-align="left" class="invoiceAddress"></popup-picker>
        </group>
        <x-button type="primary" @click.native="subinvoice" class="subInvoice">
          提交
        </x-button>
      </div>
      <div v-transfer-dom>
        <alert v-model="alertShow" title="温馨提示" :content="alertMsg" @on-hide="goEditAddr"></alert>
      </div>
      <div v-transfer-dom>
        <alert v-model="inoviceSuccess" title="温馨提示" :content="inoviceSuccessMsg" @on-hide="goInvoiceHis"></alert>
      </div>
    </view-box>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Group, PopupPicker, XInput, XButton, Alert, TransferDomDirective as TransferDom } from 'vux'

  export default {
    name: 'invoice',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Group,
      PopupPicker,
      XInput,
      XButton,
      Alert
    },
    data () {
      return {
        moneyInfo: '', // 保存用户充值金额和可开票金额
        alertShow: false, // 弹窗状态
        alertMsg: ' ', // 弹窗内容
        invoiceType: [['公司', '个人']], // 发票类型，0公司，1,个人
        invoiceContent: [['食品', '日用品']], // 发票内容，0食品，1日用品
        invoiceAddress: [], // 用户选择的收票地址
        typeCurren: [], // 发票类型
        addrCurren: [], // 用户选择的地址
        contCurren: [], // 用户选择的发票内容
        invoiceMoney: '', // 发票金额
        invoiceHeader: '', // 发票抬头
        bankName: '', // 开户银行
        backNumber: '', // 开户账号
        tallageNumber: '', // 税号
        isCompany: false, // 是不是公司
        companyAddress: ' ', // 票面公司地址
        inoviceSuccess: false, // 申请成功弹窗
        inoviceSuccessMsg: '申请成功',
        idReceipt: ''
      }
    },
    computed: {},
    created () {
      this.getData()
    },
    methods: {
      goEditAddr () {},
      sele () {
        if (this.typeCurren[0] === '公司') {
          this.isCompany = true
        } else {
          this.isCompany = false
        }
      },
      subinvoice () {
        if (!this.invoiceMoney || !/^\d{0,8}\.{0,1}(\d{1,2})?$/.test(this.invoiceMoney)) {
          this.alertMsg = '请输入正确的开票金额'
          this.alertShow = true
          return
        }
        if (this.typeCurren.length !== 1) {
          this.alertMsg = '请选择发票类型'
          this.alertShow = true
          return
        }
        if (this.contCurren.length !== 1) {
          this.alertMsg = '请选择发票内容'
          this.alertShow = true
          return
        }
        if (!this.invoiceHeader) {
          this.alertMsg = '请输入发票抬头'
          this.alertShow = true
          return
        }
        if (!this.companyAddress || this.companyAddress.toString().trim().length === 0) {
          this.alertMsg = '请输入公司地址'
          this.alertShow = true
          return
        }
        if (this.addrCurren.length !== 1 || this.addrCurren[0] === undefined) {
          this.alertMsg = '请选择地址'
          this.alertShow = true
          return
        }
        if (this.isCompany) {
          if (!this.tallageNumber || !/^[0-9a-zA-Z]+$/.test(this.tallageNumber)) {
            this.alertMsg = '请输入税号'
            this.alertShow = true
            return
          }
        }
        var obj = {
          idReceipt: this.idReceipt,
          receiptPrice: this.invoiceMoney, // 发票金额
          receiptKind: this.contCurren[0] === '食品' ? '0' : '1', // 发票内容
          receiptType: this.typeCurren[0] === '公司' ? '0' : '1', // 发票类型
          receiptTitle: this.invoiceHeader, // 发票抬头
          receiptAddr: this.addrCurren[0], // 收票地址
          companyAddress: this.companyAddress, // 公司地址
          tallageNumber: this.tallageNumber // 税号
        }
        if (!this.idReceipt) {
          this.$api.post('user/user/receipt/apply', obj, (res) => {
            this.inoviceSuccess = true // 弹窗
          })
        } else {
          this.$api.post('user/user/receipt/modify', obj, (res) => {
            this.inoviceSuccessMsg = '修改成功!'
            this.inoviceSuccess = true // 弹窗
          })
        }
      },
      goInvoiceHis () {
        this.$router.push({name: 'inoviceHistory'})
      },
      getData () {
        if (this.$route.query.poUserReceipt) {
          console.log(this.$route.query, 'aa')
          var poUserReceipt = this.$route.query.poUserReceipt
          this.invoiceMoney = poUserReceipt.receiptPrice // 发票金额
          this.invoiceHeader = poUserReceipt.receiptTitle // 发票抬头
          this.companyAddress = poUserReceipt.companyAddress // 公司地址
          this.typeCurren[0] = poUserReceipt.receiptType === 0 ? '公司' : '个人'
          this.contCurren[0] = poUserReceipt.receiptContent === 0 ? '食品' : '日用品'
          this.tallageNumber = poUserReceipt.tallageNumber
          this.addrCurren[this.addrCurren.length] = poUserReceipt.receiptAddr
          this.idReceipt = poUserReceipt.idReceipt
          if (poUserReceipt.receiptType === 0) {
            this.isCompany = true
          }
//          this.invoiceAddress[0] = poUserReceipt.receiptAddr // 收票地址
        }
        this.$api.get('order/user/getAccountInfo', null, (res) => {
          this.moneyInfo = res
        })
        this.$api.get('user/user/addr/getAddrList', null, (res) => {
          if (res.addrList.length === 0) {
            this.alertMsg = '请先添加一个收货地址!'
            this.alertShow = true // 弹窗
            this.goEditAddr = () => {
              this.$router.push({name: 'editAddress', params: {idUserAddrMgr: -1}})
            }
            return
          }
          let addlist = []
          res.addrList.forEach((item, index, arr) => {
            addlist.push(item.poUserAddrMgr.addDesc)
          })
          this.invoiceAddress.push(addlist)
        })
      }
    }
  }
</script>

<style scoped>
.invoceHead{
  padding: 10px;
  font-size: 12px;
  color: #aaa;
}
.canReceipt{
  font-size: 12px;
  padding-left: 10px;
  color: #aaa;
}
#vux_view_box_body{
  padding-top: 46px !important;
}
  .moneyinfo:after{
    content: '';
    display: block;
    clear: both;
  }
  .moneyinfo{
    box-sizing: border-box;
    margin: 0 5px;
    padding: 10px;
    border-radius: 5px;
    background: #fff;
  }
  .moneyinfo ul li{
    color: #000;
    font-size: 14px;
    line-height: 30px;
    list-style-type: none;
    text-align: center;
    float: left;
    width: 33%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .moneyinfo ul li span{
    color: #51C332;
  }
  .invoiceAddress .vux-tap-active.weui-cell_access{
    height: 21px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
  .invoiceMoney,
  .typeCurren,
  .contCurren,
  .invoiceAddress{
    margin-top: 1px !important;
  }
.subInvoice{
  width: 90%;
  margin-top: 20px;
}

</style>
