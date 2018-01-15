<template>
  <div style="height:100%;" class="changePhone">
    <x-header :left-options="{backText: ''}">修改绑定手机号</x-header>
    <group title="" class="weui-cells_form">
      <x-input class="newPhone" placeholder="请输入新手机号" v-model="newPhone">
        <x-button class="buttonForVer" slot="right" type="primary" mini :disabled="!canClick" @click.native="getVerification">{{verCue}}</x-button>
      </x-input>
      <x-input class="newPhone" placeholder="请输入验证码" v-model="verificationPhone"></x-input>
    </group>
    <x-button class="subPassWord" type="primary" @click.native="subNewPassWord">提交</x-button>
    <div v-transfer-dom>
      <alert v-model="alertShow" title="温馨提示" :content="alertMsg"></alert>
    </div>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="请输入验证码"
               @on-confirm="onConfirm"
               @on-show="onShow">
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
        imgSrc: '',
        alertShow: false,
        alertMsg: '',
        verificationNumber: '', // 图形验证码
        verificationPhone: '', // 手机验证码
        newPhone: '', // 新手机号
        show: false
      }
    },
    computed: {},
    created () {
      this.getData()
    },
    methods: {
      onShow () {
        this.imgSrc = this.$api.root + 'user/captcha/getImageCaptcha?phone=' + this.newPhone + '&' + new Date()
      },
      onConfirm () {
        this.verification()
      },
      getData () {
        this.imgSrc = this.$api.root + 'user/captcha/getImageCaptcha?phone=' + this.newPhone + '&' + new Date()
      },
      getVerification () {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.newPhone)) {
          this.alertMsg = '请输入正确的手机号'
          this.alertShow = true
          return
        }
        this.show = true
      },
      verification () {
        if (!this.verificationNumber || this.verificationNumber.length !== 2) { // 如果图形码为空或者长度不对 则提示用户重新输入
          this.alertMsg = '请输入正确的图形码'
          this.alertShow = true
        } else {
          this.$api.get('user/captcha/getPhoneCaptcha', {phone: this.newPhone, captcha: this.verificationNumber}, (res) => {
            console.log(res)
            this.verCue = '60秒后再试'
            this.canClick = false
            var timer = setInterval(() => {
              this.verCueTime -= 1
              this.verCue = this.verCueTime + '秒后再试'
              if (this.verCueTime === 0) {
                this.imgSrc = this.$api.root + 'user/captcha/getImageCaptcha?phone=' + this.newPhone + '&' + new Date()
                clearInterval(timer)
                this.canClick = true
                this.verCue = '获取验证码'
                this.verCueTime = 60
              }
            }, 1000)
          })
        }
      },
      subNewPassWord () {
        if (!this.verificationPhone || this.verificationPhone.length !== 4) { // 如果图形码为空或者长度不对 则提示用户重新输入
          this.alertMsg = '请输入正确的手机验证码'
          this.alertShow = true
          return
        }
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.newPhone)) {
          this.alertMsg = '请输入正确的手机号'
          this.alertShow = true
          return
        }
        this.$api.post('user/user/modifyPhone', {phone: this.newPhone, captcha: this.verificationPhone}, (res) => {
          console.log(res)
          this.$vux.toast.text('修改成功')
          sessionStorage.setItem('phone', this.newPhone)
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
      }
    }
  }
</script>

<style scoped>
  .vux-header{
    background: #51C332 !important;
  }
  .changePhone .newPhone{
    height: 50px;
    padding-top:0;
    padding-bottom:0;
  }
  .changePhone .subPassWord{
    margin-top: 20px;
    width: 90%;
  }
  .buttonForVer{
    width: 100px !important;
    padding: 0 !important;
  }
  .changePhone .weui-icon.weui_icon_clear.weui-icon-clear{
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
