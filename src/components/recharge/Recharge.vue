<template>
    <div class="tab-pane active netfee_page">
        <div class="netfee">
    <div class="netfee_content">
        <input type="text" style="display:none;" id="shopInfo" value="" />
        <div class="recharge">
            <div class="recharge_content">
                <div class="netfee_money" id="rechargeCompaignList">
                </div>
            </div>
        </div>
    </div>
    <div class="netfee_submit">
        <div class="fee_submit">
            <p>您的实际支付： <span><em id="totalPriceTxt">0.00</em></span> 元</p>
            <button onclick="Netfee.nextStepClick();">下一步</button>
            <div></div>
        </div>
    </div>
</div>
    </div>
</template>

<script>
export default {
  name: 'Recharge',
}
</script>

<style lang="scss" scoped>

.netfee_page .netfee {
  background-image: none;
  height: 100%;
  width: 100%;
  padding-top: 30px;
}
.netfee_page .netfee .netfee_content{
  width: 100%;
  padding: 0 32px;
  height: 520px;
  padding-bottom: 70px;
}
.netfee_page .netfee .recharge{
  height: calc(100% - 120px);
}
.netfee_page .netfee .recharge .recharge_content{
  height: calc(100% - 37px);
  overflow-x: hidden;
  overflow-y: auto;
}
.netfee_page .netfee .netfee_money{
  display: flex;
  flex-wrap: wrap;
  margin-right: -8px;
}
.netfee_page .netfee .netfee_money .netfee_num,
.netfee_page .netfee .netfee_money .netfee_input_num{
  margin-bottom: 6px;
  margin-right: 6px;
  height: 116px;
  width: 116px;
  position: relative;
}
.netfee_page .netfee .netfee_money .netfee_num>p{
  text-align: center;
  line-height: 86px;
  height: 111px;
  padding-bottom: 35px;
  margin-bottom: 0;
  font-size: 36px;
  font-weight: bold;
}
.netfee_page .netfee .netfee_money .netfee_num .fee_send{
  position: absolute;
  height: 35px;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.netfee_page .netfee .netfee_money .netfee_num .fee_send>p{
  margin-bottom: 0;
}
.netfee_page .netfee .netfee_num .netfee_check{
  cursor: pointer;
  position: absolute;
  width: 14px;
  height: 14px;
  top: 4px;
  right: 4px;
  border-radius: 4px;
}
.netfee_page .netfee .netfee_num .netfee_check>span{
  opacity: 0;
  position: absolute;
  width: 9px;
  height: 5px;
  background: transparent;
  top: 1px;
  right: 0;
  margin-top: 2px;
  margin-right: 2px;

  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.netfee_page .netfee .netfee_money .netfee_input_num{
  position: initial;
  padding: 8px;
}
.netfee_page .netfee .netfee_input_num input{
  height: 100%;
  width: 100%;
  border: 1px solid transparent;
  color: #404040;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.netfee_page .netfee .netfee_input_num input::-webkit-input-placeholder{
  font-size: 14px;
  font-weight: initial;
  text-align: center;
}
.netfee_page .netfee .netfee_input_num input::-webkit-outer-spin-button,
.netfee_page .netfee .netfee_input_num input::-webkit-inner-spin-button{
  -webkit-appearance: none !important;
  margin: 0;
}
.netfee_page .netfee .recharge button{
  padding-left: 0;
}
.netfee_page .netfee .netfee_submit{
  padding:0 18px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 90px;
}
.netfee_page .netfee .fee_submit{
  height: 100%;
  width: 100%;
  padding: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.netfee_page .netfee .fee_submit>p{
  font-size: 16px;
  margin-bottom: 0;
  margin-right: 80px;
}
.netfee_page .netfee .fee_submit>p>span{
  font-weight: bold;
}
.netfee_page .netfee .fee_submit>button{
  height: 34px;
  width: 100px;
  color: white;
  border-radius: 30px;
  border:0;
}

.netfee_page {
  .netfee {
    .netfee_money {
      .netfee_num {
        background-color: #fff;
        border: 1px solid #e4e4e4;
        color: #333;

        &.selected,
        &:hover {
          border: 1px solid #73c1a4;
          color: #73c1a4;

          .fee_send {
            background-color: #73c1a4;
            color: #fff;
          }
        }

        &:hover {
          .netfee_check {
            background-color: #fff;
          }
        }

        &.selected {
          .netfee_check {
            background-color: #73c1a4;
          }
        }

        .fee_send {
          background-color: #e4e4e4;
          color: #333;
        }

        .netfee_check {
          >span {
            border: 2px solid #fff;
            border-top: none;
            border-right: none;
          }
        }
      }
    }

    .netfee_submit {
      background-color: #DCEEE7;
    }
  }
}
</style>
