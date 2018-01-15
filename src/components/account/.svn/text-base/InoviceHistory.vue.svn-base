<template>
    <div style="height:100%;">
      <view-box ref="viewBox">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
                  :left-options="{showBack: true, backText: ''}"
                  title="开票记录"
        >
        </x-header>
        <div class="inoviceListContent" ref="inoviceHistory">
          <!--<transition name="vux-pop-out">-->
          <ul>
              <li v-for="(item, index) in inoviceList" :key="index" style="height: 100px" v-show="!item.isShow">
                <p class="inoviceTime">{{item.poUserReceipt.applyTime}}</p>
                <div class="inoviceDetail">
                  <ul>
                    <li>开票金额：&yen;{{item.poUserReceipt.receiptPrice}}</li>
                    <li>发票抬头：{{item.poUserReceipt.receiptTitle}}</li>
                    <li>发票类型：{{item.poUserReceipt.receiptKind === 0? '食品':'日用品'}}</li>
                    <li>发票种类：{{item.poUserReceipt.receiptType === 0? '公司':'个人'}}</li>
                    <li v-show="item.poUserReceipt.receiptType === 0">税号：{{item.poUserReceipt.tallageNumber}}</li>
                    <li>公司地址：{{item.poUserReceipt.companyAddress}}</li>
                    <li>地址：{{item.poUserReceipt.receiptAddr}}</li>
                    <div class="inoviceState" :class="item.poUserReceipt.receiptState === 0 ?'ing':item.poUserReceipt.receiptState === 1?'sucess':'failed'">{{item.poUserReceipt.receiptState === 0 ?'申请中':item.poUserReceipt.receiptState === 1?'已开票':'失败'}}</div>
                  </ul>
                </div>
                <p class="inoviceFooter"><button @click="changeReceipt(item)" :disabled="item.poUserReceipt.receiptState !== 0">修改</button><button @click="cancelReceipt(item)" :disabled="item.poUserReceipt.receiptState !== 0">取消</button></p>
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
            <div v-show="inoviceListNull">您还没有开票记录</div>
            <divider v-show="!pullUpLoad && !inoviceListNull">我是有底线的</divider>
          </ul>
          <!--</transition>-->
          <div v-transfer-dom>
            <confirm v-model="show"
                     title="您确定取消开发票吗？"
                     @on-confirm="onConfirm"
                     >
              <p style="text-align:center;">确定后金额将返还到您的可开票金额</p>
            </confirm>
          </div>
          <div v-transfer-dom>
            <alert v-model="sucessShow" title="温馨提示" content="提交成功"></alert>
          </div>
        </div>
      </view-box>
    </div>
</template>

<script>
  import { ViewBox, XHeader, Divider, Confirm, Alert, TransferDomDirective as TransferDom } from 'vux'
  import BScroll from 'better-scroll'
  import Loading from '../common/loading/loading.vue'

  export default {
    name: 'inoviceHistory',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Loading,
      Divider,
      Confirm,
      Alert
    },
    data () {
      return {
        inoviceList: '',
        pullUpTxt: '上拉加载更多...',
        isPullUpLoad: false,
        pullUpLoad: true, // 初始化分页状态
        inoviceListBegin: 0,
        inoviceListLength: 20,
        show: false,
        sucessShow: false,
        tempId: '',
        inoviceListNull: false
      }
    },
    mounted () {
      this.$nextTick(function () {
        this.inoviceHistory = new BScroll(this.$refs.inoviceHistory, {
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
      getData () {
        this.$api.get('user/user/receipt/getList', {begin: this.inoviceListBegin, length: this.inoviceListLength}, (res) => {
          console.log(res)
          this.inoviceListBegin += this.inoviceListLength
          if (res.receiptList.length < this.inoviceListLength) {
            this.pullUpLoad = false
            this.isPullUpLoad = true
          }
          this.inoviceList = res.receiptList
          if (res.receiptList.length === 0) this.inoviceListNull = true
        })
      },
      _initPullUpLoad () {
        this.inoviceHistory.on('pullingUp', () => { // 上拉加载事件
          if (!this.pullUpLoad) return // 如果加载完了，取消分页
          this.$api.get('user/user/receipt/getList', {begin: this.inoviceListBegin, length: this.inoviceListLength}, (res) => {
            this.inoviceListBegin += this.inoviceListLength
            this.inoviceListBegin += this.inoviceListLength // 加载数据完成后，累加起始位置
            if (res.receiptList.length < this.inoviceListLength) {
              this.pullUpLoad = false
              this.isPullUpLoad = true
            }
            this.inoviceList = this.inoviceList.concat(res.receiptList) // 拼接数据
            this.inoviceHistory.finishPullUp() // 完成上拉事件
            this.inoviceHistory.refresh() // 渲染
            this.$emit('pullingUp')
          })
        })
      },
      cancelReceipt (id) {
        this.tempId = id
        this.show = true
      },
      changeReceipt (item) {
        console.log(item)
//        var obj = {
//          idReceipt: item.poUserReceipt.idReceipt,
//          receiptPrice: item.poUserReceipt.receiptPrice,
//          receiptContent: item.poUserReceipt.receiptContent,
//          receiptType: item.poUserReceipt.receiptType,
//          receiptTitle: item.poUserReceipt.receiptTitle,
//          receiptAddr: item.poUserReceipt.receiptAddr,
//          tallageNumber: item.poUserReceipt.tallageNumber
//        }
        this.$router.push({name: 'invoice', query: item})
      },
      onConfirm () {
        this.$api.post('user/user/receipt/cancel', {idReceipt: this.tempId.poUserReceipt.idReceipt}, (res) => {
          this.tempId.isShow = true
          this.sucessShow = true
        })
      }
    }
  }
</script>

<style>
.inoviceListContent{
  height: 100%;
  font-size: 14px;
}
  .inoviceListContent>ul>li{
    height: auto !important;
    margin: 10px;
    background: #fff;
    border:1px solid #f0f0f0;
    border-radius: 5px;
  }
  .inoviceListContent .inoviceTime{
    margin: 0 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .inoviceListContent .inoviceTime{
    padding-top: 5px;
  }
  .inoviceDetail{
    /*border-top: 1px solid #ccc;*/
    padding: 5px 0 0 10px;
    border-bottom: 1px solid #f0f0f0;
  }
  .inoviceDetail ul{
    list-style: none;
    position: relative;
    overflow: hidden;
  }
  .inoviceDetail .inoviceState{
    position: absolute;
    bottom: 15px;
    right: -120px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    width: 300px !important;
    font-size: 16px;
    font-weight: 400;
    text-align: center;
    background: #51C332;
    transform: rotate(-45deg);
    z-index:9999;
  }
  .inoviceDetail .inoviceState.failed{
    background: #db2330;
  }
  .inoviceDetail .inoviceState.ing{
    background: #66c;
  }
  .inoviceFooter:after{
    content: '';
    display: block;
    clear: both;
  }
  .inoviceFooter{
    padding: 5px 10px;
  }
  .inoviceFooter button{
    float: right;
    display: block;
    margin: 0 5px;
    width: 80px;
    background: #fff;
    border:1px solid #ccc;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    height: 30px;
    line-height: 30px;
  }
</style>
