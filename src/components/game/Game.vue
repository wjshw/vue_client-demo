<template>
  <div class="tab-pane active game_page">
    <div id="gameId" class="panel-subNav game-nav">
      <div class="btn-group waterbarViewList" role="group">
        <button type="button" class="btn btn-sm btn-default active" role="tab" data-toggle="tab" data-target="#game-activity"
          onclick="javarscript:$(this).addClass('active');$(this).siblings().removeClass('active')">活动</button>
        <button type="button" class="btn btn-sm btn-default " role="tab" data-toggle="tab" data-target="#game-ranking"
          onclick="Game.openRankingPanel(this)">排行</button>
      </div>
    </div>
    <div class="tab-content">
      <a href="#game-activity" id="openGame" data-toggle="tab" style="display: none;"></a>
      <div role="tabpanel" class="tab-pane fade in active gameActivity" id="game-activity">
        <div class="game">
          <div class="row game_content">
            <div class="col-xs-4 reward_list">
              <h5>最新获奖列表</h5>
              <div id="rewardTable" class="reward_table">
              </div>
            </div>
            <div class="col-xs-8 active_list">
              <nav class="active_nav">
                <ul class="nav nav-pills" role="tablist">
                  <li role="presentation" class="active"><a href="#ongoingActivity" role="tab" data-toggle="tab">进行中的活动</a></li>
                </ul>
              </nav>
              <div class="tab-content">
                <div role="tabpanel" class="tab-pane fade in active" id="ongoingActivity">
                </div>
                <div role="tabpanel" class="tab-pane fade" id="otherActivity">
                  <div class="active_container">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div role="tabpanel" class="tab-pane fade game_ranking" id="game-ranking">
        <div class="row">
          <div class="col-xs-12 activity_ranking">
            <div class="ranking_container">
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6cd;</span> 杀敌排行</h5>
                <div id="killTable" class="kill_talbe">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6cd;</span> 吃鸡排行</h5>
                <div id="chickenTable" class="chicken_table">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6c9;</span> 超神排行</h5>
                <div id="legendaryTable" class="chicken_table">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6c9;</span> 双杀排行</h5>
                <div id="doubleKillTable" class="chicken_table">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6c9;</span> 三杀排行</h5>
                <div id="tripleKillTable" class="chicken_table">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6c9;</span> 四杀排行</h5>
                <div id="quadraKillTable" class="chicken_table">
                </div>
              </div>
              <div class="ranking_list">
                <h5><span class="iconfont">&#xe6c9;</span> 五杀排行</h5>
                <div id="pentaKillTable" class="chicken_table">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Game',
  }
</script>

<style lang="scss" scoped>
.game_page {
  height: 100%;
  border: 10px solid #f1f1f1;
}

.game_page .panel-subNav {
  border-bottom: 1px solid #ebebeb;
}

.game_page .panel-subNav+.tab-content {
  height: calc(100% - 50px);
}

.game_page .game {
  height: 100%;
  width: 100%;
}

.game_page .game_content {
  margin: 0;
  height: 100%;
  width: 100%;
}

.game_page .game_content .reward_list {
  border-right: 1px solid #f1f1f1;
  height: 100%;
  padding-bottom: 20px;
  padding-top: 20px;
  padding-right: 0;
}

.game_page .game_content .reward_list .reward_table {
  height: calc(100% - 45px);
  margin-top: 20px;
  padding-right: 15px;
  overflow-x: hidden;
  overflow-y: auto;
}

.game_page .game_content .reward_list th {
  text-align: center;
}

.game_page .game_content .reward_list tbody tr:nth-child(odd) {
  color: #418BCA;
}

.game_page .game_content .reward_list tbody tr:nth-child(even) {
  color: #FF9933;
}

.game_page .no_award {
  height: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.game_page .no_award .no_award_img {
  width: 180px;
  margin-bottom: 20px;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -ms-align-items: center;
  align-items: center;
}

/*.game_page .no_award .no_award_img span{
  font-size: 5rem;
  color: #dbdbdb;
}*/
.game_page .no_award .no_award_img img {
  width: 180px;
}

.game_page .no_award p {
  color: #999;
  margin-bottom: 30px;
}

.game_page .game_content .active_list {
  padding-bottom: 20px;
  padding-top: 20px;
  height: 100%;
}

.game_page .game_content .active_list .active_nav {
  padding-top: 10px;
}

.game_page .game_content .active_list .active_nav li a {
  background-color: transparent;
  color: #999;
  padding-bottom: 0;
  padding-top: 0;
}

.game_page .game_content .active_list .active_container {
  margin-left: -10px;
  padding-top: 15px;
  height: calc(100% - 30px);
  overflow-x: hidden;
  overflow-y: auto;
}

.game_page .game_content .active_list .active_container .no_acitivty {
  height: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
}

.game_page .game_content .active_list .active_container .no_acitivty .no_activity_img {
  margin-bottom: 20px;
  width: 180px;
}

.game_page .game_content .active_list .active_container .no_acitivty .no_activity_img img {
  width: 180px;
}

.game_page .game_content .active_list .active_container .no_acitivty p {
  color: #999;
  margin-bottom: 30px;
}

.game_page .game_content .active_list .active_item {
  display: inline-block;
  width: 320px;
  margin-bottom: 10px;
  margin-left: 10px;
  box-shadow: 0 0 5px #ccc;
}

.game_page .game_content .active_list .active_item .active_item_head {
  text-align: center;
  padding: 5px;
}

.game_page .game_content .active_list .active_item .active_item_body {
  padding: 10px 15px;
}

.game_page .game_content .active_list .active_item .active_item_body .form-group {
  margin-bottom: 0;
}

.game_page .game_content .active_list .active_item .active_item_body label {
  font-weight: normal;
  padding-left: 0;
  padding-right: 0;
}

.game_page .game_content .active_list .active_item .active_item_body p {
  padding-left: 0;
  padding-bottom: 0;
}

.game_page .game_content .active_list .active_item .active_item_body p.active_time {
  padding-top: 0;
}

.game_page .game_content .active_list .active_item .active_item_body .active_award_num {
  color: #f15352;
}

.game_page .game_content .active_list .no_activity {
  height: 100%;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flex;
  display: -o-flex;
  display: flex;
  justify-content: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-flex-direction: column;
  -moz-flex-direction: column;
  -ms-flex-direction: column;
  -o-flex-direction: column;
  flex-direction: column;
}

.game_page .game_content .active_list .no_activity .no_activity_img {
  width: 160px;
  margin-bottom: 20px;
}

.game_page .game_content .active_list .no_activity .no_activity_img>img {
  width: 100%;
}

.game_page .game_content .active_list .no_activity p {
  color: #999;
  margin-bottom: 40px;
}

.game_page .game_ranking {
  padding-left: 15px;
  padding-right: 15px;
}

.game_page .game_ranking .row {
  height: 100%;
}

.game_page .game_ranking h5 {
  font-size: 16px;
}

.game_page .game_ranking .activity_ranking,
.game_page .game_ranking .activity_ranking .ranking_container,
.game_page .game_ranking .activity_ranking .ranking_container .ranking_list {
  height: 100%;
}

.game_page .game_ranking .activity_ranking .ranking_container {
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
}

.game_page .game_ranking .activity_ranking .ranking_container .ranking_list {
  flex: none;
  width: 40%;
  padding: 0 15px 15px 15px;
  border-right: 1px solid #ebebeb;
}

.game_page .game_ranking .activity_ranking .kill_talbe,
.game_page .game_ranking .activity_ranking .chicken_table {
  height: calc(100% - 35px);
  overflow-x: hidden;
  overflow-y: auto;
}

.game_page .game_ranking table th {
  text-align: center;
}

.game_page {
  .game {
    .game_content {
      .reward_list {
        h5 {
          color: #86CCB2;
        }
      }

      .active_list {
        .active_nav {
          li {
            &.active {
              a {
                color: #86CCB2;
              }
            }
          }
        }

        .active_item {
          .active_item_head {
            background-color: #86CCB2;
            color: #fff;
          }
        }
      }
    }
  }

  .game_ranking {
    .ranking_list {
      h5 {
        color: #86CCB2;
      }

      table {
        tr {
          >th {
            background-color: #86CCB2;
            color: #fff;
          }
        }
      }
    }
  }
}
</style>