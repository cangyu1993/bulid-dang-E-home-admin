<template>
  <div class="content">
    <el-card>
      <h3 class="title">添加用户</h3>
      <div class="contentItem">
        <p class="itemI">用户名</p>
        <el-input class="itemII" v-model="userDada.username"/>
      </div>

      <div class="contentItem">
        <p class="itemI">用户头像</p>
        <div style="margin-left: 18px;width: 110%">
          <el-switch
            style="display: block;margin:10px 0"
            v-model="upload"
            :active-value=true
            :inactive-value=false
            active-color="#13ce66"
            inactive-color="#7FFF00"
            active-text="本地上传"
            inactive-text="URL上传">
          </el-switch>
          <upload v-if="upload" v-show="!userDada.avatar" @getimgs="getimgUrl"/>
          <el-input v-if="!upload"
                    class="itemII"
                    v-model="avatar"
                    style="width: 66%;"
          ></el-input>
          <div class="cancleImg"
               v-if="userDada.avatar"
               v-show="upload"
          >
            <i class="el-icon-delete CGposition" @click="deleteImg"></i>
            <img :src="userDada.avatar"
                 style="width: 130px;
                height: 130px;"
            >
          </div>
        </div>
      </div>

      <div class="contentItem">
        <p class="itemI">idCard</p>
        <el-input class="itemII" v-model="userDada.idCard"/>
      </div>

      <div class="contentItem">
        <p class="itemI">密码</p>
        <el-input class="itemII" type="password" v-model="userDada.password"/>
      </div>
      <div class="contentItem">
        <p class="itemI">家庭住址</p>
        <el-input class="itemII" v-model="userDada.home"/>
      </div>
      <div class="contentItem">
        <p class="itemI">工作</p>
        <el-input class="itemII" v-model="userDada.job"/>
      </div>
      <div class="contentItem">
        <p class="itemI">民族</p>
        <el-input class="itemII" v-model="userDada.nation"/>
      </div>
      <div class="contentItem">
        <p class="itemI">性别</p>
        <div>
          <el-radio v-model="userDada.sex" label="1">男</el-radio>
          <el-radio v-model="userDada.sex" label="0">女</el-radio>
        </div>
      </div>
      <div class="contentItem">
        <p class="itemI">身份</p>
        <div>
          <el-select v-model="userDada.identity" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>

      <el-button type="success" class="btn111" @click="sureAddS">确认添加</el-button>
    </el-card>
  </div>
</template>

<script>
  import upload from '@/components/upload'

  export default {
    name: "index",
    components: {
      upload
    },
    data() {
      return {
        upload: true,
        isshow: false,
        userDada: {
          username: '',
          avatar: '',
          idCard: '',
          password: '',
          home: '',
          job: '',
          nation: '',
          sex: '',
          identity: ''

        },
        token: '',
        options: [
          {
            value: '党员',
            label: '党员'
          }, {
            value: '积极份子',
            label: '积极份子'
          }, {
            value: '预备党员',
            label: '预备党员'
          },
        ],
        avatar: ''
      }
    },
    methods: {
      getimgUrl(e) {
        this.userDada.avatar = e
        this.isshow = false
      },
      deleteImg() {
        this.userDada.avatar = ''
        this.$message.warning('已删除头像')
      },
      sureAddS() {
        let userData = this.userDada

        if (this.avatar && !userData.avatar) {
          userData.avatar = this.avatar
        }
        if (userData.idCard && userData.password) {
          this.$axios.post('/adduser', userData).then(res => {
            // console.log(res)
            if (res.data.code == 200) {
              this.$message.success(res.data.msg)
              this.userDada = {
                username: '',
                avatar: '',
                idCard: '',
                password: '',
                home: '',
                job: '',
                nation: '',
                sex: '',
                identity: ''
              }
              setTimeout(() => {
                this.$router.push('/home/userlist')
              }, 1000)
            } else {
              this.$message.warning('登陆过期！')
              this.$router.push('/')
            }
          })
        } else {
          this.$message.warning('缺少idCard或密码等必要参数')
        }
      }

    },
    created() {
    },
  }
</script>

<style scoped lang="scss">
  .content {
    margin-top: 40px;
    width: 90%;
    margin-left: 5%;
    .btn111 {
      margin-top: 30px;
      width: 80%;
      margin-left: 10%;
    }
    .title {
      text-align: center;
      line-height: 40px;
    }
    .contentItem {
      display: flex;
      justify-content: flex-start;
      padding: 10px 0;
      .itemI {
        width: 100px;
        padding-top: 10px;
        line-height: 20px;
      }
      .itemII {
        width: 60%;
      }
      .cancleImg {
        position: relative;
        width: 130px;
        .CGposition {
          position: absolute;
          top: 10px;
          right: -10px;
          color: red;
          cursor: pointer;
        }
      }
    }
  }
</style>
