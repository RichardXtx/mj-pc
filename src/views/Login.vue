<template>
  <div class="login-page">
    <el-card>
      <template #header>黑马面经运营后台</template>

      <!-- atuo 自动 complete 完成 -->
      <el-form autocomplete="off" :model="form" :rules="rules" ref="formRef">
        <!-- 用户名 -->
        <el-form-item label="用户名" prop="username">
          <el-input
            placehoalder="输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item label="密码" prop="password">
          <el-input
            type="password"
            placeholder="输入用户密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <!-- 登录 -->
        <el-form class="tc">
          <el-button type="primary" @click="login">登 录</el-button>
          <el-button>重 置</el-button>
        </el-form>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {

    var passwordFn = (rule, value, callback) => {
      let res = /^\w{5,11}$/
      if (res.test(value) == false) {
        callback(new Error('密码不规范'))
      }
      else {
        callback()
      }

    }
    return {
      form: {
        username: '',
        password: ''
      },
      rules: { // 验证规则
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { validator: passwordFn, trigger: 'blur' }
        ]
      },
    }


  },


  methods: {
    login () {
      // this.$refs.formRef: 获取组件对象
      // validate: 组件对象的方法
      this.$refs.formRef.validate(async val => {

        if (val) {
          // alert('提交成功')
          let res = await this.$axios({
            url: '/auth/login',
            method: 'POST',
            data: this.form
          })
          console.log(res)
          // localStorage.setItem('pc_token', 'Bearer ' + res.data.data.token)
          this.$store.commit('user/set', 'Bearer ' + res.data.data.token)
          this.$router.push('/dashboard')

        } else {
          alert('提交失败')
          return false
        }
      })
    }


  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  background: url("https://img.zcool.cn/community/0178b55abdd3eda8012062e3ec3c95.jpg@1280w_1l_2o_100sh.jpg")
    no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;
  .el-card {
    width: 420px;
    ::v-deep .el-card__header {
      height: 80px;
      background: rgb(107, 116, 219);
      text-align: center;
      line-height: 40px;
      color: #fff;
      font-size: 18px;
    }
  }
  .el-form {
    padding: 0 20px;
  }
  .tc {
    text-align: center;
  }
}
</style>
