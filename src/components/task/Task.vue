<template>
  <div class="tab-pane active task_page">
    <div id="dailyTask" class="daily_task">
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Task',
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
    /*background-color: #eb7e47;*/
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
