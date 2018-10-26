<template>
  <div class="com-header">
    <el-row type="flex">
      <div class="c-logo">量块测量系统</div>
      <el-menu
        default-active="1"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        style="flex:1">
        <el-menu-item index="1" class="c-item">样品</el-menu-item>
        <el-menu-item index="2" class="c-item">测量</el-menu-item>
        <el-menu-item index="3" class="c-item">配置</el-menu-item>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'comHeader',
  methods: {
    handleSelect () {
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .com-header {
    .c-logo{
      padding: 0 40px;
      width: 160px;
      background: #545c64;
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
