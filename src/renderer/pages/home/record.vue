<template>
  <div class="record">
    <el-table
      :data="tableData3"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        label="量块名义尺寸（mm）"
        width="80">
      </el-table-column>
      <el-table-column label="研合性/外观">
        <el-table-column
          prop="name"
          label="上工作面"
          width="60">
        </el-table-column>
        <el-table-column
          prop="address"
          label="下工作面"
          width="60">
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="address"
          label="温度（℃）">
      </el-table-column>
      <el-table-column
          prop="address"
          label="标准修正量（μm）"
          width="100">
      </el-table-column>
      <el-table-column label="测量读数（μm）">
        <el-table-column
            prop="address"
            label="中心">
        </el-table-column>
        <el-table-column
            prop="address"
            label="a">
        </el-table-column>
        <el-table-column
            prop="address"
            label="b">
        </el-table-column>
        <el-table-column
            prop="address"
            label="c">
        </el-table-column>
        <el-table-column
            prop="address"
            label="d">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="address"
        label="长度变动量（μm）"
        width="70">
      </el-table-column>
      <el-table-column
        prop="address"
        label="中心长度偏差（μm）"
        width="70">
      </el-table-column>
      <el-table-column
        prop="address"
        label="级"
        width="50">
      </el-table-column>
      <el-table-column
        prop="address"
        label="等"
        width="50">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import measureData from './measureData'

export default {
  name: 'tableData',
  components: {
    measureData
  },
  data() {
    return {
      tableData3: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-08',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-07',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.record {
  padding-top: 20px;
}
</style>
