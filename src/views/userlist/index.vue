<template>
  <el-card class="box-card">
    <loading v-if="loading"/>
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
        :formatter="formatRole"
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
          <el-button size="small" type="primary" @click="changeMsg(scope.row._id)">
            修改个人信息
          </el-button>
          <el-button size="small" type="danger" @click="deleteAdmin(scope.row._id)">
            删除管理员
          </el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="sortPage">
      <el-pagination
        :page-size="size"
        layout="prev, pager, next"
        :total='count'
        @current-change='getPageNum'

      >
      </el-pagination>
    </div>

    <el-dialog
      title="修改管理员信息"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form :label-position="labelPosition"
               label-width="80px"
               @submit.native.prevent
      >
        <el-form-item label="idCard">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="太多了不写了">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="太多了不写了">
          <el-input></el-input>
        </el-form-item>
      </el-form>


      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>

  </el-card>
</template>

<script>
  import loading from '@/components/loading'

  export default {
    name: "index",
    components: {
      loading
    },
    data() {
      return {
        page: 1,
        size: 10,
        userlist: [],
        count: 0,
        loading: false,
        dialogVisible: false,
        labelPosition: 'left'
      }
    },
    methods: {
      getData() {
        this.loading = true
        this.$axios.get(`/getuser?page=${this.page}&size=${this.size}`).then(res => {
          // console.log(res.data)
          let code = res.data.code
          if (code == 200) {
            this.userlist = res.data.data
            this.count = res.data.count
            this.loading = false
          } else {
            this.$alert('登录状态过期！亲重新登录！', '提示', {
              confirmButtonText: '确定',
              callback: () => {
                this.$router.push('/')
              }
            });
          }
        })
      },
      getPageNum(e) {
        this.page = e
        this.getData()
      },
      deleteAdmin(id) {
        this.$confirm('此操作将永久删除该管理员, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.delete(`/deleteAdmin/${id}`).then(res => {
            // console.log(res.data)
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getData()
            } else {
              this.$message({
                type: 'fail',
                message: '此管理员无法删除!'
              });
            }
          }).catch(err => {
            console.log(err)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      formatRole(data) {
        if (data.sex === 1) {
          return '男'
        } else {
          return '女'
        }
      },
      changeMsg(id) {
        this.dialogVisible = true

      }
    },
    created() {
      this.getData()
    }
  }
</script>

<style scoped lang="scss">
  .box-card {
    min-height: 40vh;
    box-sizing: border-box;
    margin-bottom: 50px;
    .user-avatar {
      width: 35px;
      height: 35px;
    }
    .sortPage {
      padding: 20px 10px;
      display: flex;
      justify-content: flex-end;
    }
  }

</style>
