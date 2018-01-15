<template>
  <div style="height:100%;width:100%;">
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="53px">
        <!-- 页面的 header部分 -->
        <x-header slot="header"
        class="content-header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
        :left-options="{showBack:true}"
        title="选择地址">
        </x-header>
        <!-- 页面的 content 部分 -->
        <div class="selectAddressContainer">
          <group :gutter="groupGutter" v-for="(addrItem,index) in userAddrList" :key="index">
            <cell value-align="left">
              <img slot="icon" :src="selectImg(addrItem.poUserAddrMgr.idUserAddrMgr)" @click="selectAddress(addrItem.poUserAddrMgr.idUserAddrMgr)" width="20" style="display:block;margin-right:10px;">
              <div class="address-cell-content">
                <div class="address-item-left-context">
                  <div><span>{{addrItem.poUserAddrMgr.receiveName}}</span><span>{{addrItem.poUserAddrMgr.phoneUser}}</span></div>
                  <p>{{addrItem.poUserAddrMgr.addDesc}}</p>
                </div>
                <router-link :to="{ name: 'editAddress', params: { idUserAddrMgr:addrItem.poUserAddrMgr.idUserAddrMgr }}">
                  <div class="address-item-right-context">
                    <img  src="../../../static/img/edit.png" width="30" style="display:block;">
                  </div>
                </router-link>
              </div>
            </cell>
          </group>
        </div>

        <!-- 页面的 bottom 部分 -->
        <div slot="bottom" class="bottom-content">
          <x-button link="/editAddress/-1" type="primary" class="bottom-button">新增地址</x-button>
        </div>
      </view-box>
  </div>
</template>

<script>
import { Group, Cell, ViewBox, XHeader, CheckIcon, XButton } from 'vux'
export default {
  components: {
    Group,
    Cell,
    ViewBox,
    XHeader,
    CheckIcon,
    XButton
  },
  data () {
    return {
      groupGutter: '10px',
      selectIdAddr: parseInt(this.$route.params.idUserAddrMgr),
      userAddrList: []
    }
  },
  computed: {
  },
  methods: {
    getAddressData () {
      this.$api.get('user/user/addr/getAddrList', null, data => {
        this.userAddrList = data.addrList
      })
    },
    selectAddress (idUserAddrMgr, index) {
      let params = {
        idOrder: parseInt(this.$route.params.idOrder),
        idUserAddrMgr
      }
      this.$api.post('order/user/order/modifyOrderInfo', params, data => {
        this.$router.go(-1)
      })
    },
    selectImg (idUserAddrMgr) {
      return idUserAddrMgr === this.selectIdAddr ? require('../../../static/img/select.png') : require('../../../static/img/noselect.png')
    }
  },
  created () {
    this.getAddressData()
  }
}
</script>

<style>
.address-cell-content span {
  margin-right: 1.5em;
  color:#000;
}
.address-cell-content {
  overflow: hidden;
}
.address-item-left-context{
  float: left;
}
.address-item-right-context{
  float: right;
 
  width: 40px;
  text-align: reight;
}
.address-item-right-context img{
  margin-top: .5rem;
  width: 70%;
}
.bottom-content {
  background:#fff;
  padding:10px 30px;
  position:absolute;
  bottom:0;
  width:100%;
  box-sizing: border-box;
}
.bottom-button {
  font-size:15px !important;
}
</style>
