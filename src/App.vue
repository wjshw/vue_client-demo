<template>
<div class="user_center ">
  <div class="user_nav">
    <div class="user_info">
      <div class="basic_money"><span id="balanceTitle" class="iconfont">&#xe6a6;</span> <span id="balance" class="base_money_num">---</span>
      </div>
      <div id="awardMoney" class="award_money" title="赠费"><span class="iconfont">&#xe670;</span> <span id="memberAward">---</span></div>
      <div class="bonus" title="积分"><span class="iconfont">&#xe69f;</span> <span id="memberPoints">---</span></div>
    </div>
    <div class="top_nav">
      <ul class="nav nav-pills" role="tablist">
        <router-link tag="li" :to="{name:'index'}" active-class="active" class="ItalicNav"><a><span class="iconfont" style="font-size:14px">&#xe605;</span> 首页</a></router-link>
        <router-link tag="li" :to="{name:'beverage'}" active-class="active"  class="ItalicNav"><a><span class="iconfont">&#xe6a3;</span>影视列表</a></router-link>
        <router-link tag="li" :to="{name:'recharge'}" active-class="active"  class="ItalicNav"><a><span class="iconfont" style="padding-top: 2px">&#xe69c;</span> 网费充值</a></router-link>
        <router-link tag="li" :to="{name:'game'}" active-class="active"  class="ItalicNav"><a><span class="iconfont" style="padding-top: 2px">&#xe695;</span> 游戏中心</a></router-link>
        <router-link tag="li" :to="{name:'task'}" active-class="active"  class="ItalicNav"><a><span class="iconfont" style="padding-top: 2px">&#xe6a5;</span> 任务中心</a></router-link>
        <router-link tag="li" :to="{name:'more'}" active-class="active"  class="ItalicNav last"><a><span class="iconfont" style="padding-top: 4px">&#xe669;</span> 设置</a></router-link>
      </ul>
    </div>
    <div class="avatar"><img id="headImgUrl" :src="avatar"></div>
    <span class="close_client" onclick="Client.closeWindows()"><span class="iconfont">&#xe610;</span></span>
  </div>
  <div class="tab_container">
    <div class="tab-content">
      <router-view />
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      avatar: require('./assets/logo.png')
    }
  }
}
</script>

<style lang="scss" scoped>

$userCenter-bg-color: #96DAC1;
$nav-font-color: #fff;
$button-color: #7EC0A8; //确认按钮及滚动条颜色
$button-color-hover: #75B79F;

.user_nav {
  background-color: $userCenter-bg-color;
}

.top_nav li>a {
  color: $nav-font-color;
}

.close_client {
  background-color: rgba(0, 0, 0, .1);
  color: #fff;

  &:hover {
    background-color: rgba(0, 0, 0, .2);
  }
}
.tab_container{
  height: 550px;
}
.tab_container .tab-content,
.tab_container .tab-content .tab-pane{
  height: 100%;
}
.user_nav .user_info {
  height: 60px;
  padding-left: 130px;
  display: -webkit-flex;
  display: flex;
  align-items: center;
  color: #fff;
  border-bottom: 1px solid #C9C9C9;
  font-size: 16px
}

.user_nav .user_info>div {
  padding-right: 20px;
}

.user_nav .user_info>div.basic_money {
  font-size: 16px;
}

.user_nav .user_info>div.basic_money>.base_money_num {
  font-weight: bold;
}

.user_nav .user_info>div.award_money {
  display: none;
}

.user_nav .top_nav {
  height: 50px;
  background-color: rgba(0, 0, 0, .1);
  padding-left: 130px;
}

.user_nav .top_nav li>a {
  border-radius: 0;
  height: 50px;
  display: -webkit-flex;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user_nav .nav-pills>li+li {
  margin-left: 0px
}

.user_nav .top_nav li>a:hover,
.user_nav .top_nav li>a:focus {
  background-color: transparent;
  color: #fff;
  outline: none;
}

.user_nav .top_nav li.active>a {
  background-color: transparent;
  ;
  color: #fff;
}

.user_nav .top_nav li>a>.iconfont {
  font-size: 18px;
  margin-right: 4px;
}

.user_nav .avatar {
  position: absolute;
  width: 80px;
  height: 80px;
  top: 15px;
  left: 25px;
}

.user_nav .avatar img {
  width: 82px;
  height: 82px;
}

.user_nav .close_client {
  position: absolute;
  right: 0;
  top: 0;
  height: 25px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom-left-radius: 4px;
  z-index: 2000;
}

/*头部导航变斜线*/
.top_nav .ItalicNav {
  display: inline-block;
  padding: 0;
  border: 1px solid #eee;
  color: #333;
  border-top: 0;
  border-bottom: 0;
  border-right: 0;
  transform: skew(-20deg);

}

.top_nav .ItalicNav.last {
  border-right: 1px solid #eee;
}

.top_nav .ItalicNav a {
  transform: skew(20deg);
}

.user_nav .top_nav li:hover,
.user_nav .top_nav li:focus {
  background-color: rgba(255, 0, 0, .08);

  outline: none;
}

.user_nav .top_nav li.active {
  background-color: rgba(0, 0, 0, .08);

}

/*头部导航变斜线 end*/

.user_nav .close_client>.iconfont {
  font-size: 24px;
  height: 25px;
  line-height: 25px;
}

</style>
