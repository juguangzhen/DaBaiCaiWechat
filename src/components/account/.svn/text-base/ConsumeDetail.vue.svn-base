<template>
    <div style="height:100%;" class="consumeDetail">
      <view-box ref="viewBox">
        <x-header slot="header"
                  style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
                  :left-options="{showBack: true, backText: ''}"
                  title="消费详情"
        >
        </x-header>
        <div class="header">
          <div class="leftmoney">
            <span>现金余额</span>
            <span>&yen; {{myAccount.accountBalance}}</span>
          </div>
          <div class="totalCostAmount">
            <span>消费总额</span>
            <span>&yen; {{myAccount.totalCostAmount}}</span>
          </div>
        </div>
        <div class="conEcharts">
          <div class="echartHeader">
            <button class="left" @click="reduceConMonth">&lt;</button>
            <span class="time">{{conYear}}年{{conMonth<10?'0'+conMonth:conMonth}}月</span>
            <button class="right" @click="plusConMonth">&gt;</button>
          </div>
          <div class="echartContent">
            <div id="myChart" :style="canvasWH"></div>
          </div>
        </div>
        <div class="conList">
          <div class="conListHeader">
            <p>月总消费 <br> <span>&yen; {{monthInfo.totalMonthConsume}}</span></p>
            <p>月总单数 <br> <span>{{monthInfo.monthOrderNumber}}</span></p>
          </div>
          <div class="conListContent">
            <x-table :cell-bordered="false" :content-bordered="false" style="background-color:#fff;">
              <thead>
              <tr>
                <th>时间</th>
                <th>交易金额</th>
                <th>备注/订单号</th>
                <th>用户名</th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="(item, index) in monthInfo.accountMonthList" :key="index">
                <td><span :class="item.poUserAccountBalanceRecord.amount>0?'plus':'negative'">• </span>{{item.poUserAccountBalanceRecord.insertTime}}</td>
                <td :class="item.poUserAccountBalanceRecord.amount>0?'plus':'negative'">{{item.poUserAccountBalanceRecord.amount.toFixed(2)}}</td>
                <td>{{item.poUserAccountBalanceRecord.remark}}</td>
                <td>{{item.operName}}</td>
              </tr>
              </tbody>
            </x-table>
          </div>
        </div>
      </view-box>
    </div>
</template>

<script>
import { ViewBox, XHeader, XTable } from 'vux'

export default {
  name: '',
  components: {
    ViewBox,
    XHeader,
    XTable
  },
  data () {
    return {
      myAccount: '', // 账户余额信息
      conYear: '', // 年份
      conMonth: '', // 月份
      categoryName: [], // 分类名字
      categoryList: [], // 列表
      myChart: '',
      canvasWH: window.screen.availWidth * 0.8 + 'px;height:' + (window.screen.availWidth * 0.8) * 0.8 + 'px',
      option: '',
      monthOrderNumber: '', // 月总单数
      totalMonthConsume: '', // 月总金额
      monthInfo: ''
    }
  },
  computed: {},
  created () {
    this.getData()
    this.conYear = new Date().getFullYear()
    this.conMonth = new Date().getMonth() + 1
    this.getConList(this.conYear, this.conMonth)
  },
  mounted () {
    this.myChart = this.echarts.init(document.getElementById('myChart'))
    this.myChart.title = '环形图'
  },
  methods: {
    getData () {
      this.$api.get('order/user/getAccountInfo', null, (res) => {
        this.myAccount = res
      })
    },
    getConList (y, m) {
      this.$api.get('order/user/getUserConsumeToMonth', {year: y, month: m}, (res) => {
        console.log(res)
        this.monthInfo = res
        this.monthInfo.accountMonthList.forEach((item, index, arr) => {
          this.monthInfo.accountMonthList[index].poUserAccountBalanceRecord.insertTime = this.formatTime(this.monthInfo.accountMonthList[index].timeLong)
        })
        this.categoryList = []
        this.categoryName = []
        if (res.categoryList.length === 0) {
          res.categoryList = [{name: '空', value: 0}]
        }
        this.categoryList = res.categoryList
        this.categoryList.forEach((item, index, arr) => {
          this.categoryName.push(item.name)
        })
        this.myChart.setOption({
          title: {
            text: '当月消费明细', // 图表标题
            textStyle: { // 标题样式
              fontSize: 12,
              fontWeight: 200,
              align: 'left'
            }
          },
          animationDurationUpdate: 1000,
          color: ['#FF9329', '#F3ABC3', '#C3BED4', '#FD5B78', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
          backgroundColor: '#fff',
          legend: { // 图表下方分类信息
            x: 'center',
            y: 'bottom',
            data: this.categoryName
          },
          series: [
            {
              type: 'pie', // 图表样式
              radius: ['40%', '60%'], // 图表内圈和外圈尺寸
              center: ['50%', '47%'], // 图形中心所在位置
              hoverOffset: 3, // 点击或者悬停后偏移的尺寸
              label: { // 分区信息
                normal: {
                  show: true,
                  formatter: '{b}{d}%\n金额：{c}' // 模板变量 {a}、{b}、{c}、{d}，分别表示系列名，数据名，数据值，百分比。
                  // position: 'center' // 显示位置，默认在边缘显示 'outside' 'inside' 'center'
                },
                emphasis: { // 标签内容
                  show: true,
                  textStyle: {
                    fontSize: '12', // 点击或者悬停后字体大小
                    color: '#51C332',
                    fontWeight: 'bold' // 加粗类型
                  }
                }
              },
              labelLine: { // 标签线条
                normal: {
                  show: true,
                  length: 10, // 第一条线长度
                  length2: 5 // 第二条线长度
                }
              },
              data: this.categoryList
            }
          ]
        })
      })
    },
    plusConMonth () {
      if (this.conYear === new Date().getFullYear() && this.conMonth === new Date().getMonth() + 1) { // 超出当前时间，提示用户并返回
        this.$vux.toast.text('超出当前时间！！')
        return
      }
      this.conMonth++
      if (this.conMonth === 13) { // 如果等于12，则年份加1
        this.conMonth = 1
        this.conYear += 1
      }
      this.getConList(this.conYear, this.conMonth)
    },
    reduceConMonth () {
      this.conMonth--
      if (this.conMonth === 0) {
        this.conMonth = 12
        this.conYear -= 1
      }
      this.getConList(this.conYear, this.conMonth)
    },
    formatTime (T) {
      var tempTime = new Date(T)
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
      var month = (tempTime.getMonth() + 1) < 10 ? '0' + (tempTime.getMonth() + 1) : (tempTime.getMonth() + 1)
      var date = (tempTime.getDate()) < 10 ? '0' + tempTime.getDate() : tempTime.getDate()
      return month + '-' + date + tempWeek
    }
  }
}
</script>

<style scoped>
  .consumeDetail .header:after{
    content: '';
    display: block;
    clear: both;
  }
  .conListContent{
    font-size: 12px;
  }
  .conListHeader{
    text-align: center;
    box-sizing: border-box;
    padding: 10px 0;
    background: #fff;
  }
  .conListHeader p{
    display: inline-block;
    width: 49%;
    font-size: 12px;
    box-sizing: border-box;
  }
  .conListHeader p span{
    color: #f00;
  }
  .conListHeader p:first-child{
    border-right: 1px solid #f0f0f0;
  }
  .consumeDetail .header{
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background: #fff;
    color: #666;
    font-size: 14px;
    padding: 10px 0;
  }
  .consumeDetail .totalCostAmount{
    border-left: 1px solid #ddd;
  }
  .consumeDetail .header>div{
    float: left;
    width: 50%;
    box-sizing: border-box;
  }
  .consumeDetail .header>div span{
    display: block;
    width: 100%;
    padding: 5px 0;
    text-align: center;
  }
  .conEcharts{
    margin-top: 10px;
    background: #fff;
  }
  .echartContent{
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
  }
  .consumeDetail .header>div span:last-child{
    color: #51C332;
  }
  .consumeDetail .echartHeader{
    font-size: 18px;
    line-height: 40px;
    width: 210px;
    margin: 0 auto;
  }
  .consumeDetail button{
    font-size: 20px;
    border: none;
    background: none;
    width: 50px;
  }
  .consumeDetail .time{
    display: inline-block;
    width: 99.34px;
  }
  .consumeDetail .plus{
    color: #f00;
  }
  .consumeDetail .negative{
    color: #51C332;
  }
  .consumeDetail span.plus,
  .consumeDetail span.negative{
    position: relative;
    top: -1px;
  }
  .consumeDetail tbody td{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .consumeDetail tbody td:last-child{
    overflow: hidden;
    max-width: 134px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
