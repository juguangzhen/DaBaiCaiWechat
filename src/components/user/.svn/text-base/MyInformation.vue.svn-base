<template>
  <div style="height:100%;">
    <x-header :left-options="{backText: ''}">我的资料</x-header>
    <group class="myInformation">
      <cell class="userName" title="公司名称" is-link  @click.native="changeName">{{userInfo.contactUserName}}</cell>
      <cell title="专属二维码" is-link @click.native="qrCode"></cell>
    </group>
    <div v-transfer-dom>
      <confirm v-model="alertShow"
               show-input
               ref="changeNameAlert"
               title="修改公司名称"
               @on-show="onShow"
               @on-confirm="onConfirm"
               >
      </confirm>
    </div>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Cell, Group, Confirm, TransferDomDirective as TransferDom } from 'vux'
  export default {
    name: 'myInformation',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Cell,
      Group,
      Confirm
    },
    data () {
      return {
        userInfo: '',
        alertShow: false
      }
    },
    computed: {
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        this.$api.get('user/user/getUserInfo', null, (res) => {
          this.userInfo = res.poUserInfo
        })
      },
      changeName () {
        this.alertShow = true
      },
      onShow () {
        this.$refs.changeNameAlert.setInputValue(this.userInfo.contactUserName)
      },
      onConfirm (value) {
        if (value === this.userInfo.contactUserName) return
        if (value.length > 25) {
          this.$vux.toast.text('公司名称过长，请重新输入')
        } else {
          this.$api.post('user/user/modifyUserName', {userName: value}, (res) => {
            this.userInfo.contactUserName = value
          })
        }
      },
      qrCode () {
        this.$vux.toast.show({
          type: 'text',
          text: '暂未开放，敬请期待！',
          time: 800
        })
      }
    }
  }
</script>

<style>
  .vux-header{
    background: #51C332 !important;
  }
  .myInformation .userName .vux-cell-bd.vux-cell-primary{
    width: 20%;
  }
  .myInformation .userName .weui-cell__ft{
    width: 73%;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }
</style>


