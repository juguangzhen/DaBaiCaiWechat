<template>
  <div style="height:100%;width:100%;">
      <view-box ref="viewBox" body-padding-top="46px" body-padding-bottom="53px">
        <!-- 页面的 header部分 -->
        <x-header slot="header"
        class="content-header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
        :left-options="{showBack:true}"
        :title="title">
        </x-header>
        <!-- 页面的 content 部分 -->
        <div class="editAddressContainer">
          <group :gutter="0" label-width="70px">
            <x-input title="手机号码" name="mobile" v-model="phoneUser" placeholder="请输入手机号码" keyboard="number" is-type="china-mobile"></x-input>
            <x-input title="姓名" name="username" v-model="receiveName" placeholder="请输入姓名"></x-input>
            <x-address title="省市区" v-model="selectArea" raw-value :list="addressData" value-text-align="left" placeholder="请选择"></x-address>
            <x-input title="详细地址" v-model="addDesc" name="address" placeholder="请填：xx路xx弄xx小区xx号楼" ></x-input>
            <x-switch title="设为默认" v-model="swidthState"></x-switch>
          </group>
        </div>

        <!-- 页面的 bottom 部分 -->
        <div slot="bottom" class="bottom-content">
           <flexbox>
            <flexbox-item>
              <x-button @click.native="deleteAddr"  plain type="primary" class="bottom-button">删除</x-button>
            </flexbox-item>
            <flexbox-item>
              <x-button @click.native="submitAddr" type="primary" class="bottom-button">提交</x-button>
            </flexbox-item>
          </flexbox>
        </div>
      </view-box>
  </div>
</template>

<script>
import { Group, Cell, ViewBox, XHeader, CheckIcon, XButton, Flexbox, FlexboxItem, XInput, PopupPicker, XSwitch, XAddress, Value2nameFilter as value2name } from 'vux'
import addressData from './address.json'
export default {
  components: {
    Group,
    Cell,
    ViewBox,
    XHeader,
    CheckIcon,
    XButton,
    Flexbox,
    FlexboxItem,
    XInput,
    PopupPicker,
    XSwitch,
    XAddress
  },
  data () {
    return {
      idUserAddrMgr: parseInt(this.$route.params.idUserAddrMgr),
      title: this.idUserAddrMgr === -1 ? '新增地址' : '修改地址',
      selectArea: ['上海市', '市辖区', '浦东新区'],
      phoneUser: '',
      receiveName: '',
      defaultState: 0,
      addressData: addressData, // 默认地址,0-非默认、1-为默认
      addDesc: ''
    }
  },
  computed: {
    swidthState: {
      get: function () {
        return !!this.defaultState
      },
      set: function (state) {
        this.defaultState = state ? 1 : 0
      }
    }
  },
  methods: {
    getAddressData () {
      this.$api.get('user/user/addr/getAddrDetail', {idUserAddrMgr: this.idUserAddrMgr}, data => {
        let _data = data.addrDetail.poUserAddrMgr
        this.phoneUser = _data.phoneUser
        this.receiveName = _data.receiveName
        this.defaultState = _data.defaultState
        this.addDesc = _data.addDesc
        this.selectArea = [_data.adProvince, _data.adCity, _data.adCountry]
      })
    },
    submitAddr () {
      if (!this.checkValue()) return
      return this.idUserAddrMgr === -1 ? this.addAddr() : this.editAddr()
    },
    addAddr () {
      this.$api.post('user/user/addr/addAddr', this.getParams(), data => {
        this.$vux.alert.show({
          title: '成功',
          content: '地址提交成功',
          onHide: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    editAddr () {
      this.$api.post('user/user/addr/updateAddr', this.getParams('edit'), data => {
        this.$vux.alert.show({
          title: '成功',
          content: '地址提交成功',
          onHide: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    deleteAddr () {
      let params = {
        idUserAddrMgr: this.idUserAddrMgr
      }
      this.$api.delete('user/user/addr/deleteAddr', params, data => {
        this.$vux.alert.show({
          title: '成功',
          content: '地址删除成功',
          onHide: () => {
            this.$router.go(-1)
          }
        })
      })
    },
    getParams (type) {
      let area = this.getName(this.selectArea)
      let params = {
        addType: 3,
        addDesc: this.addDesc,
        adProvince: area[0] || '',
        adCity: area[1] || '',
        adCountry: area[2] || '',
        receiveName: this.receiveName,
        phoneUser: this.phoneUser,
        defaultState: this.defaultState ? 1 : 0
      }
      type === 'edit' && Object.assign(params, {idUserAddrMgr: this.idUserAddrMgr})
      return params
    },
    getName (value) {
      return value2name(value, addressData).split(' ')
    },
    checkValue () {
      if (!this.phoneUser) return this.$utils.showReminder('', '请填写手机号', this)
      if (!this.receiveName) return this.$utils.showReminder('', '请填写姓名', this)
      if (!this.addDesc) return this.$utils.showReminder('', '请填写详细地址', this)
      return true
    }
  },
  created () {
    if (this.idUserAddrMgr !== -1) {
      this.getAddressData()
    }
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
