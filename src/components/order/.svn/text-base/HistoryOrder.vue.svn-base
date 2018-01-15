<template>
    <div style="height:100%;">
      <view-box ref="viewBox">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
                  :left-options="{showBack: true, backText: ''}"
                  title="历史订单"
        >
        </x-header>
        <div class="orderList"  ref="orderList">
          <ul>
            <li v-for="(item, index) in historyOrder" :key="index" @click.native="goOrderDetail(item.poOrderRecord.idOrder)">
              <group @click.native="goOrderDetail(item.poOrderRecord.idOrder)">
                <cell :title="item.orderTimeLong"><span class="historyPayType">{{item.poOrderRecord.shipState}}</span></cell>
                <cell :title="'订单号:'+item.poOrderRecord.idOrder" is-link>
                  总价：{{item.poOrderRecord.totalMoney.toFixed(2)}}
                </cell>
                <!--<button @click.native="goOrderDetail(item.poOrderRecord.idOrder)" class="goOrderDetail"></button>-->
              </group>
            </li>
            <slot name="pullup"
                  :pullUpLoad="pullUpLoad"
                  :isPullUpLoad="isPullUpLoad"
            >
              <div class="pullup-wrapper" v-if="pullUpLoad">
                <div class="before-trigger" v-if="!isPullUpLoad">
                  <span>{{pullUpTxt}}</span>
                </div>
                <div class="after-trigger" v-else>
                  <loading></loading>
                </div>
              </div>
            </slot>
          </ul>
          <div v-show="showEmpty" class="showEmpty">订单空空，快去下单吧~(@^_^@)</div>
        </div>
      </view-box>
    </div>
</template>

<script>
import { ViewBox, XHeader, Cell, Group } from 'vux'
import BScroll from 'better-scroll'
import Loading from '../common/loading/loading.vue'
export default {
  name: 'historyOrder',
  components: {
    ViewBox,
    XHeader,
    Cell,
    Group,
    Loading
  },
  data () {
    return {
      historyOrder: '', // 历史订单
      pullUpTxt: '正在加载...',
      isPullUpLoad: false,
      showEmpty: false,
      pullUpLoad: true, // 初始化分页状态
      orderListBegin: 0, // 数据起始位置
      orderListLength: 20 // 分页数据长度
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.orderList = new BScroll(this.$refs.orderList, {
        click: true,
        pullUpLoad: {
          threshold: -20
        }
      })
//      this._initPullDownRefresh() // 下拉刷新
      this._initPullUpLoad() // 上拉加载更多
    })
  },
  computed: {},
  created () {
    this.getData()
  },
  methods: {
    goOrderDetail (id) {
      this.$router.push({name: 'orderDetail', params: {id: id}})
    },
    _initPullUpLoad () {
      this.orderList.on('pullingUp', () => { // 上拉加载事件
        if (!this.pullUpLoad) return // 如果加载完了，取消分页
        var obj = {
          begin: this.orderListBegin,
          length: this.orderListLength
        }
        this.$api.get('order/user/order/getHisOrderList', obj, (res) => {
          this.orderListBegin += this.orderListLength // 加载数据完成后，累加起始位置
          if (res.orderList.length < this.orderListLength) {
            this.pullUpLoad = false
            this.isPullUpLoad = true
          }
          this.changeShipState(res.orderList) // 格式化订单支付状态
          this.changeOrderTime(res.orderList) // 格式化订单时间
          this.historyOrder = this.historyOrder.concat(res.orderList) // 拼接数据
          this.orderList.finishPullUp() // 完成上拉事件
          this.$emit('pullingUp')
          setTimeout(() => {
            this.orderList.refresh() // 延时渲染
          }, 100)
        })
      })
    },
    getData () {
      var obj = {
        begin: this.orderListBegin,
        length: this.orderListLength
      }
      this.$api.get('order/user/order/getHisOrderList', obj, (res) => {
        if (res.orderList.length === 0) {
          this.showEmpty = true
        }
        if (res.orderList.length < this.orderListLength) {
          this.pullUpLoad = false // 如果长度不够分页，则取消
          this.isPullUpLoad = true
        }
        this.orderListBegin += this.orderListLength // 加载完成后累加起始位置
        this.historyOrder = res.orderList // 赋值
        this.changeShipState(this.historyOrder) // 格式化订单支付状态
        this.changeOrderTime(this.historyOrder) // 格式化订单时间
      })
    },
    changeShipState (orderList) {
      orderList.forEach((item, index, arr) => {
        switch (item.poOrderRecord.shipState) {
          case 0:
            item.poOrderRecord.shipState = '已出货'
            break
          case 1:
            item.poOrderRecord.shipState = '已支付'
            break
          case 2:
            item.poOrderRecord.shipState = '未支付'
            break
          case 3:
            item.poOrderRecord.shipState = '配货中'
            break
          case 4:
            item.poOrderRecord.shipState = '已确认'
            break
          case 11:
            item.poOrderRecord.shipState = '修改中'
            break
          case 12:
            item.poOrderRecord.shipState = '支付中'
            break
        }
      })
    },
    changeOrderTime (orderList) {
      orderList.forEach((item, index, arr) => {
        var tempTime = new Date(item.orderTimeLong)
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
        item.orderTimeLong = this.formatDate(tempTime.getMonth() + 1) + '-' + this.formatDate(tempTime.getDate()) + ' ' + tempWeek + this.formatDate(tempTime.getHours()) + ':' + this.formatDate(tempTime.getMinutes())
      })
    },
    formatDate (t) {
      return t < 10 ? '0' + t : t
    }
  }
}
</script>

<style>
  .vux-header{
    background: #51C332;
  }
  #vux_view_box_body{
    padding-top: 46px !important;
  }
  .historyPayType{
    color: #f5a623;
  }
  .orderList{
    height: 100%;
  }
  .orderList li{
    line-height: 1;
    height: 82px;
    margin-top: 20px;
    position: relative;
    width: 100%;
  }
  .orderList li>div{
    width: 100%;
    position: absolute;
    top:0;
  }
  .orderList .goOrderDetail{
    position: absolute;
    top:0;
    width: 100%;
    height: 100%;
    opacity: 0;
  }
  .orderList .vux-no-group-title{
    margin: 0;
  }
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px 0;
  }
  .showEmpty{
    text-align: center;
  }
</style>
