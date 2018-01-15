<template>
  <div style="height:100%;">
    <div class="head">
      <div class="userInfo">
        <div class="userImg">
          <img v-bind:src="imgsrc" alt="">
        </div>
        <div class="userTime">
          <p class="userId">会员ID：{{userInfo.idUser}}</p>
          <p class="userRegisterTime">注册时间：{{userInfo.registerTime}}</p>
        </div>
      </div>
    </div>
    <div class="funList">
      <ul>
        <li @click="goOther('myInformation')"><img src="../../../static/img/myInformation.png" alt=""><span>我的资料</span></li>
        <li @click="goOther('historyOrder')"><img src="../../../static/img/historyOrder.png" alt=""><span>历史订单</span></li>
        <li @click="goOther('myAccount')"><img src="../../../static/img/myAccount.png" alt=""><span>我的账户</span></li>
        <li @click="goOther('manageAddress')"><img src="../../../static/img/address.png" alt=""><span>地址管理</span></li>
        <li @click="goOther('accountAndSafe')"><img src="../../../static/img/accountAndSafe.png" alt=""><span>账户与安全</span></li>
      </ul>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="温馨提示"
               @on-confirm="onConfirm"
      >
        <p style="text-align:center;">请完善个人信息后再操作！</p>
      </confirm>
    </div>
  </div>
</template>

<script>
import { Confirm, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: 'user',
  directives: {
    TransferDom
  },
  components: {
    Confirm
  },
  data () {
    return {
      noPhone: false,
      show: false,
      userInfo: '' // 保存用户信息
    }
  },
  computed: {
    imgsrc () {
      return this.userInfo.headimgurl || require('../../../static/img/icon.jpg')
    }
  },
  created () {
    this.getData()
  },
  methods: {
    goOther (item) {
      if (this.noPhone) {
        this.show = true
      } else {
        this.$router.push({name: item})
      }
    },
    getData () {
      this.$api.get('user/user/getUserInfo', null, (res) => {
        console.log(res)
        this.userInfo = res.poUserInfo
        if (!this.userInfo.phone) {
          this.noPhone = true
        } else {
          sessionStorage.setItem('phone', this.userInfo.phone)
          this.noPhone = false
        }
        this.userInfo.registerTime = this.formatTime(res.registerTimeLong)
      })
    },
    onConfirm () {
      this.$router.push({name: 'completeInfo'})
    },
    formatTime (time) {
      var tempTime = new Date(time)
      var year = tempTime.getFullYear()
      var month = (tempTime.getMonth() + 1) < 10 ? '0' + (tempTime.getMonth() + 1) : (tempTime.getMonth() + 1)
      var day = (tempTime.getDate()) < 10 ? '0' + (tempTime.getDate()) : (tempTime.getDate())
      return year + '年' + month + '月' + day + '日'
    }
  }
}
</script>

<style>
.head{
  height: 140px;
  /*margin-top: -46px;*/
  width: 100%;
  background-color: #87C882;
  background-image: url("../../../static/img/userHeadBg.jpg");
  background-size: cover;
  position: relative;
}
.userInfo{
  width: 80%;
  margin: 0 auto;
  position: absolute;
  top: 20px;
  left: 10%;
}
  .userImg{
    width:54px;
    height:54px;
    float: left;
  }
  .userImg img{
    display: block;
    width:100%;
    height:100%;
    background: #000;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
  }
  .userTime{
    font-size: 14px;
    line-height: 25px;
    color: #fff;
    margin-left: 65px;
  }
  .funList{
    margin-top: 10px;
    border-top: 1px solid #f0f0f0;
  }
  .funList ul{
    background: #fff;
  }
.funList ul:after{
  content: '';
  display: block;
  clear: both;
}
  .funList li{
    float: left;
    width:33%;
    padding: 10px 0;
    border-right: 1px solid #f0f0f0;
    border-bottom: 1px solid #f0f0f0;
    list-style-type:none;
  }
  .funList li:nth-child(3n){
    border-right: none;
  }
  .funList li span{
    display: block;
    width:100%;
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
  }
  .funList li img{
    display: block;
    width: 35%;
    margin: 0 auto;
  }
</style>


