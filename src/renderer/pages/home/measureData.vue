<template>
  <div class="measure-data">
    <el-row type="flex">
      <el-col class="c1">
        <el-row type="flex" style="margin-bottom: 20px;">
          <div class="label">标称值</div>
          <div class="val">{{standard}}</div>
        </el-row>
        <el-row type="flex">
          <div class="label">温度</div>
          <el-input v-model="temp" class="val" @change="tempChange"></el-input>
        </el-row>
        <el-row type="flex">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
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
        
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'measureData',
  data () {
    return {
      temp: ''
    }
  },
  computed: {
    ...mapState({
      standard: (state) => {
        return state.measure.standard
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
    ...mapActions(['changeTemp']),
    tempChange (value) {
      this.changeTemp({ temp: value })
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
    padding: 20px 0;
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
