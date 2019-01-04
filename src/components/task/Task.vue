<template>
<div class="tab-pane active task_page">
  <div class="daily_task">
    <div class="task_header">
      <div class="left_progress">
        <p>今日已完成任务</p>
        <div class="progress">
          <div class="progress-bar" role="progressbar" :style="{width: taskList.count/taskList.num*100+'%'}">
          </div>
        </div>
      </div>
      <div class="right_progress">
        <div>
          <div class="level" :class="{active: key<=taskList.count}" v-for="(award,key) in taskList.award" :key="key" :style="progressPos(key)">
            <div class="popover top">
              <div class="arrow"></div>
              <div class="popover-content">
                <p>{{award.award}}</p>
              </div>
            </div>
            <div class="point">{{key}}</div>
          </div>
        </div>
        <div class="progress_container">
          <div class="progress">
            <div class="progress-bar" :style="{width: taskList.count/taskList.num*100+'%'}">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="task_container" v-if="taskList.result == 0">
      <ul class="media-list">
        <li class="media" v-if="taskList.info[1].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-recharge.png" alt="recharge">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日充值</h4>
            <p>完成一次线上网费充值</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[1].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
        <li class="media" v-if="taskList.info[2].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-ordered.png" alt="ordered">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日点单</h4>
            <p>完成一次线上水吧点单</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[2].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
        <li class="media" v-if="taskList.info[3].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-start.png" alt="start">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日上机</h4>
            <p>完成一次上机活动</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[3].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
        <li class="media" v-if="taskList.info[4].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-share.png" alt="share">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日分享</h4>
            <p>在我的页面分享到朋友圈</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[4].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
        <li class="media" v-if="taskList.info[5].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-pubg.png" alt="pubg">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日吃鸡</h4>
            <p>在绝地求生游戏中，完成一次吃鸡</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[5].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
        <li class="media" v-if="taskList.info[6].use == 1">
          <div class="media-left">
            <img class="media-object" src="../../assets/img/task/task-lol.png" alt="lol">
          </div>
          <div class="media-body">
            <h4 class="media-heading">每日双杀</h4>
            <p>在LOL中,完成一次双杀</p>
          </div>
          <div class="media-right">
            <div class="label label-active" v-if="taskList.info[6].state == 1">已完成</div>
            <div class="label label-default" v-else>未完成</div>
          </div>
        </li>
      </ul>
    </div>
    <div class="task_empty" v-else>
      <div><span class="iconfont">&#xe690;</span></div>
      <p>本网吧暂未开启任务中心</p>
    </div>
  </div>
</div>
</template>

<script>
  export default {
    name: 'Task',
    data(){
      return {
        taskList: {},
      }
    },
    created(){
      this.getTaskList()
    },
    methods: {
      getTaskList(){
        let url = 'yun/cashier/user/selectdaytask'
        let params = this.$store.getters.yunInit

        this.$axios.post(url,params)
        .then(res => {
          console.log(res)
          res.data.count = 2
          this.taskList = res.data
        })
        .catch(err => {
          console.log(err)
        })
      },
      progressPos(idx){
        let pos = (parseInt(idx)/this.taskList.num)*100+'%'
        return {left: pos}
      }
    }
  }

</script>

<style lang="scss" scoped>
  .task_page .daily_task {
    height: 100%;
  }

  .task_page .daily_task .task_empty {
    display: flex;
    justify-content: center;
    -ms-align-items: center;
    align-items: center;
    flex-direction: column;
    color: #999;
    height: 90%;
  }

  .task_page .daily_task .task_empty .iconfont {
    font-size: 150px;
  }

  .task_page .daily_task .task_empty>p {
    font-size: 18px;
  }

  .task_page .task_header {
    border-bottom: 1px solid #ccc;
    padding: 20px 30px;
    height: 100px;
    display: flex;
    justify-content: space-around;
  }

  .task_page .task_header .left_progress {
    flex: none;
    width: 35%;
    padding-top: 5px;
  }

  .task_page .task_header .left_progress p {
    margin-bottom: 15px;
  }

  .task_page .task_header .left_progress .progress .progress-bar {
    background-image: linear-gradient(45deg, rgba(255, 255, 255, .15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, .15) 50%, rgba(255, 255, 255, .15) 75%, transparent 75%, transparent);
    background-size: 40px 40px;
  }

  .task_page .task_header .right_progress {
    flex: none;
    width: 55%;
    position: relative;
  }

  .task_page .task_header .right_progress .progress_container {
    margin-top: 50px;
  }

  .task_page .task_header .right_progress .progress_container .progress {
    height: 4px;
  }

  .task_page .task_header .right_progress .level {
    position: absolute;
  }

  .task_page .task_header .right_progress .level .popover {
    display: block;
    width: 80px;
    height: 40px;
    margin-left: -40px;
  }

  .task_page .task_header .right_progress .level .popover .popover-content {
    padding: 4px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    line-height: 1.1;
    height: 100%;
  }

  .task_page .task_header .right_progress .level .popover .popover-content p {
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    overflow: hidden;
  }

  .task_page .task_header .right_progress .level .point {
    position: absolute;
    width: 12px;
    height: 12px;
    background-color: #fff;
    box-shadow: 0 0 0 3px #ebebeb;
    border-radius: 50%;
    color: #ccc;
    margin-left: -6px;
    top: 46px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
  }

  .task_page .task_container {
    padding: 6px 15px;
    height: calc(100% - 100px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .task_page .task_container>ul {
    margin-bottom: 0;
  }

  .task_page .task_container .media {
    border-bottom: 1px solid #ccc;
    padding-bottom: 10px;
  }

  .task_page .task_container .media .media-left img {
    height: 64px;
    width: 64px;
    border-radius: 50%;
  }

  .task_page .task_container .media .media-body {
    width: 1000px;
  }

  .task_page .task_container .media .media-right {
    font-size: 14px;
    vertical-align: middle;
  }

  .task_page .task_container .media .media-right .label {
    font-size: 14px;
    border-radius: 50px;
  }

  .task_page {
    .task_header {
      .left_progress {
        .progress {
          .progress-bar {
            background-color: #86CCB2;
          }
        }
      }

      .right_progress {
        .progress_container {
          .progress {
            .progress-bar {
              background-color: #86CCB2;
            }
          }
        }

        .level {
          &.active {
            .popover {
              border-color: #86CCB2;
              color: #86CCB2;

              .arrow {
                border-top-color: #86CCB2;
              }
            }

            .point {
              background-color: #86CCB2;
              color: #fff;
            }
          }
        }
      }
    }

    .task_container {
      .label {
        &.label-active {
          background-color: #86CCB2;
        }
      }
    }
  }

</style>
