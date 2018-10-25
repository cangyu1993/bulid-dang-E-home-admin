<template>
  <el-card class="box-card" >
    <el-table
      :data="userlist"
      style="width: 100%"
      border
      :show-overflow-tooltip=true
    >

      <el-table-column
        label="用户名"
        prop='username'
        align='center'
        width="90px"
      >
      </el-table-column>

      <el-table-column label="用户头像"
                       align='center'
                       min-width="10px"
      >
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="user-avatar">
        </template>
      </el-table-column>

      <el-table-column
        label="idCard"
        width="180"
        prop='idCard'
        align='center'
      >
      </el-table-column>
      <el-table-column
        label="家庭住址"
        width="180"
        prop='home'
        align='center'
      >
      </el-table-column>
      <el-table-column
        label="工作"
        width="100"
        prop='job'
        align='center'
      >
      </el-table-column>
      <el-table-column
        label="民族"
        width="80"
        prop='nation'
        align='center'
      >
      </el-table-column>
      <el-table-column
        label="性别"
        width="80"
        prop='sex'
        align='center'
      >
      </el-table-column>
      <el-table-column
        label="身份"
        width="80"
        prop='identity'
        align='center'
      >
      </el-table-column>

      <el-table-column label="操作"
                       align='center'
                       min-width="60px"
      >
        <template slot-scope="scope">
          <el-button size="small" type="primary">
            查看详细
          </el-button>
          <el-button size="small" type="danger">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div  class="sortPage">
      <el-pagination
        :page-size="size"
        layout="prev, pager, next"
        :total="100"
      >
      </el-pagination>
    </div>

  </el-card>
</template>

<script>
  export default {
    name: "index",
    data() {
      return {
        page: 1,
        size: 10,
        userlist: []
      }
    },
    methods: {
      getData() {
        this.$axios.get(`/getuser/?page=${this.page}/?size=${this.size}`).then(res => {
          // console.log(res.data)
          let code = res.data.code
          if (code == 200) {
            this.userlist = res.data.data
          } else {
            this.$alert('登录状态过期！亲重新登录！', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push('/')
              }
            });
          }
        })
      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
.user-avatar{
  width: 35px;
  height: 35px;
}
  .sortPage{
    padding: 20px 10px;
    display: flex;
    justify-content: flex-end;
  }
</style>
