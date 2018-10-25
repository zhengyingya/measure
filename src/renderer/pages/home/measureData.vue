<template>
  <div class="measure-data">
    <el-row type="flex">
      <el-col class="c1">
        <el-row type="flex" style="margin-bottom: 20px;">
          <div class="label">标称值</div>
          <div class="val">12</div>
        </el-row>
        <el-row type="flex">
          <div class="label">温度</div>
          <div class="val">21</div>
        </el-row>
      </el-col>
      <el-col class="c2">
        <div class="block">
            <el-row type="flex">
              <el-col :span="12">
                <div>1</div>
              </el-col>
              <el-col :span="12">
                <div class="text-r">2</div>
              </el-col>
            </el-row>
            <el-row type="flex">
                <div style="width:100%;text-align:center">3</div>
            </el-row>
            <el-row type="flex">
              <el-col :span="12">
                <div>4</div>
              </el-col>
              <el-col :span="12">
                <div class="text-r">5</div>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col class="c3">
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'measureData'
}
</script>

<style lang="scss" scoped>
.measure-data {
  .c1 {
    width: 350px;
    padding: 20px 0;
    .label{
      padding: 10px 15px;
      width: 80px;
      background: #409eff;
      color: #fff;
      border-radius: 5px 0 0 5px;
    }
    .val {
      padding: 10px 15px;
      width: 80px;
      text-align: center;
      border: 1px solid #409eff;
      color: #409eff;
      border-radius: 0 5px 5px 0;
    }
  }
  .c2 {
    display: flex;
    flex: 1;
    justify-content: center;
    .block {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      padding: 10px;
      width: 400px;
      height: 120px;
    }
  }
  .c3 {
    width: 150px;
  }
}
</style>
