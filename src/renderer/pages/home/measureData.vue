<template>
  <div class="measure-data">
    <el-row type="flex" justify="space-between" class="main">
      <el-col class="c1">
        <el-row type="flex" style="margin-bottom: 10px;">
          <div class="label">当前量块</div>
          <div class="val fz-24" style="color:red;font-weight:900">{{currentMearBlock+1}}</div>
        </el-row>
        <el-row type="flex" style="margin-bottom: 10px;">
          <div class="label">名义尺寸</div>
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
              <div>{{valueB}}{{valueB===''?'':'μm'}}</div>
            </el-col>
            <el-col :span="12">
              <div class="text-r">{{valueC}}{{valueC===''?'':'μm'}}</div>
            </el-col>
          </el-row>
          <el-row type="flex">
            <div style="width:100%;text-align:center">{{valueCenter}}{{valueCenter===''?'':'μm'}}</div>
          </el-row>
          <el-row type="flex">
            <el-col :span="12">
              <div>{{valueA}}{{valueA===''?'':'μm'}}</div>
            </el-col>
            <el-col :span="12">
              <div class="text-r">{{valueD}}{{valueD===''?'':'μm'}}</div>
            </el-col>
          </el-row>
        </div>
      </el-col>
      <el-col class="c3">
        <!-- <el-button type="warning" icon="el-icon-arrow-left" circle></el-button>
        <el-button type="warning" icon="el-icon-arrow-right" :disabled="currentStep===7" circle></el-button>-->
        <el-row>
          <el-button
            :disabled="currentStep<=6"
            type="danger"
            style="margin-top:0px;"
            @click="onRemear"
          >重测</el-button>
        </el-row>
        <el-row>
          <el-button
            :disabled="currentStep<=6"
            type="primary"
            style="margin-top:10px;"
            @click="onNext"
          >下一块</el-button>
        </el-row>
        <el-row>
          <el-button
            :disabled="currentStep===0?true:false"
            type="warning"
            plain
            style="margin-top:10px;"
            @click="onNoMear"
          >不测本块</el-button>
        </el-row>
        <el-row v-if="isOver">
          <el-button type="success" style="margin-top:10px;" @click="onSubmit">提交</el-button>
        </el-row>
      </el-col>
    </el-row>

    <el-dialog title="选择模板" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="templateIndex" style="width:100%">
        <el-option v-for="(item, index) in files" :key="index" :label="item" :value="index"></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import ejsExcel from "../../../common/ejsexcel/ejsExcel";
// import ejsExcel from 'ejsExcel'
var fs = require("fs");

export default {
  name: "measureData",
  props: ["configData", "configIndex"],
  data() {
    return {
      temp: "",
      isOver: false,
      dialogVisible: false,
      files: [],
      templateIndex: 0
    };
  },
  computed: {
    ...mapState({
      standard: state => {
        return state.measure.standard;
      },
      currentStep: state => {
        return state.measure.currentStep;
      },
      currentMearBlock: state => {
        return state.measure.currentMearBlock;
      },
      historyBlock: state => {
        return state.measure.historyBlock;
      },
      valueCenter: state => {
        return state.measure.valueCenter;
      },
      valueA: state => {
        console.log("======", state.measure.valueA);
        return state.measure.valueA;
      },
      valueB: state => {
        return state.measure.valueB;
      },
      valueC: state => {
        return state.measure.valueC;
      },
      valueD: state => {
        return state.measure.valueD;
      },
      basicInfo: state => {
        return state.list.sampleList;
      },
      tableData: state => {
        return state.measure.tableData;
      }
    })
  },
  created() {
    this.files = fs.readdirSync("./模板");
  },
  methods: {
    ...mapActions([
      "changeTemp",
      "remear",
      "setTableData",
      "nextBlock",
      "setNoMearTableData"
    ]),
    tempChange(value) {
      this.changeTemp({ temp: value });
    },
    onRemear() {
      this.$confirm("是否确认重测?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.remear({ blockIndex: this.currentMearBlock });
      });
    },
    onNext() {
      if (this.historyBlock >= this.configData.data.length - 1) {
        this.isOver = true;
        this.$message({
          message: "测量已完成，请点击提交生成原始记录",
          type: "success",
          duration: 5000
        });
      }
      this.setTableData();
      this.nextBlock();
    },
    onSubmit() {
      this.dialogVisible = true;
    },
    onConfirm() {
      this.dialogVisible = false;
      let exlBuf = fs.readFileSync(`./模板/${this.files[this.templateIndex]}`);
      const data = {
        clientName: this.basicInfo[this.configIndex].clientName,
        certCode: this.basicInfo[this.configIndex].certCode,
        typeRule: this.basicInfo[this.configIndex].typeRule,
        fantoryCode: this.basicInfo[this.configIndex].fantoryCode,
        makeUnit: this.basicInfo[this.configIndex].makeUnit,
        place: "本院",
        tableData: this.tableData
      };
      ejsExcel.renderExcel(exlBuf, data).then(outBuf => {
        fs.writeFileSync(
          `./原始记录/${this.basicInfo[this.configIndex].certCode}.xlsx`,
          outBuf
        );
        this.$message({
          message: "原始记录生成成功，请在原始记录目录下查看",
          type: "success",
          duration: 5000
        });
      });
    },
    onNoMear() {
      if (this.historyBlock >= this.configData.data.length - 1) {
        this.isOver = true;
        this.$message({
          message: "测量已完成，请点击提交生成原始记录",
          type: "success",
          duration: 5000
        });
      }
      this.setNoMearTableData();
      this.nextBlock();
    }
  }
};
</script>
<style lang="scss">
.measure-data {
  .main {
    .el-input__inner {
      height: 43px;
      border: 0 solid;
      border-radius: 0 5px 5px 0;
      text-align: center;
      color: #409eff;
    }
  }
}
</style>
<style lang="scss" scoped>
.measure-data {
  width: 100%;
  .c1 {
    width: 350px;
    padding: 0;
    .label {
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
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
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
