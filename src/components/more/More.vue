<template>
<div class="tab-pane active function_page">
  <div class="more_func">
    <div class="more_func_content clearfix">
      <div id="clientCheckout" class="func_btn">
        <a href="" data-toggle="modal" onclick="Client.memberTrySubmit()">
          <img src="../../assets/img/more/shutdown.png">
          <p>结账下机</p>
        </a>
      </div>
      <div class="func_btn">
        <a href="" data-toggle="modal" data-target="#callModal">
          <img src="../../assets/img/more/call.png">
          <p>呼叫网管</p>
        </a>
      </div>
      <div class="func_btn">
        <a href="" data-toggle="modal" data-target="#lockCom">
          <img src="../../assets/img/more/lock.png">
          <p>挂机</p>
        </a>
      </div>
      <div class="func_btn">
        <a href="" data-toggle="modal" onclick="Client.openPeriod();">
          <img src="../../assets/img/more/period.png">
          <p>转包时</p>
        </a>
      </div>
      <div id="changePwdBtn" class="func_btn change_Pwd_Btn">
        <a href="" data-toggle="modal" data-target="#changePwd">
          <img src="../../assets/img/more/password.png">
          <p>修改密码</p>
        </a>
      </div>
      <div class="func_btn">
        <a href="" data-toggle="modal" data-target="#leaveMessage">
          <img src="../../assets/img/more/message.png">
          <p>留言</p>
        </a>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'More',
}
</script>

<style lang="scss" scoped>
.function_page .more_func .more_func_content{
  width: 900px;
  margin-left: 62.5px;
  padding-top: 30px;
}
.function_page .more_func .more_func_content .func_btn{
  -webkit-box-shadow: 0 0 5px 0 #ccc; 
  box-shadow: 0 0 5px 0 #ccc; 
  width: 145px;
  height: 145px;
  float: left;
  margin-left: 35px;
  margin-top: 30px;
  /* border-width: 1px;
  border-style: solid;
  font-size: 16px */
}
.function_page .more_func .more_func_content .func_btn.change_Pwd_Btn{
  display: none;
}
/* .function_page .more_func .more_func_content .func_btn.btn1{
  border-color:#df9833;
}
.function_page .more_func .more_func_content .func_btn.btn2{
  border-color:#3da2dc;
}
.function_page .more_func .more_func_content .func_btn.btn3{
  border-color:#d84267;
}
.function_page .more_func .more_func_content .func_btn.btn4{
  border-color:#8832de;
}
.function_page .more_func .more_func_content .func_btn.btn5{
  border-color:#7ba2cd;
}
.function_page .more_func .more_func_content .func_btn.btn6{
  border-color:#86ccb2;
} */
.function_page .more_func .more_func_content .func_btn:hover{
  background-color: #f8f8f8;
}
.function_page .more_func .more_func_content .func_btn a{
  display: flex;
  justify-content: space-around;
  align-items: center;
  -webkit-flex-direction: column;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 100%;
  text-decoration: none;
}
.function_page .more_func .more_func_content .func_btn a img{
  height: 70px;
  width: 70px;
  border-radius: 50%;
}
.function_page .more_func .more_func_content .func_btn a p{
  color: #333;
  margin: 0;
}
.function_page .more_func .modal-dialog{
  margin-top: 160px;
}
.function_page .more_func .modal-dialog label{
  font-weight: normal;
  padding-right: 0;
}
.user_center .more_func .modal-body .form-horizontal{
  padding-top: 15px;
}
</style>
