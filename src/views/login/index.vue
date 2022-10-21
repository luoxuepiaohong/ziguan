<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      label-position="left"
    >

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="请输入用户名"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        >
          <i slot="prefix" class="el-input__icon el-icon-user-solid" />
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          type="password"
          placeholder="请输入密码"
          show-password
          name="password"
          tabindex="2"
          auto-complete="on"
        >
          <i slot="prefix" class="el-input__icon el-icon-s-tools" />
        </el-input>
      </el-form-item>

      <el-form-item prop="authcode">
        <div class="code-box">
          <el-input
            ref="authcode"
            v-model="loginForm.authcode"
            placeholder="请输入验证码"
            name="authcode"
            type="text"
            tabindex="3"
            auto-complete="off"
          >
            <i slot="prefix" class="el-input__icon el-icon-user-solid" />
          </el-input>
          <span class="auth-code">5462</span>
        </div>
      </el-form-item>

      <div class="operation">
        <el-checkbox v-model="isRemember">记住密码</el-checkbox>
        <el-button type="text">绑定账号</el-button>
      </div>

      <div class="error-tips">
        <span v-if="errorTips">{{ errorTips }}</span>
      </div>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 录</el-button>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import CryptoJs from 'crypto-js'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('账号不对'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        authcode: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined,

      errorTips: '',
      isRemember: true
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

  created() {
    const account = localStorage.getItem('account')
    const rememberAccount = localStorage.getItem('rememberAccount')

    if (account) {
      const { username, password } = JSON.parse(account)
      this.loginForm = Object.assign({}, { username, password })
    }

    if (rememberAccount) {
      this.isRemember = JSON.parse(rememberAccount)
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true

          const params = Object.assign({}, this.loginForm)
          // 进行MD5加密
          if (params.password.length !== 32) {
            params.password = CryptoJs.MD5(params.password).toString()
          }

          this.$store.dispatch('user/login', params).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false

            // 登录成功，记录账号密码到 localStorage
            localStorage.setItem('rememberAccount', this.isRemember)
            if (this.isRemember) {
              const { username, password } = params
              localStorage.setItem('account', JSON.stringify({ username, password }))
            } else {
              localStorage.removeItem('account')
            }
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  // .el-form-item {
  //   margin-bottom: 16px;
  // }
  .el-input {
    .el-input__inner {
      padding-left: 52px;
    }
    .el-input__prefix {
      left: 16px;
    }
//     display: inline-block;
//     height: 47px;
//     width: 85%;

//     input {
//       background: transparent;
//       border: 0px;
//       -webkit-appearance: none;
//       border-radius: 0px;
//       padding: 12px 5px 12px 15px;
//       color: $light_gray;
//       height: 47px;
//       caret-color: $cursor;

//       &:-webkit-autofill {
//         box-shadow: 0 0 0px 1000px $bg inset !important;
//         -webkit-text-fill-color: $cursor !important;
//       }
//     }
//   }

//   .el-form-item {
//     border: 1px solid rgba(255, 255, 255, 0.1);
//     background: rgba(0, 0, 0, 0.1);
//     border-radius: 5px;
//     color: #454545;
  }
  .code-box {
    .el-input {
      .el-input__inner {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $primaryBg;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-form {
    position: relative;
    width: 440px;
    height: 460px;
    padding: 39px 70px;
    background: #22262E;

    .title-container {
      height: 40px;
      margin-bottom: 48px;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0;
        text-align: center;
        font-weight: bold;
      }
    }
  }

  .el-input__icon {
    color: #fff;
  }

  .code-box {
    display: flex;
    justify-content: space-between;

    .auth-code {
      width: 200px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $lineColor;
      border-left: 0;
      background: $secondBg;
      border-top-right-radius: $--border-radius-base;
      border-bottom-right-radius: $--border-radius-base;
    }
  }

  .operation {
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;

    .el-button {
      padding: 0;
      color: #ccc;
      &:hover {
        color: $primaryText;
      }
      &:active {
        color: $secondText;
      }
    }
  }

  .error-tips {
    font-size: 14px;
    height: 19px;
    line-height: 19px;
    color: #EB4242;
    margin-bottom: 16px;
    text-align: center;
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
