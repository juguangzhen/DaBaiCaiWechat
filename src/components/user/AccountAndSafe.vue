<template>
  <div style="height:100%;">
    <x-header :left-options="{backText: ''}">账户与安全</x-header>
    <group>
      <cell title="修改密码" is-link link="/changePassWord"></cell>
      <cell class="userPhone" title="手机号码" link="/changePhoneNumber" is-link >{{phone}}</cell>
    </group>
  </div>
</template>

<script>
  import { ViewBox, XHeader, Group, Cell } from 'vux'
  export default {
    name: 'accountAndSafe',
    components: {
      ViewBox,
      XHeader,
      Group,
      Cell
    },
    data () {
      return {
        phone: sessionStorage.getItem('phone')
      }
    },
    computed: {
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {}
    }
  }
</script>

<style>
  .vux-header{
    background: #51C332 !important;
  }
</style>


