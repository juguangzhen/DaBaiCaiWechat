<template>
  <div id="app" style="height:100%;">
    <!--<transition name="vux-pop-out" mode="out-in">-->
      <!-- <keep-alive :exclude="['basket', 'GoodsDetails', 'selectAddress']">
        <router-view class="router-view" :is=""></router-view>
      </keep-alive> -->

      <keep-alive>
        <router-view class="router-view" v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    <!--</transition>-->
    <!--<transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">-->
      <router-view class="router-view" v-if="!$route.meta.keepAlive"></router-view>
    <!--</transition>-->
    <div v-show="isLoading" class="loadingData">
      <img src="../static/img/loading.svg" alt="">
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Toast } from 'vux'
import { event } from './utils/event'

export default {
  name: 'app',
  components: {
    Toast
  },
  computed: {
    ...mapState({
      direction (state) {
        return state.direction
      },
      isLoading (state) {
        return state.isLoading
      }
    })
  },
  created () {
    var that = this
    event.on('errorMsg', function (msg) {
      that.$vux.toast.text(msg, 'middle')
    })
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
@import '~vux/src/styles/1px.less';
@import '~vux/src/styles/tap.less';
body {
  background-color: #fbf9fe;
}
html, body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}
@font-face {
  font-family: 'iconfontBC';  /* project id 505692 */
  src: url('//at.alicdn.com/t/font_505692_hz97deufosss8aor.eot');
  src: url('//at.alicdn.com/t/font_505692_hz97deufosss8aor.eot?#iefix') format('embedded-opentype'),
  url('//at.alicdn.com/t/font_505692_hz97deufosss8aor.woff') format('woff'),
  url('//at.alicdn.com/t/font_505692_hz97deufosss8aor.ttf') format('truetype'),
  url('//at.alicdn.com/t/font_505692_hz97deufosss8aor.svg#iconfontBC') format('svg');
}

.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 500ms;
  height: 100%;
  // top: 46px;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}
.vux-pop-out-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.vux-pop-out-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.vux-pop-in-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.weui-cells{
  font-size:14px !important;
}
#vux_view_box_body{
  padding-top: 46px;
}
.vux-number-input{
  font-size:15px !important;
}
.vux-header-left,.vux-header-back{
  color:#fff !important;
}
.vux-header .vux-header-left .left-arrow:before{
  border-color: #fff !important;
}
.xNumber a:first-child{
  border-radius: 10px 0px 0px 10px;
  margin-left: 5px;
  background: #f0f0f0;
}
.xNumber a:last-child{
  border-radius: 0 10px 10px 0;
  background: #f0f0f0;
}
  .xNumber input{
    width: 32px !important;
  }
.xNumber .vux-cell-primary{
  width: 100%;
}
  .xNumber .vux-cell-primary>div{
    width: 116px;
    margin: 0 auto;
    float: none !important;
  }
  .loadingData{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0);
  }
  .loadingData img{
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -20px;
    margin-left: -20px;
  }
</style>
