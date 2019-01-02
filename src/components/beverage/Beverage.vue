<template>
<div class="tab-pane active meal_page">
  <div class="water_content">
    <div class="class">
      <div id="typeNav" class="class_nav">
        <ul class="nav nav-pills nav-stacked">
          <li v-for="(type, index) in typeList" :key="index" @click="getList(type.api)"><a href="javascript:void(0)">{{type.title}}</a></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div id="productList" class="product">
        <div class="list" v-for="moive in moiveList" :key="moive.id">
          <a>
            <div class="pro_img">
              <img :src="moive.images.small">
            </div>

            <div class="pro_title">
              <p :title="moive.title">{{moive.title}}<span><em>
                    {{moive.rating.average}}
                  </em></span></p>
            </div>
          </a>
        </div>
      </div>
    </div>
    <div class="checkout">
      <div class="search_product">
        <div class="input-group input-group-sm">
          <input class="form-control" v-model.trim="searchText" @keyup.enter="searchMoive" autocomplete="off">
          <span class="input-group-btn">
            <button class="btn btn-default" @click="searchMoive">搜索</button>
          </span>
        </div>
      </div>
      <div class="checkout_content">
        <div id="cartList">

        </div>
        <!-- <div class="meal_tips" id="mealTips" style="display:none;">
          <p>您有<span id="orderNum"></span>个订单正在路上...</p>
          <button class="btn btn-xs btn-link btn-text" onclick="$('.orderList').fadeIn();$('.popup_mask').fadeIn();">查看订单</button>
        </div> -->
      </div>
      <div class="submit">
        <p>总价：<span id="totalPrice">0</span> 元</p>
        <a onclick="Order.openOrderContentModal();" class="btn btn-link btn-text next_btn">下一步</a>

      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Beverage',
  data() {
    return {
      moiveList: [],
      typeList: [{
          title: '正在热映',
          api: 'movie/in_theaters'
        },
        {
          title: '即将上映',
          api: 'movie/coming_soon'
        },
        {
          title: 'TOP250',
          api: 'movie/top250'
        }
      ],
      searchText: ''
    }
  },
  created() {
    this.getList(this.typeList[0].api);
  },
  methods: {
    getList(type) {
      let loading = this.$loading({
        lock: true,
        text: '影片加载中',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$axios.get("api/" + type)
        .then(res => {
          loading.close()
          if (res.status == 200) {
            this.moiveList = res.data.subjects
          }
        })
        .catch(err => {
          console.log(err)
          loading.close()
        });
    },
    searchMoive() {
      let loading = this.$loading({
        lock: true,
        text: '影片加载中',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      if (this.searchText) {
        let url = 'api/movie/search?q=' + this.searchText
        this.$axios.get(url)
          .then(res => {
            loading.close()
            if (res.status == 200) {
              this.moiveList = res.data.subjects
            }
          })
          .catch(err => {
            console.log(err)
            loading.close()
          });
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.class{
  width: 180px;
}
.class .logo{
  margin-bottom: 20px;
  margin-top: -10px;
}
.content{
  width: calc(100% - 420px);
}
.checkout{
  width: 240px;
}
.meal_page .water_content {
  background-image: none;
  padding: 0;
  height: 100%;
}

.meal_page .water_content>div {
  float: left;
  height: 100%;
}

.meal_page .water_content .class {
  padding: 10px 0;
}

.meal_page .class .class_nav {
  height: 100%;
  padding: 0 20px;
  overflow-x: hidden;
  overflow-y: auto;
}

.meal_page .class .nav>li>a {
  padding: 0;
  text-align: center;
  height: 48px;
  line-height: 48px;
}

.meal_page .class .nav>li.active>a,
.meal_page .class .nav>li>a:hover {
  font-weight: bold;
  font-size: 16px;
}

.meal_page .content {
  width: calc(100% - 410px);
  padding: 10px 15px;
  padding-right: 4px;
}

.meal_page .content .product {
  height: 100%;
  overflow-y: auto;
}

.meal_page .content .product>div.list {
  // display: inline-block;
  float: left;
  margin-left: 6px;
  margin-bottom: 6px;
  position: relative;
}

.meal_page .content .product>div.list .discountTips {
  position: absolute;
  top: 0;
  right: 0;
  background-color: rgba(241, 102, 102, .9);
  color: white;
  padding: 2px 4px;
  font-size: 12px;
  min-width: 40px;
  text-align: center;
}

.meal_page .content .product>div.list>a,
.meal_page .content .product>div.list>a:hover,
.meal_page .content .product>div.list>a:focus {
  text-decoration: none !important;
}

.meal_page .content .product>div.list .pro_img {
  overflow: hidden;
}

.meal_page .content .product>div.list img {
  height: 116px;
  width: 116px;
}

.meal_page .content .product>div.list img:hover {
  transform: scale(1.2);
  transition-duration: 0.5s;
}

.meal_page .content .product>div.list .pro_title {
  height: 40px;
  width: 116px;
}

.meal_page .content .product .pro_title p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
  margin: 0;
  font-weight: 200;
  padding: 4px;
}

.meal_page .content .product .pro_title p span {
  display: block;
  text-align: right;
  font-weight: initial;
  padding-right: 4px;
}

.meal_page .checkout {
  position: relative;
  width: 230px;
  padding: 10px 10px 0;
}

.meal_page .checkout .water_info {
  height: 76px;
}

.meal_page .checkout .water_info>div.clearfix {
  width: 168px;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
}

.meal_page .checkout .water_avatar img {
  height: 60px;
  width: 60px;
}

.meal_page .checkout .balance {
  text-align: center;
  color: white;
  font-weight: bold;
  font-size: 18px;
  margin-left: 10px;
  display: table;
}

.meal_page .checkout .balance p {
  display: table-cell;
  font-size: 24px;
  vertical-align: middle;
  height: 60px;
}

.meal_page .checkout .balance span {
  display: block;
  font-family: nsimsun;
  font-weight: normal;
  font-size: 14px;
}

.meal_page .checkout .search_product {
  background-color: rgba(255, 255, 255, .5);
  margin: -10px;
  margin-bottom: 0;
  padding: 10px;
  padding-bottom: 8px;
}

.meal_page .checkout .search_product input {
  border-bottom-left-radius: 30px;
  border-top-left-radius: 30px;
}

.meal_page .checkout .search_product button {
  border-bottom-right-radius: 30px;
  border-top-right-radius: 30px;
}

.meal_page .checkout .checkout_content {
  height: calc(100% - 134px);
  overflow-y: auto;
  margin-right: -8px;
  padding-right: 8px;
}

.meal_page .checkout .checkout_content .checkout_list {
  padding: 5px;
  position: relative;
  margin-top: 4px;
}

.meal_page .checkout .checkout_content .checkout_list>div {
  float: left;
}

.meal_page .checkout .checkout_content .checkout_img>img {
  height: 65px;
  width: 65px;
}

.meal_page .checkout .checkout_content .checkout_name {
  font-size: 12px;
  width: 118px;
  font-family: nsimsun;
}

.meal_page .checkout .checkout_content .checkout_name>p {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 10px;
  padding-top: 10px;
  margin-bottom: 0;
}

.meal_page .checkout .checkout_content .product_num p {
  margin-bottom: 0;
  font-size: 16px;
}

.meal_page .checkout .checkout_content .delete_list {
  position: absolute;
  top: 0;
  right: 0;
}

.meal_page .checkout .checkout_content .delete_list span {
  font-size: 20px;
}

.meal_page .checkout .meal_tips {
  height: 24px;
  width: 230px;
  position: absolute;
  left: 0;
  bottom: 70px;
  padding: 0 8px;
}

.meal_page .checkout .meal_tips p {
  margin-bottom: 0;
  font-size: 10px;
  display: inline-block;
  height: 24px;
  line-height: 24px;
}

.meal_page .checkout .meal_tips button {
  float: right;
  font-size: 10px;
  height: 24px;
  line-height: 24px;
  padding: 0;
  color: white;
}

.meal_page .checkout .submit {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100%;
  padding: 0 10px;
  /*background-color: rgba(255, 255, 255 , .2);*/
  background-color: #fff;
}

.meal_page .checkout .submit p {
  font-size: 16px;
  line-height: 32px;
  margin-bottom: 0;
}

.meal_page .checkout .submit span {
  color: #f16666;
}

.meal_page .checkout .submit .next_btn {
  width: 84px;
  height: 36px;
  line-height: 32px;
  font-size: 16px;
  text-align: center;
  letter-spacing: 2px;
  padding: 0;
}

.meal_page .checkout .user_detail {
  border: 1px solid #3b3227;
  display: none;
  position: absolute;
  top: 24px;
  left: -190px;
  background-color: white;
  width: 200px;
  padding: 10px;
  box-shadow: 0 0 8px 1px black;
}

.meal_page .checkout .user_detail .user_name {
  font-size: 12px;
}

.meal_page .checkout .user_detail .user_name span {
  display: block;
  font-size: 16px;
  font-weight: bold;
  letter-spacing: 2px;
}

.meal_page .checkout .user_detail .user_class,
.meal_page .checkout .user_detail .user_coupon {
  display: flex;
  justify-content: space-between;
}

.meal_page .checkout .user_detail .user_coupon p {
  margin-bottom: 0;
}

.meal_page .more_prop {
  width: 400px;
}

.meal_page .more_prop .modal-header {
  padding: 10px 15px;
  border: none;
  text-align: center;
}

.meal_page .more_prop .form-group {
  margin-bottom: 0;
}

.meal_page .more_prop .form-group .product_prop+.product_prop {
  margin-top: 6px;
}

.meal_page .more_prop .product_prop .btn-info {
  outline: none;
}

.meal_page .more_prop .modal-footer>button {
  border-radius: 30px;
  outline: none;
}

.meal_page .combo .table {
  margin-bottom: 0;
}

.meal_page .combo tbody tr>td {
  border: none;
  font-size: 14px;
  padding-top: 2px;
  padding-bottom: 2px;
}

.meal_page .combo tbody tr>td:last-child {
  text-align: right;
}

.meal_page .combo tbody tr>td.sum_price {
  padding-top: 8px;
}

.meal_page .combo tbody tr>td .combo_price {
  color: #ff4343;
}

.meal_page .combo .modal-footer button {
  border-radius: 30px;
  width: 80px;
}

.meal_page .combo .modal-footer button+button {
  margin-left: 50px;
  margin-top: 0;
}

.meal_page {
  .water_content {
    .class {
      background-color: #fff;

      .nav>li>a {
        color: #4A967A;
      }
    }

    .content {
      background-color: #f1f1f1;
    }

    .checkout {
      background-color: #ECFFF8;
    }
  }
}
</style>
