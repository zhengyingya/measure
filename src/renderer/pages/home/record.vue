<template>
  <div class="record">
    <el-table
      :data="tableData"
      border
      stripe
      height="100%"
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
        label="量块名义尺寸（mm）">
      </el-table-column>
      <el-table-column label="研合性/外观">
        <el-table-column
          prop="upface"
          label="上工作面"
          width="80">
          <template slot-scope="scope">
            <el-select v-if="scope.row.upface" v-model="scope.row.upface" style="width:100%" @change="faceSelectChange(scope.row.upface, 'upface', scope.$index)">    
              <el-option
                v-for="item in faceSelectOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column
          prop="downface"
          label="下工作面"
          width="80">
          <template slot-scope="scope">
            <el-select v-if="scope.row.downface" v-model="scope.row.downface" style="width:100%" @change="faceSelectChange(scope.row.downface, 'downface', scope.$index)">    
              <el-option
                v-for="item in faceSelectOptions"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
          prop="temp"
          label="温度（℃）"
          width="90">
      </el-table-column>
      <el-table-column
          prop="fix"
          label="标准修正量（μm）"
          width="100">
      </el-table-column>
      <el-table-column label="测量读数（μm）">
        <el-table-column
            prop="valueCenter"
            label="中心"
            width="80">
        </el-table-column>
        <el-table-column
            prop="valueA"
            label="a"
            width="80">
        </el-table-column>
        <el-table-column
            prop="valueB"
            label="b"
            width="80">
        </el-table-column>
        <el-table-column
            prop="valueC"
            label="c"
            width="80">
        </el-table-column>
        <el-table-column
            prop="valueD"
            label="d"
            width="80">
        </el-table-column>
      </el-table-column>
      <el-table-column
        prop="detaLength"
        label="长度变动量（μm）">
      </el-table-column>
      <el-table-column
        prop="offsetLength"
        label="中心长度偏差（μm）">
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
      faceSelectOptions: ['vh', 'h', 'p', 'x', 'nh'],
      upfaceSelect: 'vh',
      downfaceSelect: 'vh'
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
    ...mapActions(['initTableData', 'remear', 'setRemearFlag', 'setTableDataScrap', 'setTableDataRestore']),
    handleRemear (index) {
      this.setRemearFlag()
      this.remear({ blockIndex: index })
    },
    faceSelectChange (value, key, index) {
      console.log(value, key, index)
      if (value !== 'vh') {
        this.setTableDataScrap({
          key,
          value,
          index
        })
      } else {
        this.setTableDataRestore({
          index
        })
      }
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
  .el-input {
    .el-input__inner {
      height: 30px;
      line-height: 30px;
      font-size: 12px;
      padding: 0 10px;
      /* text-align: center; */
    }
    .el-input__suffix {
      right: -2px;
    }
    i {
      line-height: 30px;
      margin-left: 15px;
    }
  }
}
</style>

<style lang="scss" scoped>
.record {
  width: 100%;
  padding: 20px 0;
  box-sizing: border-box;
}
</style>
