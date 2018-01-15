<template>
  <view-box ref="viewBox">
    <x-header :left-options="{backText: ''}" slot="header">商品详情 <span class="tab-iconfont ihome" @click="goIndex">&#xe63b;</span></x-header>
      <swiper :aspect-ratio="450/800">
        <swiper-item class="swiper-demo-img" v-for="(item, index) in goodsImgList" :key="index">
          <img :src="item.commodityImage.commodityImageUrl">
        </swiper-item>
      </swiper>
      <div class="food_info">
        <div class="food_head">
          <p class="food_name">{{food_info.commodityName}}</p>
          <p class="food_dec">{{food_info.commodityDesc || '暂无介绍'}}</p>
        </div>
        <div class="food_weight">
          <div class="box">
            <p>规格</p>
            <checker v-model="itemWeight" radio-required default-item-class="item" selected-item-class="item-selected">
              <checker-item v-for="(item, index) in food_weight" :value="item" :key="item.sale_weight"><span @click="seleted(item)">{{item.commoditySpecifications.saleDescribe}}</span></checker-item>
            </checker>
          </div>
        </div>
        <p class="price">售价: <span>&yen;{{ parseInt(itemWeight.commoditySpecifications.standardRetailPrice,10) || 0}}</span><span class="little">.{{itemWeight.commoditySpecifications.standardRetailPrice.toFixed(2).substr(-2,2) || 0}}</span></p>
        <div class="food_details">
          <ul>
            <li class="food_storetype">存储方式：<span>{{food_info.idStorageType === -1?'未知':food_info.idStorageType}}</span></li>
            <li class="food_region">产地：<span>{{food_info.productionPlace || '未知'}}</span></li>
            <li class="brand_name">品牌：<span>{{food_info.commodityBrand || '未知'}}</span></li>
          </ul>
        </div>
        <group>
          <cell
            title="点击查看详情"
            is-link
            :border-intent="false"
            :arrow-direction="showContent ? 'down' : ''"
            @click.native="showContent = !showContent">
          </cell>
          <p class="slide" :class="showContent?'animate':''"><span>{{food_info.commodityDescription || '暂无详情'}}</span>
            <img :src="food_info.commodityDescriptionImage" alt=""></p>
        </group>
      </div>
    <tabbar class="my-tabbar" icon-class="vux-center" slot="bottom">
      <button class="cantClick" v-show="cantClickButton" @click="cantClick"></button>
        <x-number class="xNumber" :value.sync="tempNumber" :min="0" :max="maxNumber" @on-change="changeNumber($event, itemWeight)"></x-number>
        <p class="tab-iconfont collection" :class="isCollec?'collectioned':''" @click="isCollecGoods">
          <span>{{isCollec?'&#xe733;':'&#xe82a;'}}</span>
          <br>
          <span>{{isCollec?'已收藏':'收藏'}}</span>
        </p>
        <span class="goBasket" @click="goBasket">前往菜篮子</span>
    </tabbar>
    </view-box>
</template>

<script>
  import { ViewBox, XHeader, TransferDom, Swiper, GroupTitle, SwiperItem, XButton, Checker, CheckerItem, Group, Cell, Tabbar, TabbarItem, XNumber } from 'vux'
  export default {
    name: 'goodDetail',
    directives: {
      TransferDom
    },
    components: {
      ViewBox,
      XHeader,
      Swiper,
      GroupTitle,
      SwiperItem,
      XButton,
      Checker,
      CheckerItem,
      Group,
      Cell,
      Tabbar,
      TabbarItem,
      XNumber
    },
    created () {
      this.getData()
    },
    ready () {
      console.log(this.$route)
    },
    data () {
      return {
        goodsImgList: [], // 商品主图列表
        id_food: this.$route.params.id, // 商品id
        food_info: [],
        food_weight: [],
        isCollec: '',
        cantClickButton: true,
        itemWeight: {
          commoditySpecifications: {
            standardRetailPrice: 0, // 初始化一个为0的价格
            commodityNum: 0
          }
        },
        tempNumber: 0,
        showContent: false,
        numberValue: 0,
        maxNumber: 999,
        shoppingInfo: '' // 当前商品在菜篮子中，每种规格的数量
      }
    },
    mounted () {
    },
    watch: {
      itemWeight: function () {
        this.cantClickButton = false
        this.tempNumber = this.itemWeight.commoditySpecifications.commodityNum // 赋值给临时变量 更新到视图
      }
    },
    methods: {
      isCollecGoods () { // 收藏商品
        var obj = {
          idCommodity: this.id_food
        }
        this.$api.get('goods/commodity/updCollectionCommodity', obj, (res) => { // 如果成功，更改收藏状态
          this.isCollec = !this.isCollec
        })
      },
      cantClick () {
        this.$vux.toast.text('请先选择规格')
      },
      seleted (item) { // 如果选择了规格，更改xNumber最大值
        this.cantClickButton = false
        this.tempNumber = item.commoditySpecifications.commodityNum // 赋值给临时变量 更新到视图
      },
      changeNumber (value, item) {
        if (value === item.commoditySpecifications.commodityNum) return // 如果没有改变数量，则返回
        var obj = { // 如果改变了数量，则请求数据
          idCommodity: this.food_info.idCommodity,
          idCommoditySpecifications: item.commoditySpecifications.idCommoditySpecifications,
          commodityNum: value
        }
        this.$api.get('order/user/modifyShoppingInfo', obj, (res) => {
          item.commoditySpecifications.commodityNum = value /* 直接把数量更改了就行了 */
          this.tempNumber = value // 赋值给临时变量 更新到视图
        })
      },
      getData: function () {
        var obj = {
          idCommodity: this.id_food
        }
        this.$api.get('goods/commodiyt/getCommodityInfo', obj, (res) => {
          this.goodsImgList = res.commodityImageList
          this.food_info = res.commodityInfo.commodityInfo
          if (res.commodityInfo.isCollection === 0) this.isCollec = true
          this.food_weight = res.commodityInfo.commoditySpecificationList
          this.food_weight.forEach((food, index, foods) => {
            food.commoditySpecifications.commodityNum = 0
          })
          this.shoppingInfo = res.shoppingInfo // 当前商品在菜篮子中，每种规格的数量
          this.shoppingInfo.forEach((item) => {
            this.food_weight.forEach((food) => {
              if (item.idCommoditySpecifications === food.commoditySpecifications.idCommoditySpecifications) {
                food.commoditySpecifications.commodityNum = item.commodityNum
              }
            })
          })
          this.$api.get('goods/getSystemEnum', {configName: 'store_type'}, (res) => { // 获取储存方式枚举
            res.forEach((item, index, res) => {
              if (item.configKey === this.food_info.idStorageType) {
                this.food_info.idStorageType = item.configValue
              }
            })
          })
        })
      },
      goBasket () {
        this.$api.get('order/user/getNotFinishOrderinfo', null, (res) => {
          this.unFinishOrderNumber = res.commodityInfo.commodityList.length
          if (res.commodityInfo.commodityList.length === 0) {
            this.$vux.toast.text('菜篮子为空！')
            return
          }
          this.$router.push({name: 'basket'})
        })
      },
      goIndex () {
        this.$router.push({name: 'commodityType'})
      }
    }
  }
</script>

<style scoped>
  .tab-iconfont{
    font-family:"iconfontBC" !important;
    font-size:22px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
    /*color:#000;*/
  }
  @font-face {
    font-family: 'iconfontBC';  /* project id 505692 */
    src: url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.eot');
    src: url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.eot?#iefix') format('embedded-opentype'),
    url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.woff') format('woff'),
    url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.ttf') format('truetype'),
    url('//at.alicdn.com/t/font_505692_ivm1jorg7uwn4s4i.svg#iconfontBC') format('svg');
  }
  .ihome{
    position: absolute;
    line-height: 46px;
    top: 0;
    right: 10px;
  }
  .weui-tabbar.my-tabbar{
    background: #fff;
  }
  li{
    list-style: none;
  }
  .vux-header{
    background: #51C332;
    width: 100%;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 100;
  }
  img{
    width:100%;
  }
  .food_head{
    padding: 0 10px;
    background: #fff;
    margin-bottom: 10px;
  }
  .food_head .food_dec{
    font-size: 14px;
    color: #666;
  }
  .food_weight{
    padding: 10px 10px;
    background: #fff;
  }
  .price{
    background: #fff;
    padding: 10px;
    margin: 10px 0;
  }
  .price span{
    color: #51C332;
  }
  .little{
    font-size: 14px;
  }
  .food_details{
    padding: 0px 10px 0px 10px;
    background-color: #fff;
  }
  .food_details:after{
    content: '';
    display: block;
    clear: both;
  }
  .food_details li{
    line-height: 45px;
    border-bottom: 1px solid #f0f0f0;
    float: left;
    width: 50%;
  }
  .food_details li:last-child{
    border-bottom: none;
  }
  .food_details li span{
    color: #aaa;
  }
  .item{
    font-size: 14px;
    background: #f0f0f0;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    margin: 5px;
    padding: 5px 15px;
  }
  .item:first-child{
    margin-left: 0;
  }
  .item-selected{
    color: #fff;
    background: #51C332;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
  }
  .animate {
    max-height: 9999px;
    transition-timing-function: cubic-bezier(0.5, 0, 1, 0);
    transition-delay: 0s;
  }
  .xNumber{
    padding: 0;
    width: 37%;
    overflow: hidden;
    border-right: 1px solid #f0f0f0;
  }
  .collection{
    width: 13%;
    color: #000;
    line-height: 46px;
    text-align: center;
    border-right: 1px solid #f0f0f0;
  }
  .goBasket{
    width: 50%;
    color: #fff;
    background: #51C332;
    line-height:46px;
    text-align: center;
  }
  .collection{
    color: #666;
    line-height: 20px;
    font-size: 12px;
  }
  .collection span{
    display: inline-block;
    width: 100%;
    text-align: center;
  }
  .collection span:first-child{
    padding-top:2px;
    font-size: 16px;
  }
  .collectioned{
    color: #f5a623;
  }
  .cantClick{
    position: absolute;
    z-index: 99;
    width: 35%;
    height: 100%;
    opacity: 0;
  }
</style>


