<template>
  <div class="tab-pane active meal_page">
    <div class="water_content">
      <div class="class">
        <div id="typeNav" class="class_nav">
          <ul class="nav nav-pills nav-stacked">
            <li v-for="(type, index) in typeList" :class="{active:activeIdx==index}" :key="index" @click="getList(index)"><a
                href="javascript:void(0)">{{type.title}}</a></li>
          </ul>
        </div>
      </div>
      <div class="content">
        <div id="productList" class="product">
          <div class="list" v-for="moive in moiveList" :key="moive.id" @click="addToCart(moive)">
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
            <div class="checkout_list clearfix" v-for="(item, idx) in cartList" :key="item.id">
              <div class="checkout_img">
                <img :src="item.images.small">
              </div>
              <div class="checkout_text">
                <div class="checkout_name">
                  <p>{{item.title}}</p>
                  <div class="product_num">
                    <p>
                      <button class="btn btn-sm btn-link btn-text" @click="subNum(idx)">&lt;</button>
                      <em>{{item.num}}</em>
                      <button class="btn btn-sm btn-link btn-text" @click="addNum(idx)">&gt;</button>
                    </p>
                  </div>
                </div>
              </div>
              <div class="delete_list">
                <button class="btn btn-xs btn-link btn-text" @click="removeFromCart(idx)"><span class="icon iconfont">&#xe610;</span></button>
              </div>
            </div>
          </div>
        </div>
        <div class="submit">
          <p>总价：<span id="totalPrice">{{sumPrice}}</span> 元</p>
          <a onclick="Order.openOrderContentModal();" class="btn btn-link btn-text next_btn">下一步</a>

        </div>
      </div>
    </div>

    <!-- 下单弹窗 -->
    <el-dialog :visible.sync="comfirmOrder" center>
      <span slot="title">确认订单</span>
      <div class="order_content">
        <div class="pro_list">
          <div class="order_number">
            <p>应支付：￥<span id="orderTotalPrice"></span></p>
          </div>
          <div class="order_list" id="queryOrderList">
          </div>
          <div class="order_referrer" onclick="Product.openReferrerModel()">
            <p>推荐人</p>
            <div><span id="referrerName">无</span> ></div>
          </div>
        </div>
        <!-- product list end -->
        <div class="remark">
          <input type="text" id="orderRemark" class="remark_input" placeholder="填写备注：">
        </div>
        <div class="pay_ways clearfix">
          <div>
            <div class="water_coupon" onclick="Order.openCouponModal()">
              <p>卡券兑换</p>
              <div class="water_coupon_name" onclick=""><span id="waterbarCouponSelected"></span> ></div>
            </div>
            <!-- <div id="score" class="score">
            <p><span id="scoreTitle"></span></p>
            <label>￥<span id="maxUsePoints">0</span>
              <input type="checkbox" id="pointsToCash" onclick="Order.usePointsForCash();">
            </label>
          </div> -->
            <div class="real_pay">
              <p>实际支付</p>
              <p class="real_money">￥ <span id="orderPayPrice"></span></p>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer panWaysBtn">
        <el-button class="btn weipay" onclick="Order.payByWXQrcodePay();"><span class="icon iconfont">&#xe66d;</span>微 信</el-button>
        <el-button class="btn alipay" onclick="Order.payByAliQrcodePay();"><span class="icon iconfont">&#xe938;</span>支付宝</el-button>
        <el-button id="netbarBalancePayDiv" class="btn netfeepay" onclick="Order.payByNetbarBalance();"><span class="icon iconfont">&#xe630;</span>网费余额</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Beverage',
    data() {
      return {
        comfirmOrder: true,
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
        activeIdx: 0,
        searchText: '',
        cartList: []
      }
    },
    created() {
      this.getList(0);
    },
    methods: {
      getList(idx) {
        let loading = this.$loading({
          lock: true,
          text: '影片加载中',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.$axios.get("api/" + this.typeList[idx].api)
          .then(res => {
            loading.close()
            if (res.status == 200) {
              this.activeIdx = idx
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
                this.activeIdx = -1
                this.moiveList = res.data.subjects
                this.searchText = ''
              }
            })
            .catch(err => {
              console.log(err)
              loading.close()
            });
        }
      },
      addToCart(event) {
        // 判断是否已存在于购物车中
        for (let i = 0; i < this.cartList.length; i++) {
          if (this.cartList[i].id === event.id) {
            this.cartList[i].num++
            this.$set(this.cartList, i, this.cartList[i])
            return
          }
        }

        event.num = 1
        this.cartList.push(event)
      },
      removeFromCart(idx) {
        this.$confirm('是否删除此商品', '删除商品', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(1)
          this.cartList.splice(idx, 1)
        }).catch(() => {});

      },
      addNum(idx) {
        let item = this.cartList[idx]
        item.num++
        this.$set(this.cartList, idx, item)
      },
      subNum(idx) {
        let item = this.cartList[idx]
        if (item.num == 1) {
          this.removeFromCart(idx)
        } else {
          item.num--
          this.$set(this.cartList, idx, item)
        }
      }
    },
    computed: {
      sumPrice() {
        let sum = 0
        for (let i = 0; i < this.cartList.length; i++) {
          let num = this.cartList[i].num
          let price = this.cartList[i].rating.average
          sum += num * price
        }
        return parseInt(sum) === parseFloat(sum) ? parseInt(sum) : sum.toFixed(2)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .class {
    width: 180px;
  }

  .class .logo {
    margin-bottom: 20px;
    margin-top: -10px;
  }

  .content {
    width: calc(100% - 420px);
  }

  .checkout {
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
    height: 160px;
  }

  .meal_page .content .product>div.list img {
    // height: 116px;
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

  .water_content {
    background-repeat: no-repeat;
    background-size: contain;
    padding: 12px 4px;

    >div {
      height: 656px;
    }
  }

  .class .nav>li {
    >a {
      border-bottom: 1px solid #ebebeb;
      color: #666;
    }

    &.active>a,
    >a:hover {
      color: #86CCB2;
      background-color: initial;
    }
  }

  .content {
    .banner {
      background-color: rgba(255, 255, 255, .2);
      background-repeat: no-repeat;
      background-size: contain;
    }

    .product {
      >div.list .pro_title {
        background-color: #fff;
      }

      .pro_title p {
        color: #292f51;

        span {
          color: #e82221;
        }
      }
    }
  }

  .checkout {
    .water_info {
      border-bottom: 1px solid #fff;
    }

    .balance span em {
      color: #e81f1f;
      font-weight: bold;
    }

    .checkout_content {
      height: 456px;

      .checkout_list {
        background-color: #fff;
      }

      .checkout_name {
        color: #333;
      }

      .product_num {
        p {
          color: #666;
        }

        button {
          color: #666;

          &:hover,
          &:focus {
            color: lightgray;
          }
        }
      }

      .delete_list {
        color: #333;

        >button {
          color: #333;
        }
      }
    }

    .meal_tips {
      background-color: #96DAC1;
      width: 244px;
      left: 0px;
      bottom: 68px;
    }

    .submit {
      p {
        color: #333;
      }

      .next_btn {
        background-color: #96DAC1;
        border-radius: 50px;
        color: #fff;

        &:hover {
          background-color: #86CCB2;
        }
      }
    }
  }

  /*  -- order --  */
  .el-dialog {
    background-color: #efefef;
  }

  .remark .remark_input {
    height: 54px;
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    border: 0;
    font-size: 12px;
  }

  .yesorder .order_list .quan .cartNum {
    height: 20px;
    width: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 55px;
    right: 2px;
    line-height: 20px;
    text-align: center;
  }

  .yesorder .panWaysBtn {
    display: flex;
    justify-content: center;
  }

  .yesorder .panWaysBtn button {
    background-color: #fff;
    width: 110px;
  }

  .yesorder .panWaysBtn button+button {
    margin-left: 10px;
  }

  .yesorder .panWaysBtn button>span {
    margin-right: 6px;
  }

  .yesorder .panWaysBtn button.weipay {
    color: #2aac38;
  }

  .yesorder .panWaysBtn button.alipay {
    color: #00a7ff;
  }

  .yesorder .panWaysBtn button.unionpay {
    color: #017f88;
  }

  .yesorder .panWaysBtn button.netfeepay {
    color: #ff9500;
  }

  /*  -- order detail --  */
  .order_content,
  .popups.green_pop {
    background-color: #efefef;
    width: 530px;
    top: 120px;
    left: 230px;
  }

  .popups.yesorder {
    top: 80px;
  }

  .order_content .order_content,
  .popups.green_pop .green_pop_content {
    border-top: 0px solid #89C63D;
    padding: 10px 20px;
  }

  .order_content .pro_list,
  .popups.green_pop .pro_list {
    border-radius: 10px;
    background-color: white;
    margin-bottom: 10px;
  }

  .order_content .pro_list .order_number,
  .popups.green_pop .pro_list .order_number {
    display: flex;
    justify-content: space-between;
    background-color: #dedede;
    border-radius: 10px 10px 0 0;
    padding: 0 15px;
    height: 30px;
  }

  .order_content .pro_list .order_number p,
  .popups.green_pop .pro_list .order_number p {
    margin-bottom: 0;
    line-height: 30px;
    font-size: 12px;
  }

  .order_content .pro_list .order_list,
  .popups.green_pop .pro_list .order_list {
    padding: 15px 0 10px;
    overflow-x: auto;
    display: flex;
    margin: 0 15px;
  }

  .order_content .order_list .buy,
  .popups.green_pop .order_list .buy {
    width: 80px;
    margin-right: 8px;
    position: relative;
  }

  .order_content .order_list .buy p,
  .popups.green_pop .order_list .buy p {
    margin-bottom: 0;
    height: 20px;
    line-height: 20px;
    margin-top: 8px;
  }

  .order_content .order_list .buy img,
  .popups.green_pop .order_list .buy img {
    height: 80px;
    width: 80px;
  }

  .order_content .order_list .buy .pro_number,
  .popups.green_pop .order_list .buy .pro_number {
    position: absolute;
    top: 58px;
    right: 2px;
    height: 20px;
    width: 20px;
    border-radius: 10px;
    background-color: white;
    line-height: 20px;
    font-size: 12px;
  }

  .order_content .order_referrer {
    border-top: 1px solid #ccc;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    -ms-align-items: center;
    align-items: center;
    padding: 0 15px;
    height: 35px;
  }

  .order_content .order_referrer p {
    margin-bottom: 0;
  }

  .order_content .pay_ways .score,
  .order_content .pay_ways .real_pay,
  .order_content .pay_ways .water_coupon {
    height: 54px;
    // width: 490px;
    background-color: white;
    margin-bottom: 10px;
    padding: 15px;
    display: flex;
    justify-content: space-between;
  }

  .order_content .pay_ways .real_pay {
    margin-bottom: 0;
  }

  .order_content .pay_ways .water_coupon {
    cursor: pointer;
  }

  .order_content .pay_ways .water_coupon .water_coupon_list {
    margin-bottom: -3px;
    margin-top: -3px;
  }

  .order_content .pay_ways .water_coupon .water_coupon_list .water_conpou_content {
    width: 130px;
    height: 100%;
  }

  .order_content .pay_ways .water_coupon .water_coupon_list .water_conpou_content {
    width: 130px;
    height: 100%;
  }

  .order_content .pay_ways .score p,
  .order_content .pay_ways .score label,
  .order_content .pay_ways .real_pay p,
  .order_content .pay_ways .water_coupon p {
    line-height: 24px;
    font-size: 12px;
    margin-bottom: 0;
  }

  .order_content .pay_ways .score p span {
    font-size: 10px;
  }

  .order_content .pay_ways .score label {
    font-weight: normal;
  }

  .order_content .pay_ways .score label span {
    color: #FF3743;
  }

  .order_content .pay_ways .score label input {
    vertical-align: middle;
    margin-top: -2px;
  }

  .order_content .pay_ways .real_pay p.real_money {
    color: #FF3743;
    font-size: 14px;
    font-weight: bold;
  }

  .order_content .pay_ways .qr_pay {
    height: 118px;
    width: 160px;
    background-color: white;
    padding: 10px 8px;
    display: flex;
    justify-content: space-between;
  }

  .order_content .qr_pay .qr_code,
  .popups.netfee_order .qr_pay .qr_code {
    height: 98px;
    width: 98px;
  }

  .order_content .qr_pay .online_pay>button {
    width: 38px;
    height: 38px;
    padding: 0;
    display: block;
  }

  .order_content .qr_pay .online_pay>button span,
  .popups.netfee_order .qr_pay .online_pay>button span {
    line-height: 38px;
    font-size: 36px;
  }

  .order_content .qr_pay .online_pay .wei {
    color: #8cee8c;
    margin-bottom: 10px;
    margin-top: 6px;
  }

  .order_content .qr_pay .online_pay .ali,
  .popups.netfee_order .qr_pay .online_pay .ali {
    color: #95CBF2;
  }

  .order_content .qr_pay .online_pay .active.wei,
  .order_content .qr_pay .online_pay .wei:hover,
  .order_content .qr_pay .online_pay .wei:focus,
  .popups.netfee_order .qr_pay .online_pay .wei,
  .popups.netfee_order .qr_pay .online_pay .wei:hover,
  .popups.netfee_order .qr_pay .online_pay .wei:focus {
    color: #00C800;
  }

  .order_content .qr_pay .online_pay .active.ali,
  .order_content .qr_pay .online_pay .ali:hover,
  .order_content .qr_pay .online_pay .ali:focus,
  .popups.netfee_order .qr_pay .online_pay .ali,
  .popups.netfee_order .qr_pay .online_pay .ali:hover,
  .popups.netfee_order .qr_pay .online_pay .ali:focus {
    color: #108EE9;
  }

  .order_content .submit_order button,
  .popups.green_pop .submit_order button {
    background-color: #89C63D;
    border-radius: 0;
    font-size: 16px;
    letter-spacing: 2px;
    height: 55px;
    width: 100%;
  }

  .order_content .submit_order button:hover,
  .popups.green_pop .submit_order button:hover {
    background-color: #449d44;
  }

  .order_content .order_close,
  .popups.green_pop .order_close {

    border: 0px solid #89C63D;

    height: 30px;
    width: 30px;
    position: absolute;
    top: 0px;
    right: 0px;
  }

  .order_content .order_close button,
  .popups.green_pop .order_close button {
    display: flex;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .order_content .order_close span,
  .popups.green_pop .order_close span {
    color: #ccc;
    font-weight: bold;
    line-height: 22px;
    font-size: 20px;
  }

  .order_contentList .pro_list_container {
    max-height: 260px;
    overflow-y: auto;
    overflow-x: hidden;
  }
</style>