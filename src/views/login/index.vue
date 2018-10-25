<template>
    <div class="login">
        <p class="title">党建E家后台管理系统</p>
        <el-form label-position="left" label-width="80px" class="form" size="medium">
          <el-form-item label="idCard" class="input">
            <el-input  v-model="userDada.idCard" ></el-input>
          </el-form-item>
          <el-form-item label="password" class="input">
            <el-input  v-model="userDada.password"  type="password"></el-input>
          </el-form-item>
          <el-button type="primary" :loading="loading" class="btn" @click="loginSer">登陆</el-button>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "index",
        data(){
          return{
            userDada:{
              idCard:"1765244720@qq.com",
              password:"123456"
            },
            loading:false
          }
        },
      methods:{
        loginSer(){
          this.loading = true
          this.$axios.post('/login',this.userDada).then(res=>{
            this.loading = false
            // console.log(res)
            if (res.data.code == 200) {
              const user = res.data.data
              sessionStorage.setItem('user', JSON.stringify(user))
              this.$message.success('登陆成功！')
              setTimeout(()=>{
                this.$router.push('/home')
              },1000)
            }else {
              this.$message.error(res.data.msg)
            }

          }).catch(err=>{
            console.log(err)
            this.loading = false
          })
        }
      }
    }
</script>

<style scoped lang="scss">
.login{
  width: 100vw;
  height: 100vh;
  background-color:#D0D0D0;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .title{
    margin-bottom: 120px;
    font-size: 50px;
    font-weight: 700;
  }
  .form{
    width: 500px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #fff;
    background-color: #fff;
    border-radius: 6px;
    .input{
      width: 70%;
    }
    .btn{
      width: 80%;
    }
  }
}
</style>
