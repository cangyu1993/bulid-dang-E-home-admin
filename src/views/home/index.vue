<template>
  <div>
    <el-row>
      <el-col :span="4" class="navleft">
        <navleft/>
      </el-col>
      <el-col :span="20" class="right">
        <div class="header">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/userlist' }">用户列表</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/home/adduser' }">添加用户</el-breadcrumb-item>
          </el-breadcrumb>

        <div class="msgAnd">
          <div class="msg">
            <img :src="userData.avatar" class="img">
            <span class="username">{{userData.username}}</span>
          </div>
          <el-dropdown >
            <span class="el-dropdown-link">
                个人操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="changeUser">切换用户</el-dropdown-item>
              <el-dropdown-item @click.native="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        </div>
        <div class="mainContent">
           <router-view />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import navleft from '@/components/nav'

  export default {
    name: "index",
    components: {
      navleft,
    },
    data(){
      return{
        userData:{}
      }
    },
    methods:{
      getData(){
        this.userData = JSON.parse(sessionStorage.getItem('user'))
      },
      changeUser(){
        this.$router.push('/')
      },
      loginOut(){
        this.$router.push('/')
        sessionStorage.clear()
      }
    },
    created(){
      this.getData()
    },

  }
</script>

<style scoped lang="scss">
  .navleft {
    height: 100vh;
    background-color: #545c64;
    overflow: hidden;
  }

  .right {
    height: 100vh;
    overflow-y: scroll;
    box-sizing: border-box;
    .header{
      height: 60px;
      padding: 0 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #aaa;
      .msgAnd{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .msg{
          margin-right: 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
          .username{
            font-size: 20px;
            font-weight: 400;
          }

        }
      }
    }
  }

</style>
