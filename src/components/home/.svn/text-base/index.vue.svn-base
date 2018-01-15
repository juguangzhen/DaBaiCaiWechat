<template>
  <div style="height:100%;">
      <!-- main content -->
      <view-box ref="viewBox" :class="selected == 3?'userPage':''">
        <x-header slot="header"
        style="width:100%;position:absolute;left:0;top:0;z-index:100;background-color:#51C332;"
        :left-options="{showBack:false}"
        :title="title"
        :transition="headerTransition"
        >
          <img src="../../../static/img/logo.svg" alt="" v-if="selected == 1">
        </x-header>
        <!-- remember to import BusPlugin in main.js if you use components: x-img and sticky -->
        <!--<transition-->
        <!--:name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">-->
          <keep-alive>
            <router-view class="router-view"></router-view>
          </keep-alive>
        <!--</transition>-->

        <tabbar class="my-tabbar" icon-class="vux-center" slot="bottom">
          <tabbar-item class="my-tabbar-item" :link="{name:'commodityType'}" :selected="selected == 1">
            <span class="tab-iconfont" slot="icon">&#xe6a6;</span>
            <span slot="label">我要买菜</span>
          </tabbar-item>
          <tabbar-item :link="{name:'collect'}" :selected="selected == 2">
            <span class="tab-iconfont" slot="icon">&#xe6a4;</span>
            <span slot="label">收藏</span>
          </tabbar-item>
           <tabbar-item :link="{name:'user'}" :selected="selected == 3">
            <span class="tab-iconfont" slot="icon">&#xe6a7;</span>
            <span slot="label">账户中心</span>
          </tabbar-item>
        </tabbar>

      </view-box>
  </div>
</template>

<script>
import { Radio, Group, Cell, Badge, Drawer, Actionsheet, ButtonTab, ButtonTabItem, ViewBox, XHeader, Tabbar, TabbarItem, Loading, TransferDom } from 'vux'
import { mapState } from 'vuex'

export default {
  name: 'home',
  directives: {
    TransferDom
  },
  components: {
    Radio,
    Group,
    Cell,
    Badge,
    Drawer,
    ButtonTab,
    ButtonTabItem,
    ViewBox,
    XHeader,
    Tabbar,
    TabbarItem,
    Loading,
    Actionsheet
  },
  methods: {
  },
  mounted () {
    this.handler = () => {
      if (this.path === '/demo') {
        this.box = document.querySelector('#demo_list_box')
        this.updateDemoPosition(this.box.scrollTop)
      }
    }
  },
  beforeDestroy () {
    this.box && this.box.removeEventListener('scroll', this.handler, false)
  },
  watch: {
  },
  computed: {
    ...mapState({
      direction (state) {
        return state.direction
      }
    }),
    isShowBar () {
      if (/component/.test(this.path)) {
        return true
      }
      return false
    },
    headerTransition () {
      return this.direction === 'forward' ? 'vux-header-fade-in-right' : 'vux-header-fade-in-left'
    },
    title () {
      if (/commodityType/.test(this.$route.path)) {
        return '  '
      }
      if (/collect/.test(this.$route.path)) {
        return '收藏'
      }
      if (/user/.test(this.$route.path)) {
        return ''
      }
      return '大白菜'
    },
    selected () {
      if (/commodityType/.test(this.$route.path)) {
        return '1'
      }
      if (/collect/.test(this.$route.path)) {
        return '2'
      }
      if (/user/.test(this.$route.path)) {
        return '3'
      }
    }
  },
  data () {
    return {
      showMenu: false
    }
  }

}
</script>

<style lang="less">
.tab-iconfont{
    font-family:"iconfontBC" !important;
    font-size:22px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    color:#fff;
}
@font-face {
  font-family: 'iconfontBC';  /* project id 505692 */
  src: url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.eot');
  src: url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.woff') format('woff'),
  url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.svg#iconfontBC') format('svg');
}
.weui-tabbar.my-tabbar{
  background-color: #51C332;
}
.weui-tabbar__label{
  color: #fff !important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label{
  color: #fff !important;
}
.my-tabbar .weui-bar__item_on{
  background-color: #48AF2C;
}
.tab-iconfont:before {
  content: attr(icon);
}
#vux_view_box_body{
  padding-top: 45px;
  padding-bottom: 53px;
}
.userPage>.vux-header{
/*opacity: 0;*/
  background: url("../../../static/img/xHeadBg.jpg") !important;
  background-size: 100% 100%;
}
.router-view{
  /*overflow: initial !important;*/
}
.userPage .vux-header{
  /*z-index: -999 !important;*/
}
.router-view {
  width: 100%;
  overflow: hidden;
  // top: 46px;
}
.menu-title {
  color: #888;
}
</style>

