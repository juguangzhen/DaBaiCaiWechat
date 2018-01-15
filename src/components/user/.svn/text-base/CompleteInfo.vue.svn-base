<template>
  <div style="height:100%;" class="perfectInformation">
    <x-header :left-options="{backText: ''}">完善用户信息</x-header>
    <group title="" class="weui-cells_form" label-width="70px">
      <x-input class="phoneNumber" placeholder="请输入手机号" v-model="userPhoneNumber">
        <x-button class="buttonForVer" slot="right" type="primary" mini :disabled="!canClick" @click.native="getVerification">{{verCue}}</x-button>
      </x-input>
      <x-input class="newPhone" placeholder="请输入验证码" v-model="verificationPhone"></x-input>
      <x-address title="省市区" v-model="selectArea" raw-value :list="addressData" value-text-align="left" placeholder="请选择"></x-address>
      <x-input title="详细地址" v-model="addDesc" name="address" placeholder="请填：xx路xx弄xx小区xx号楼" ></x-input>
    </group>
    <div v-transfer-dom>
      <confirm v-model="show"
               title="请输入验证码"
               @on-confirm="onConfirm"
               @on-show="onShow">
        <input v-model="verificationNumber" class="inputNumber" type="text"><img :src="imgSrc" alt="">
      </confirm>
    </div>
    <x-button class="buttonForVer" slot="right" type="primary" @click.native="subUserInfo">提交</x-button>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Group, XButton, XInput, Confirm, XAddress, TransferDomDirective as TransferDom, Value2nameFilter as value2name } from 'vux'
  import addrData from '../address/address.json'

  export default {
    name: 'ompleteInfo',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Group,
      XButton,
      XInput,
      Confirm,
      XAddress
    },
    data () {
      return {
        userPhoneNumber: '', // 保存用户手机号
        imgSrc: '',
        canClick: true,
        verificationPhone: '',
        verCue: '获取验证码',
        show: false,
        verificationNumber: '',
        selectArea: ['上海市', '市辖区', '浦东新区'],
        addDesc: '',
        verCueTime: 60,
        addressData: addrData // 默认地址,0-非默认、1-为默认
      }
    },
    computed: {},
    created () {
      this.getData()
    },
    methods: {
      getName (value) {
        return value2name(value, addrData).split(' ')
      },
      getData () {
      },
      getVerification () { // 点击获取验证码，判断手机号，如果手机号不正确，则提示用户，否则，弹出图形验证码
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhoneNumber)) {
          this.$vux.toast.text('请输入正确的手机号')
          return
        }
        this.show = true // 弹出图形验证码
      },
      onShow () { // 使用用户填入的手机号，请求到图形验证码
        this.imgSrc = this.$api.root + 'user/captcha/getImageCaptcha?phone=' + this.userPhoneNumber + '&' + new Date()
      },
      onConfirm () { // 点击弹窗的确定按钮 检查用户填入的验证码是否符合要求 如不符合，提示用户，否则就请求手机验证码
        if (!this.verificationNumber || this.verificationNumber.length !== 2) { // 如果图形码为空或者长度不对 则提示用户重新输入
          this.$vux.toast.text('请输入两位图形验证码')
        } else {
          this.$api.get('user/captcha/getPhoneCaptcha', {phone: this.userPhoneNumber, captcha: this.verificationNumber}, (res) => {
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
        this.verificationNumber = ''
      },
      subUserInfo () {
        if (!/^[1][3,4,5,7,8][0-9]{9}$/.test(this.userPhoneNumber)) {
          this.$vux.toast.text('请输入正确的手机号')
          return
        }
        if (!/^[0-9]{4}$/.test(this.verificationPhone)) {
          this.$vux.toast.text('请输入四位验证码')
          return
        }
        if (!this.addDesc.trim()) {
          this.$vux.toast.text('请输入详细地址')
          return
        }
        this.selectArea = this.getName(this.selectArea)
        var obj = {
          adProvince: this.selectArea[0] || '',
          adCity: this.selectArea[1] || '',
          adCountry: this.selectArea[2] || '',
          addDesc: this.addDesc,
          phone: this.userPhoneNumber,
          captcha: this.verificationPhone
        }
        this.$api.post('user/user/perfectUserInfo', obj, (res) => {
          this.$vux.toast.text('添加成功！')
          sessionStorage.setItem('phone', this.userPhoneNumber)
          setTimeout(() => {
            this.$router.go(-1)
          }, 1000)
        })
//        console.log(this.addDesc, 'addDesc', this.userPhoneNumber, this.verificationNumber)
      }
    }
  }
</script>

<style scoped>
  .vux-header{
    background: #51C332 !important;
  }
  .inputNumber{
    float: left;
    width: calc(100% - 50px);
    border: 1px solid #666;
    height: 30px;
    line-height: 30px;
  }
</style>
