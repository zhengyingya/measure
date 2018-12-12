<template>
  <div class="record">
    <el-table
      :data="tableData"
      border
      stripe
      style="width:100%">
      <el-table-column
        width="60">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            :disabled="currentStep>0"
            @click="handleRemear(scope.$index)">重测</el-button>
        </template>
      </el-table-column>
      <el-table-column
        prop="size"
        label="量块名义尺寸（mm）"
        width="80">
      </el-table-column>
      <el-table-column label="研合性/外观">
        <el-table-column
          prop="upface"
          label="上工作面"
          width="60">
        </el-table-column>
        <el-table-column
          prop="downface"
          label="下工作面"
          width="60">
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="temp"
          label="温度（℃）">
      </el-table-column>
      <el-table-column
          prop="fix"
          label="标准修正量（μm）"
          width="100">
      </el-table-column>
      <el-table-column label="测量读数（μm）">
        <el-table-column
            prop="valueCenter"
            label="中心">
        </el-table-column>
        <el-table-column
            prop="valueA"
            label="a">
        </el-table-column>
        <el-table-column
            prop="valueB"
            label="b">
        </el-table-column>
        <el-table-column
            prop="valueC"
            label="c">
        </el-table-column>
        <el-table-column
            prop="valueD"
            label="d">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="detaLength"
        label="长度变动量（μm）"
        width="70">
      </el-table-column>
      <el-table-column
        prop="offsetLength"
        label="中心长度偏差（μm）"
        width="70">
      </el-table-column>
      <el-table-column
        prop="level"
        label="级"
        width="50">
      </el-table-column>
      <el-table-column
        prop="grade"
        label="等"
        width="50">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import measureData from './measureData'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'tableData',
  components: {
    measureData
  },
  props: ['configData'],
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      tableData: (state) => {
        return state.measure.tableData
      },
      currentStep: (state) => {
        return state.measure.currentStep
      }
    })
  },
  methods: {
    ...mapActions(['initTableData', 'remear', 'setRemearFlag']),
    handleRemear (index) {
      this.setRemearFlag()
      this.remear({ blockIndex: index })
    }
  },
  created () {
    this.initTableData({ configData: this.configData })
  }
}
</script>
<style lang="scss">
.record {
  .el-button--mini {
    padding: 5px 7px;
  }
}
</style>

<style lang="scss" scoped>
.record {
  padding-top: 20px;
}
</style>
