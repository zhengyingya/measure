<template>
  <div class="page-mear-config">
    <el-button class="fz-20" type="primary" @click="add">
      <i class="el-icon-circle-plus-outline fz-20"></i>
      添加新组
    </el-button>
    <div style="display:flex;justify-content:center">
      <div style="width:460px;display:flex;">
        <el-table
          :data="configData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="标题"
            width="200">
          </el-table-column>
          <el-table-column
            prop="1"
            label=""
            width="200">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" plain @click="onEdit(scope.$index)">编辑</el-button>
              <el-button size="mini" type="danger" plain @click="onDelete(scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div style="width:460px;" v-if="isEdit">
        <el-row type="flex" style="margin-bottom:40px;">
          <el-input v-model="name" placeholder="请输入标题" size="small" style="width: 200px;"></el-input>
          <i class="el-icon-success fz-26" style="margin-left:180px;color:#67c23a;font-weight:bolder;cursor:pointer;line-height:32px;" @click="confirm"></i>
          <i class="el-icon-error fz-26" style="margin-left:10px;color:#f56c6c;font-weight:bolder;cursor:pointer;line-height:32px;" @click="cancel"></i>
        </el-row> 
        <el-table
          :data="tableData"
          stripe
          style="width: 100%">
          <el-table-column
            prop="size"
            label="量块名义尺寸（mm）"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.size" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="fix"
            label="标准修正量（μm）"
            width="200">
            <template slot-scope="scope">
              <el-input v-model="scope.row.fix" size="mini"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="1"
            label=""
            width="60">
            <template slot-scope="scope">
              <i class="el-icon-remove fz-20" style="color:#f56c6c;line-height:25px;cursor:pointer" @click="deleteLine(scope.$index)"></i>
            </template>
          </el-table-column>
        </el-table>
        <div class="i-add"><i class="el-icon-circle-plus fz-20" @click="addNewLine"></i></div>
      </div>
    </div>
  </div>
</template>

<script>
import nedbManage from '../../../database/nedb'
import { dateFormat } from '../../../utils/commonMethod.js'
import { mapActions, mapState } from 'vuex'
console.log(nedbManage)
export default {
  name: 'mearConfig',
  components: {
  },
  data () {
    return {
      name: '',
      tableData: [],
      isEdit: false,
      isUpdate: false,
      updateId: ''
    }
  },
  computed: {
    ...mapState({
      configData: (state) => {
        return state.mearConfig.configData
      }
    })
  },
  created () {
    this.getConfigData()
  },
  methods: {
    ...mapActions(['getConfigData', 'updateConfigData', 'insertConfigData', 'deleteConfigData']),
    add () {
      this.tableData = [{
        size: '',
        fix: ''
      },{
        size: '',
        fix: ''
      }]
      this.isEdit = true
    },
    confirm () {
      if (this.isUpdate) {
        this.updateConfigData({
          id: this.updateId,
          name: this.name,
          tableData: this.tableData
        })
        .then((res) => {
          this.$message({
            message: '更新成功',
            type: 'success'
          })
        })
      }
      else {
        this.insertConfigData({
          name: this.name,
          tableData: this.tableData
        })
        .then((res) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
        })
      }
      this.isEdit = false
    },
    cancel () {
      this.isEdit = false
    },
    addNewLine () {
      this.tableData.push({
        size: '',
        fix: ''
      })
    },
    deleteLine (index) {
      this.tableData.splice(index, 1)
    },
    //编辑一项
    onEdit (index) {
      this.isEdit = true
      this.isUpdate = true
      this.updateId = this.configData[index]._id
      this.name = this.configData[index].name
      this.tableData = JSON.parse(JSON.stringify(this.configData[index].data))
    },
    // 删除一项
    onDelete (index) {
      this.$confirm('是否确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteConfigData({ id: this.configData[index]._id })
        .then((res) => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        })
      })
    }

  }
}
</script>
<style lang="scss" scoped>
.page-mear-config {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  .u-table {
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .i-add {
    color: #409EFF;
    cursor: pointer;
    text-align: center;
    margin: 10px 0;
  }
}
</style>
