<template>
  <div class="info">
    <el-row type="flex" style="margin-bottom:0px;text-align:center;">
      <div class="label">委托单位</div>
      <div class="val">{{sampleList[configIndex].clientName}}</div>
      <div class="label">证书编号</div>
      <div class="val">{{sampleList[configIndex].certCode}}</div>
      <div class="label">型号规格</div>
      <div class="val">{{sampleList[configIndex].typeRule}}</div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "info",
  props: ["configIndex"],
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sampleList: state => {
        return state.list.sampleList;
      }
    })
  }
};
</script>
<style>
.info .el-input__inner {
  height: 45px;
  border-radius: 0;
  border: 1px solid #409eff;
  color: #409eff;
}
.custom-input .el-input__inner {
  height: 35px;
  border: 1px solid #ccc;
  color: #000;
}
</style>

<style scoped>
.info {
  padding-top: 10px;
}
.label {
  padding: 10px 15px;
  width: 80px;
  background: #409eff;
  color: #fff;
  /* border-radius: 5px 0 0 5px; */
}
.val {
  /* width: 200px; */
  padding-left: 20px;
  padding-right: 20px;
  text-align: center;
  border: 1px solid #409eff;
  color: #409eff;
  /* border-radius: 0 5px 5px 0; */
  height: 43px;
  line-height: 43px;
}
.custom-input {
  width: 120px;
}
.custom-label {
  height: 35px;
  line-height: 35px;
  color: #333;
  margin-left: 20px;
  margin-right: 10px;
}
.custom-span {
  line-height: 35px;
  margin-left: 10px;
}
</style>
