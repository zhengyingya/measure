<template>
  <div class="home">
    <Info :configIndex="configIndex"/>
    <el-row type="flex" style="height:250px;">
      <el-col class="c1">
        <div class="block">
          标准量块
          <Dot v-show="currentStep===1" style="margin:20px auto"/>
        </div>
        <div class="block">
          被测量块
          <Dot v-show="currentStep===4" style="position:absolute;top:12px;"/>
          <Dot v-show="currentStep===3" style="position:absolute;bottom:-2px;"/>
          <Dot v-show="currentStep===2" style="margin:20px auto"/>
          <Dot v-show="currentStep===5" style="position:absolute;right:0;top:12px;"/>
          <Dot v-show="currentStep===6" style="position:absolute;right:0;bottom:-2px"/>
        </div>
      </el-col>
      <el-col class="c2">
        <div class="text">
          {{(currentValue/1000).toFixed(4)}}
          <span class="fz-38">mm</span>
        </div>
      </el-col>
      <el-col class="c3">
        <el-button
          :disabled="currentStep!=0?true:false"
          type="success"
          class="btn"
          style="margin: 20px 10px;"
          @click="start"
        >开始</el-button>
        <el-button
          :disabled="currentStep>6||currentStep===0?true:false"
          type="primary"
          plain
          class="btn"
          style="margin-bottom: 20px;"
          @click="take"
        >采样</el-button>
        <el-button
          :disabled="currentStep>6||currentStep===0?true:false"
          type="warning"
          plain
          class="btn"
          @click="onZero"
        >清零</el-button>
      </el-col>
    </el-row>
    <el-row v-show="isMeasureShow" type="flex" style="height: 195px;">
      <MeasureData :configData="configData[configIndex]" :configIndex="configIndex"/>
      <i v-show="isMeasureShow" class="el-icon-arrow-up top-icon" @click="isMeasureShow=false"/>
    </el-row>
    <i v-show="!isMeasureShow" class="el-icon-arrow-down top-icon" @click="isMeasureShow=true"/>
    <el-row type="flex" style="flex:1">
      <Record :configData="configData[configIndex]"/>
    </el-row>
  </div>
</template>

<script>
import MeasureData from "./measureData";
import Record from "./record";
import Info from "@/components/Info.vue";
import Dot from "@/components/dot.vue";
import { mapState, mapActions } from "vuex";

export default {
  name: "home",
  components: {
    MeasureData,
    Record,
    Dot,
    Info
  },
  data() {
    return {
      configIndex: this.$route.params.configIndex,
      isMeasureShow: true
    };
  },
  computed: {
    ...mapState({
      temp: state => {
        return state.measure.temp;
      },
      currentStep: state => {
        return state.measure.currentStep;
      },
      configData: state => {
        return state.mearConfig.configData;
      },
      currentValue: state => {
        return state.measure.currentValue;
      }
    })
  },
  created() {
    // console.log('-----', this.$route)
    document.addEventListener("keyup", this.onKeyUp, false);
  },
  beforeDestroy() {
    document.removeEventListener("keyup", this.onKeyUp, false);
  },
  methods: {
    ...mapActions(["nextStep", "getValue", "mearStart", "zero"]),
    start() {
      if (!this.temp) {
        this.$alert("请先输入温度值", "提示", {
          confirmButtonText: "确定",
          type: "error"
        });
      } else {
        this.nextStep();
      }
    },
    take() {
      this.getValue();
      this.nextStep();
    },
    onZero() {
      this.zero();
      // this.getValue()
      // this.nextStep()
    },
    onKeyUp(val) {
      console.log(val);
      if (this.currentStep >= 1 && this.currentStep <= 6) {
        if (val.key === "6") {
          this.zero();
        } else if (val.key === "7" || val.key === " ") {
          this.take();
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  .top-icon {
    font-size: 30px;
    color: red;
    font-weight: bolder;
    text-align: right;
  }
  .c1 {
    width: 350px;
    padding: 10px 0;
    .block {
      position: relative;
      padding: 5px;
      text-align: center;
      border-radius: 0;
      background: #cccccc;
      height: 100px;
      margin-bottom: 20px;
      border: 1px solid #ebeef5;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      box-sizing: border-box;
    }
  }
  .c2 {
    flex: 1;
    .text {
      font-size: 90px;
      line-height: 250px;
      height: 250px;
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
