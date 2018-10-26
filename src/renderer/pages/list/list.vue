<template>
  <div class="page-list">
    <el-table
      :data="sampleList"
      height="100%"
      border
      stripe
      style="width: 100%">
      <el-table-column
        prop="clientName"
        label="委托单位"
        width="180">
      </el-table-column>
      <el-table-column
        prop="sampleName"
        label="样品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="certCode"
        label="证书编号">
      </el-table-column>
      <el-table-column
        prop="entrustDate"
        label="委托日期">
        <template slot-scope="scope">
          <span>{{dateFormat(scope.row.entrustDate, 'yyyy-MM-dd')}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="typeRule"
        label="型号规格">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import oracleManage from '../../../database/oracle'
import { dateFormat } from '../../../utils/commonMethod.js'
import { mapActions, mapState } from 'vuex'
console.log(oracleManage)
export default {
  name: 'tableData',
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      sampleList: (state) => {
        return state.list.sampleList
      },
      sampleHead: (state) => {
        return state.sampleHead
      }
    })
  },
  created () {
    this.getSampleList()
  },
  methods: {
    ...mapActions(['getSampleList']),
    dateFormat
  }
}
</script>

<style lang="scss" scoped>
.page-list {
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
}
</style>
