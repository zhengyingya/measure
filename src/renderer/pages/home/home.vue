<template>
  <div class="home">
    <el-row type="flex">
      <el-col class="c1">
        <div class="block">
          标准量块
        </div>
        <div class="block">
          被测量块
        </div>
      </el-col>
      <el-col class="c2">
        <div class="text">111</div>
      </el-col>
      <el-col class="c3">
          <el-button type="success" class="btn" style="margin: 20px 10px;">开始</el-button>
          <el-button type="primary" plain class="btn" style="margin-bottom: 20px;">采样</el-button>
          <el-button type="warning" plain class="btn">清零</el-button>
      </el-col>
    </el-row>
    <el-row>
      <MeasureData/>
    </el-row>
    <el-row>
      <Record/>
    </el-row>
  </div>
</template>

<script>
import MeasureData from './measureData'
import Record from './record'

export default {
  name: 'home',
  components: {
    MeasureData,
    Record
  }
}
</script>

<style lang="scss" scoped>
.home {
  padding: 0 40px;
  .c1 {
    width: 350px;
    padding: 20px 0;
    .block {
      padding: 5px;
      text-align: center;
      border-radius: 0;
      background: #CCCCCC;
      height: 100px;
      margin-bottom: 20px; 
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-sizing: border-box;
    }
  }
  .c2 {
    flex: 1;
    .text {
      font-size: 90px;
      line-height: 280px;
      text-align: center;
    }
  }
  .c3 {
    width: 180px;
    .btn {
      width: 150px;
      height: 60px;
      font-size: 22px;
    }
  }
}
</style>
