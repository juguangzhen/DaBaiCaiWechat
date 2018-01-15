<template>
  <div style="height:100%;">
    <x-button @click.native="login" type="primary">登录</x-button>
  </div>
</template>

<script>
import { XButton } from 'vux'
export default {
  name: 'user',
  components: {
    XButton
  },
  data () {
    return {
    }
  },
  methods: {
    login () {
      var that = this
      this.$api.post('user/loginUser?phone=18777777777&passwordUser=111111', null, function (data) {
        sessionStorage.setItem('myken', data.token)
        sessionStorage.setItem('phone', data.poUserInfo.phone)
        console.log(sessionStorage)
        that.$router.push({path: '/home'})
      })
    }
  }
}
</script>

<style>

</style>



