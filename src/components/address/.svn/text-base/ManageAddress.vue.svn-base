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
        <div class="manage-addr-container">
          <group :gutter="groupGutter" v-for="(addrItem,index) in userAddrList" :key="index">
            <cell value-align="left">
              <div class="manage-ddress-cell-content">
                <div class="manage-ddress-item-left-context" style="width:100%;">
                  <div><span>{{addrItem.poUserAddrMgr.receiveName}}</span><span style="float:right;">{{addrItem.poUserAddrMgr.phoneUser}}</span></div>
                  <p>{{addrItem.poUserAddrMgr.addDesc}}</p>
                </div>
              </div>
            </cell>
            <cell value-align="left" title="设为默认">
              <img slot="icon" v-show="addrItem.poUserAddrMgr.defaultState" src="../../../static/img/select.png" width="20" style="display:block;margin-right:3px;">
              <img slot="icon" v-show="!addrItem.poUserAddrMgr.defaultState" src="../../../static/img/noselect.png" @click="updateAddressDefault(addrItem.poUserAddrMgr.idUserAddrMgr)" width="20" style="display:block;margin-right:3px;">
              <div class="manage-ddress-cell-content">
                <router-link :to="{ name: 'editAddress', params: { idUserAddrMgr:addrItem.poUserAddrMgr.idUserAddrMgr }}">
                  <div class="manage-ddress-item-right-context">
                    <img  src="../../../static/img/edit.png" width="2" style="display:block;">
                    <p>编辑</p>
                  </div>
                </router-link>
              </div>
            </cell>
          </group>
        </div>

        <!-- 页面的 bottom 部分 -->
        <div slot="bottom" class="manage-ddress-bottom-content">
          <x-button link="/editAddress/-1" type="primary" class="manage-ddress-bottom-button">新增地址</x-button>
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
    updateAddressDefault (idUserAddrMgr) {
      this.$api.post('user/user/addr/updateAddrDefault', {idUserAddrMgr}, data => {
        this.getAddressData()
      })
    }
  },
  created () {
    this.getAddressData()
  }
}
</script>

<style>
.manage-ddress-cell-content span {
  margin-right: 1.5em;
  color:#000;
}
.manage-ddress-cell-content {
  overflow: hidden;
}
.manage-ddress-item-left-context{
  float: left;
}
.manage-ddress-item-right-context{
  float: right;
  width: px;
  margin-right:1rem;
  text-align: reight;
}
.manage-ddress-item-right-context img{
  float: left;
  width: 20px;
}
.manage-ddress-item-right-context p{
  float: right;
  color: #000;
}
.manage-ddress-bottom-content {
  background:#fff;
  padding:10px 30px;
  position:absolute;
  bottom:0;
  width:100%;
  box-sizing: border-box;
}
.manage-ddress-bottom-button {
  font-size:15px !important;
}
</style>
