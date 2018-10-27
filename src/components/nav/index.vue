<template>
    <div>
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo menu"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router=true
      >

        <el-submenu index="1" class="menu">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>用户管理</span>
          </template>
            <el-menu-item index="/home/userlist">用户列表</el-menu-item>
            <el-menu-item index="/home/adduser">添加用户</el-menu-item>
        </el-submenu>
        <el-submenu index="2" >
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>新闻管理</span>
          </template>
            <el-menu-item index="/home/addnews">添加新闻</el-menu-item>
            <el-menu-item index="/home/newslist">新闻列表</el-menu-item>
            <el-menu-item index="/home/newsmaster">新闻管理</el-menu-item>
        </el-submenu>



      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped lang="scss">
.menu{
  margin-top: 50px;
}
</style>
