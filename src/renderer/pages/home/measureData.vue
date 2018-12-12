<template>
  <div class="measure-data">
    <el-row type="flex">
      <el-col class="c1">
        <el-row type="flex" style="margin-bottom: 10px;">
          <div class="label">当前量块</div>
          <div class="val fz-24" style="color:red;font-weight:900">{{currentMearBlock+1}}</div>
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px;">
          <div class="label">标称值</div>
          <div class="val">{{configData.data[currentMearBlock].size}}</div>
        </el-row>
        <el-row type="flex">
          <div class="label">温度</div>
          <el-input v-model="temp" class="val" @change="tempChange"></el-input>
        </el-row>
      </el-col>
      <el-col class="c2">
        <div class="block">
            <el-row type="flex">
              <el-col :span="12">
                <div>{{valueA}}</div>
              </el-col>
              <el-col :span="12">
                <div class="text-r">{{valueB}}</div>
              </el-col>
            </el-row>
            <el-row type="flex">
                <div style="width:100%;text-align:center">{{valueCenter}}</div>
            </el-row>
            <el-row type="flex">
              <el-col :span="12">
                <div>{{valueC}}</div>
              </el-col>
              <el-col :span="12">
                <div class="text-r">{{valueD}}</div>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col class="c3">
        <!-- <el-button type="warning" icon="el-icon-arrow-left" circle></el-button>
        <el-button type="warning" icon="el-icon-arrow-right" :disabled="currentStep===7" circle></el-button> -->
        <el-row><el-button :disabled="currentStep<=6" type="danger" style="margin-top:0px;" @click="onRemear">重测</el-button></el-row>
        <el-row><el-button :disabled="currentStep<=6" type="primary" style="margin-top:10px;" @click="onNext">下一块</el-button></el-row>
        <el-row v-if="isOver"><el-button type="success" style="margin-top:10px;" @click="onNext">提交</el-button></el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'measureData',
  props: ['configData'],
  data () {
    return {
      temp: '',
      isOver: false
    }
  },
  computed: {
    ...mapState({
      standard: (state) => {
        return state.measure.standard
      },
      currentStep: (state) => {
        return state.measure.currentStep
      },
      currentMearBlock: (state) => {
        return state.measure.currentMearBlock
      },
      historyBlock: (state) => {
        return state.measure.historyBlock
      },
      valueCenter: (state) => {
        return state.measure.valueCenter
      },
      valueA: (state) => {
        return state.measure.valueA
      },
      valueB: (state) => {
        return state.measure.valueB
      },
      valueC: (state) => {
        return state.measure.valueC
      },
      valueD: (state) => {
        return state.measure.valueD
      }
    })
  },
  methods: {
    ...mapActions(['changeTemp', 'remear', 'setTableData', 'nextBlock']),
    tempChange (value) {
      this.changeTemp({ temp: value })
    },
    onRemear () {
      this.$confirm('是否确认重测?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.remear({ blockIndex: this.currentMearBlock })
      })
    },
    onNext () {
      if (this.historyBlock >= this.configData.data.length - 1) {
        this.isOver = true
        this.$message({
          message: '测量已完成，请点击提交生成原始记录',
          type: 'success',
          duration: 5000
        })
      }
      this.setTableData()
      this.nextBlock()
      if (this.historyBlock < this.configData.data.length - 1) {
        
      }
    }
  }
}
</script>
<style lang="scss">
.measure-data {
  .el-input__inner {
    height: 43px;
    border: 0 solid;
    border-radius: 0 5px 5px 0;
    text-align: center;
    color: #409eff;
  }
}
</style>
<style lang="scss" scoped>
.measure-data {
  .c1 {
    width: 350px;
    padding: 0;
    .label{
      padding: 10px 15px;
      width: 80px;
      background: #409eff;
      color: #fff;
      border-radius: 5px 0 0 5px;
    }
    .val {
      width: 80px;
      text-align: center;
      border: 1px solid #409eff;
      color: #409eff;
      border-radius: 0 5px 5px 0;
      height: 43px;
      line-height: 43px;
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
