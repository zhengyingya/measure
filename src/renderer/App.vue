<template>
  <div id="app">
    <!-- <button @click="onclick">aaa</button> -->
    <Header/>
    <div class="wrap">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from "./components/header";
import comNedb from "../database/comNedb";
import { mapActions } from "vuex";
import { setInterval } from "timers";
export default {
  name: "measure",
  components: {
    Header
  },
  methods: {
    ...mapActions(["intervalValue"]),
    onclick() {
      this.intervalValue();
    }
  },
  created() {
    comNedb.find({ type: "mearSensor" }).then(res => {
      if (res.length === 0) {
        this.$alert("请到配置菜单初始化配置", "提示", {
          confirmButtonText: "确定"
        });
      } else {
        const sensorCom = res[0].portName;
        console.log("com:" + sensorCom);
        if (window.serialPort.open(sensorCom) === -1) {
          this.$message.error("打开串口失败");
        } else {
          setInterval(this.intervalValue, 500);
        }
      }
    });
  }
};
</script>

<style>
/* CSS */
#app {
  min-width: 1000px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.wrap {
  display: flex;
  flex: 1;
  overflow: auto;
}
</style>
