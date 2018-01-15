<template>
  <div style="height:100%;">
    <div v-show="isEmpty" class="isEmpty">
      <p>
        您还未收藏商品哦！
      </p>
    </div>
    <ul class="list">
      <!--<transition-group name="vux-pop-out">-->
        <li v-for="(item, index) in goodsList" :key="index" @click="goDetails(item)" :class="collectGoods === item ? 'vux-pop-out-enter':''">
          <div class="goods-info">
            <img v-bind:src="item.commodityInfo.commodityImage" alt="">
            <div class="food_text">
              <p class="title overflow">{{item.commodityInfo.commodityName}}</p>
              <p class="single_price"><span>{{item.commodityInfo.standardRetailPrice.toFixed(2)}}元</span>起</p>
              <div class="collectStar" @click.stop="isCollecGoods(item)">
                <img src="../../../static/img/favoriteSelected.png" alt="">
              </div>
            </div>
          </div>
        </li>
      <!--</transition-group>-->
    </ul>
  </div>
</template>

<script>
export default {
  name: 'collect',
  components: {
  },
  data () {
    return {
      isEmpty: false,
      goodsList: '', // 商品列表
      tempId: '',
      collectGoods: ''
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$api.get('goods/commodity/getCommodityCollectionToUser', null, (res) => {
        this.goodsList = res
        if (this.goodsList.length === 0) this.isEmpty = true
      })
    },
    goDetails (item) {
      this.$router.push({name: 'GoodsDetails', params: {id: item.commodityInfo.idCommodity}})
    },
    isCollecGoods (item) { // 收藏商品
      var obj = {
        idCommodity: item.commodityInfo.idCommodity
      }
      this.$api.get('goods/commodity/updCollectionCommodity', obj, (res) => { // 如果成功，更改收藏状态
        this.collectGoods = item
        this.tempId = item.commodityInfo.idCommodity
        this.goodsList.forEach((item, index, arry) => {
          if (item.commodityInfo.idCommodity === this.tempId) {
            setTimeout(() => {
              this.collectGoods = ''
              this.goodsList.splice(index, 1)
              if (this.goodsList.length === 0) {
                this.isEmpty = true
              }
            }, 500)
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.isEmpty{
  width: 100%;
  height: 100%;
  text-align: center;
}
.isEmpty p{
  height: 100%;
  margin: 50% auto;
  color: #666;
}
.list{
  height: 100%;
  overflow: scroll;
  list-style: none;
}
.list li{
  position: relative;
  border-bottom: 1px solid #f0f0f0;
  height: 82px;
}
.goods-info{
  height: 100%;
  font-size: 14px;
}
.goods-info>img{
  position: absolute;
  top: 11px;
  left: 10px;
  height: 60px;
  width: 80px;
}
.goods-info p{
  padding-top: 5px;
}
.food_text{
  height: 100%;
  margin-left: 100px;
}
.food_text .title{
  font-size: 16px;
  padding: 8px 0 5px 0;
}
.single_price{
  color: #666;
  margin-top: 5px;
}
.single_price span{
  color: #51C332;
}
.collectStar{
  position: absolute;
  width: 50px;
  height: 100%;
  right: 0;
  top: 0;
  background: #FBF9FE;
}
.collectStar>img{
  display: block;
  position: absolute;
  top: 25px;
  left: 15px;
  margin-top: -10px;
  width: 20px;
  margin: 2px;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active{
  transition: all 500ms;
}
.vux-pop-out-enter {
  transform: translate3d(100%, 0, 0);
  transition: all 500ms;
}
.vux-pop-out-leave-active {
  transform: translate3d(100%, 0, 0);
}
</style>


