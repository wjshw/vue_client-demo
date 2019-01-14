<template>
<div class="tab-pane active index_page" id="userIndex">
  <div>
    <div class="left_info">
      <div class="my_coupon">
        <a href="#" onclick="Client.openCoupon()">
          <div class="my_coupon_title"><span class="iconfont">&#xe62f;</span> 我的卡券</div>
          <div class="my_coupon_num"><span id="couponNum">0</span>
            <div> 张</div><span class="iconfont">&#xe61e;</span>
          </div>
        </a>
      </div>
      <div class="online_detail">
        <h5><span class="iconfont">&#xe678;</span> 上网信息</h5>
        <ul>
          <li>开始时间：<span id="beginTime">---</span></li>
          <li>结束时间：<span id="endTime">---</span></li>
          <li>消费方式：<span id="costType">---</span></li>
          <li>所在区域：<span id="district">---</span></li>
          <li>使用机器：<span id="machine">---</span></li>
          <li>上网时长：<span id="onlineTime">---</span></li>
          <li>上网消费：<span id="onlineFee">---</span> 元</li>
        </ul>
      </div>
    </div>
    <div class="right_info">
      <div class="announcement clearfix">
        <div class="turntable_tips">
          <div class="turntable_tips_img"></div>
          <div class="turntable_text">
            <p>若抽奖次数已用完，请明天继续</p>
          </div>
        </div>
        <div class="turntable_container">
          <!-- @include('client/usercenter/turntable') -->
        </div>
      </div>
      <div class="slogan">
        <p></p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
/*  index  */
.index_page>div{
  display: flex;
  height: 100%;
}
.index_page .left_info{
  width: 300px;
  padding:10px 15px 0;
  height: 100%;
}
.index_page .left_info>div{
  width: 100%;
}
.index_page .left_info .my_coupon{
  height: 50px;
  margin-bottom: 5px;
}
.index_page .left_info .my_coupon>a{
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  height: 100%;
}
.index_page .left_info .my_coupon>a:hover,
.index_page .left_info .my_coupon>a:focus{
  text-decoration: none;
}
.index_page .left_info .my_coupon .my_coupon_title>.iconfont{
  display: inline-block;
  width: 16px;
  margin-left: -5px;
  margin-right: 5px;
}
.index_page .left_info .my_coupon .my_coupon_num{
  display: flex;
}
.index_page .left_info .my_coupon .my_coupon_num>div{
  margin-left: 4px;
  margin-right: 2px;
}
.index_page .left_info .online_detail{
  height: calc(100% - 55px);
  padding: 15px 20px;
  color: #333;
}
.index_page .left_info .online_detail>h5{
  margin-top: 0;
}
.index_page .left_info .online_detail ul{
  list-style: none;
  padding: 0;
  line-height: 2.4;
}
.index_page .right_info{
  width: calc(100% - 300px);
  height: 100%;
}
.index_page .right_info .announcement{
  height: calc(100% - 80px);
}
.index_page .right_info .announcement>div{
  float: left;
  width: 50%;
  height: 100%;
}
.index_page .right_info .announcement .turntable_tips_img{
  text-align: right;
  margin-top: 80px;
  height: 145px;
  background-repeat: no-repeat;
  background-position: right;
}
.index_page .right_info .announcement .turntable_text{
  margin-top: 30px;
  padding-left: 110px;
  font-size: 16px;
  font-family: "microsoft Yahei";
}
.index_page .right_info .announcement .turntable_container{
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  position: relative;
}
.index_page .right_info .slogan{
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.index_page .right_info .slogan>p{
  margin: 0;
  font-size: 24px;
  font-weight: bold;
}
.index_page{
        background-color: #f1f1f1;
        .left_info{
            background-color: rgba(255, 255, 255 , .1);
            >div{
                background-color: #fff;
            }
        }
        .right_info{
            .announcement{
                background-color: #E0F3EC;
                .turntable_tips_img{
                    background-image: url("../../assets/img/turntableimg-spring.png");
                }
                .turntable_text{
                   color: #83BFA9;
                }
                .turntable_img{
                    background-image: url("../../assets/img/turntable-spring.png");
                }
                .turntable_pointer{
                    background-image: url("../../assets/img/pointer-spring.png");
                }
            }
            .slogan{
                background-color: #fff;
                p{
                    color:#83BFA9;
                }
            }
        }
    }
</style>
