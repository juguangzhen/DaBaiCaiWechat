<template>
  <div style="height:100%;" class="changePassWord">
    <x-header :left-options="{backText: ''}">修改密码</x-header>
    <group title="" class="weui-cells_form">
      <x-input class="newPassWord" placeholder="请输入手机验证码" v-model="verificationPhone">
        <x-button class="buttonForVer" slot="right" type="primary" mini :disabled="!canClick" @click.native="verification">{{verCue}}</x-button>
      </x-input>
      <x-input class="newPassWord" placeholder="请输入新密码" type="password" v-model="newPassWord"></x-input>
    </group>
    <x-button class="subPassWord" type="primary" @click.native="subNewPassWord">提交</x-button>
    <div v-transfer-dom>
      <alert v-model="alertShow" title="温馨提示" :content="alertMsg"></alert>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="请输入验证码"
               @on-confirm="onConfirm"
               >
        <input v-model="verificationNumber" class="inputNumber" type="text"><img :src="imgSrc" alt="">
      </confirm>
    </div>
  </div>
</template>

<script>
import { ViewBox, XHeader, XInput, Group, XButton, Alert, Confirm, TransferDomDirective as TransferDom } from 'vux'

export default {
  name: '',
  directives: {
    TransferDom
  },
  components: {
    ViewBox,
    XHeader,
    XInput,
    Group,
    XButton,
    Alert,
    Confirm
  },
  data () {
    return {
      verCue: '获取验证码',
      canClick: true,
      verCueTime: '60',
      phone: sessionStorage.getItem('phone'),
      imgSrc: '',
      alertShow: false,
      alertMsg: '',
      show: false,
      verificationNumber: '', // 图形验证码
      verificationPhone: '', // 手机验证码
      newPassWord: '' // 新密码
    }
  },
  computed: {},
  created () {
  },
  methods: {
    change () {
      console.log(this.verificationNumber)
    },
    onConfirm () {
      if (!this.verificationNumber || this.verificationNumber.length !== 2) { // 如果图形码为空或者长度不对 则提示用户重新输入
        this.alertMsg = '请输入正确的图形码'
        this.alertShow = true
        this.verificationNumber = ''
      } else {
        this.$api.get('user/captcha/getPhoneCaptcha', {phone: this.phone, captcha: this.verificationNumber}, (res) => {
          console.log(res)
          this.verCue = '60秒后再试'
          this.canClick = false
          var timer = setInterval(() => {
            this.verCueTime -= 1
            this.verCue = this.verCueTime + '秒后再试'
            if (this.verCueTime === 0) {
              clearInterval(timer)
              this.canClick = true
              this.verCue = '获取验证码'
              this.verCueTime = 60
            }
          }, 1000)
        })
      }
    },
    verification () {
      this.imgSrc = this.$api.root + 'user/captcha/getImageCaptcha?phone=' + this.phone + '&' + new Date()
      this.show = true
    },
    subNewPassWord () {
      if (!this.verificationPhone || this.verificationPhone.length !== 4) { // 如果图形码为空或者长度不对 则提示用户重新输入
        this.alertMsg = '请输入正确的手机验证码'
        this.alertShow = true
        return
      }
      if (this.newPassWord.length < 6) {
        this.alertMsg = '密码不能少于六位'
        this.alertShow = true
        return
      }
      console.log(this.verificationNumber, this.verificationPhone, this.newPassWord)
      this.$api.post('user/user/modifyPassword', {passwordUser: this.newPassWord, captcha: this.verificationPhone}, (res) => {
        console.log(res)
        this.$vux.toast.text('修改成功')
        setTimeout(() => {
          this.$router.push({name: 'user'})
        }, 1500)
      })
    }
  }
}
</script>

<style scoped>
  .vux-header{
    background: #51C332 !important;
  }
  .changePassWord .newPassWord{
    height: 50px;
    padding-top:0;
    padding-bottom:0;
  }
  .changePassWord .subPassWord{
    margin-top: 20px;
    width: 90%;
  }
  .buttonForVer{
    width: 100px !important;
    padding: 0 !important;
  }
  .changePassWord .weui-icon.weui_icon_clear.weui-icon-clear{
    display: none !important;
  }
  .inputNumber{
    float: left;
    width: calc(100% - 50px);
    border: 1px solid #666;
    height: 30px;
    line-height: 30px;
  }
</style>
