<template>
    <div style="height:100%;">
      <view-box ref="viewBox">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
                  :left-options="{showBack: true, backText: ''}"
                  title="订单详情"
        >
        </x-header>
        <div class="orderDetail">
          <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
            <thead>
            <tr>
              <th>名称</th>
              <th>规格</th>
              <th>单价</th>
              <th>份</th>
              <th>小计(元)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item, index) in detailList" :key="index">
              <td>{{item.commodityName}}</td>
              <td>{{item.saleDescribe}}</td>
              <td>{{item.unitPrice.toFixed(2)}}</td>
              <td>{{item.commodityNum}}</td>
              <td>{{item.totalPrices.toFixed(2)}}</td>
            </tr>
            <tr class="footer">
              <td></td>
              <td></td>
              <td>合计：</td>
              <td>{{totalNumber}}</td>
              <td>{{totalMoney}}</td>
            </tr>
            </tbody>
          </x-table>
          <div class="orderOtherInfo">
            <div class="orderInfo">
              <p><span>实付款：</span><span class="price">{{totalMoney}}</span>元</p>
              <p><span>备注：</span><span class="orderRemark">{{orderRemark}}</span></p>
              <p><span>下单人：</span><span>{{contactUserName}}</span></p>
              <p><span>订单下单时间：</span><span>{{poOrderRecord.orderTime}}</span></p>
              <p><span>要求送达时间：</span><span>{{poOrderRecord.requireTime}}</span></p>
            </div>
            <div class="receiveInfo">
              <p><span>收货人：</span><span>{{poOrderRecord.receiveUser}}</span></p>
              <p><span>收货人手机号：</span><span>{{poOrderRecord.receivePhone}}</span></p>
              <p><span>收货地址：</span><span>{{poOrderRecord.receivePlace}}</span></p>
            </div>
            <div class="payAndCancel">
              <x-button slot="right" type="primary" mini @click.native="payOn" :disabled="payOnDisable">继续支付</x-button>
              <x-button slot="right" type="primary" mini @click.native="cancelPay" :disabled="cancelDisable">取消订单</x-button>
            </div>
          </div>
          <div v-transfer-dom>
            <alert v-model="alertShow" title="温馨提示" @on-hide="dosome" :content="alertMsg"></alert>
          </div>
          <div v-transfer-dom>
            <confirm v-model="show"
                     title="温馨提示"
                     @on-confirm="onConfirm"
            >
              <p style="text-align:center;">您确定要取消订单吗？</p>
            </confirm>
          </div>
        </div>
      </view-box>
    </div>
</template>

<script>
  import { ViewBox, XHeader, XTable, XButton, Alert, Confirm, TransferDomDirective as TransferDom } from 'vux'

  export default {
    name: 'orderDetail',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      XTable,
      XButton,
      Alert,
      Confirm
    },
    data () {
      return {
        detailList: '',
        totalMoney: '',
        totalNumber: '',
        poOrderRecord: '',
        orderRemark: '',
        contactUserName: '',
        alertShow: false,
        alertMsg: '',
        show: false,
        shipState: '',
        payOnDisable: true, // 继续支付是否可点
        cancelDisable: true // 取消按钮是否可点
      }
    },
    computed: {},
    created () {
      this.getData()
    },
    methods: {
      payOn () {
        this.$router.push({name: 'basket', params: {idOrder: this.poOrderRecord.idOrder}})
      },
      cancelPay () {
        console.log('取消支付')
        this.show = true
      },
      onConfirm () {
        this.$api.post('order/user/order/cancelOrder', {idOrder: this.poOrderRecord.idOrder}, (res) => {
          this.alertMsg = '取消成功！'
          this.alertShow = true
        })
      },
      dosome () {
        this.$router.go(-1)
//        this.$router.push({name: 'historyOrder'})
      },
      getData () {
        var obj = {
          idOrder: this.$route.params.id
        }
        this.$api.get('order/user/order/getOrderInfo', obj, (res) => {
          this.detailList = res.detailList
          this.totalNumber = res.totalNumber
          this.poOrderRecord = res.poOrderRecord
          this.orderRemark = res.poOrderRecord.orderRemark
          this.contactUserName = res.userInfo.contactUserName
          this.totalMoney = this.poOrderRecord.totalMoney.toFixed(2)
          this.poOrderRecord.orderTime = this.formatTime(res.orderTimeLong)
          this.poOrderRecord.requireTime = this.formatTime(res.requireTimeLong) + '(前后30分钟送达)'
          this.shipState = res.poOrderRecord.shipState
          if (this.shipState === 1 || this.shipState === 2 || this.shipState === 11 || this.shipState === 12) {
            this.cancelDisable = false
          } else {
            this.cancelDisable = true
          }
          if (this.shipState === 2 || this.shipState === 11 || this.shipState === 12) {
            this.payOnDisable = false
          } else {
            this.payOnDisable = true
          }
        })
      },
      formatTime (time) {
        var tempTime = new Date(time)
        var tempWeek = tempTime.getDay()
        switch (tempWeek) {
          case 0 :
            tempWeek = '周日 '
            break
          case 1 :
            tempWeek = '周一 '
            break
          case 2 :
            tempWeek = '周二 '
            break
          case 3 :
            tempWeek = '周三 '
            break
          case 4 :
            tempWeek = '周四 '
            break
          case 5 :
            tempWeek = '周五 '
            break
          case 6 :
            tempWeek = '周六 '
            break
        }
        time = this.formatDate(tempTime.getMonth() + 1) + '-' + this.formatDate(tempTime.getDate()) + ' ' + tempWeek + this.formatDate(tempTime.getHours()) + ':' + this.formatDate(tempTime.getMinutes())
        return time
      },
      formatDate (t) {
        return t < 10 ? '0' + t : t
      }
    }
  }
</script>

<style>
  .orderDetail{
    margin: 10px;
    padding: 0 10px 10px 10px;
    border-radius: 5px;
    background: #fff;
  }
  .orderDetail table{
    width: 100% !important;
  }
  .orderDetail th,
  .orderDetail td{
    font-size: 12px;
    text-align: right !important;
  }
  .orderDetail th:first-child,
  .orderDetail td:first-child{
    text-align: left !important;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    font-size: 12px;
    min-width: 60px;
    max-width: 100px;
  }
  .orderDetail th:nth-child(2),
  .orderDetail td:nth-child(2){
    text-align: left !important;
  }
  .orderDetail td:nth-child(3){
    color: #6bb93e !important;
  }
  .orderDetail th:nth-child(3),
  .orderDetail td:nth-child(3){
    text-align: center !important;
  }
  .orderDetail .vux-table:after{
    display: none !important;
  }
  .orderDetail tbody tr:last-child{
    border-top: 1px solid #f0f0f0;
  }
  .orderDetail tr:last-child td:before{
    display: none !important;
  }
  .orderOtherInfo{
    font-size: 14px;
  }
  .orderOtherInfo .price{
    color: #6bb93e;
  }
  .orderOtherInfo .orderRemark{
    color: #b60f1b;
  }
  .receiveInfo{
    margin: 20px 0;
  }
#vux_view_box_body{
  padding-top: 46px;
}
  .payAndCancel{
    text-align: center;
  }
  .payAndCancel button{
    width: 40% !important;
    margin: 0 10px;
  }
</style>
