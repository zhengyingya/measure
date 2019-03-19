<template>
  <div class="com-header">
    <el-row type="flex">
      <div class="c-logo">量块测量系统</div>
      <div style="display:flex;flex:1;background:#001528">
        <div :class="['menu-item', navActive==='/'?'active':'']" @click="handleSelect('')">样品</div>
        <div :class="['menu-item', navActive==='/home'?'active':'']" @click="handleSelect('home')">测量</div>
        <div :class="['menu-item', navActive==='/config'?'active':'']" @click="handleSelect('config')">模板</div>
        <div :class="['menu-item', navActive==='/comConfig'?'active':'']" @click="handleSelect('comConfig')">串口</div>
      </div>
      <!-- <el-menu
        :default-active="navActive"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="flex:1">
        <el-menu-item index="/" class="c-item">样品</el-menu-item>
        <el-menu-item index="/home" class="c-item" :disabled="disabled">测量</el-menu-item>
        <el-menu-item index="/config" class="c-item">配置</el-menu-item>
      </el-menu> -->
    </el-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: 'comHeader',
  computed: {
    ...mapState ({
      navActive (state) {
        console.log('----', state)
        return state.app.navActive
      },
      disabled (state) {
        return state.app.navActive !== '/home'
      }
    }) 
  },
  methods: {
    ...mapActions(['changeRouter', 'clearAll']),
    handleSelect (index) {
      if (this.navActive === '/home') {
        console.log(index)
        if (index !== 'home') {
          this.$confirm('离开后所有测量数据都将清空，确认离开?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.clearAll()
            this.changeRouter({ name: index })
            this.$router.push({ path: '/' + index })
          })
        }  
      } else if (index === 'home') {
        this.$message({
          message: '请在样品页选择一个样品进行测量',
          type: 'warning',
          duration: 2000
        })
      } else {
        this.changeRouter({ name: index })
        this.$router.push({ path: '/' + index })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .com-header {
    .menu-item {
      width: 100px;
      line-height: 60px;
      height: 60px;
      text-align: center;
      background: #001528;
      color: #fff;
      font-size: 18px;
      cursor: pointer;
      &:hover {
        background:#334453;
      }
    }
    .active {
      background: #1890FF;
    }
    .c-logo{
      padding: 0 40px;
      width: 160px;
      background: #001528;
      color: #fff;
      line-height: 60px;
      height: 60px;
      font-size: 18px;
    }
    .c-item {
      width: 120px;
      text-align: center;
      font-size: 18px;
    }
  }
</style>
