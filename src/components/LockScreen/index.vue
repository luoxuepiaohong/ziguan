<template>
  <div class="lock-screen">
    <div class="unlock-box">
      <header class="unlock-box__header">
        <div class="header__icon">
          <i class="iconfont el-icon-s-tools" />
        </div>
        <p class="header-title">界面已锁定，请输入用户密码解锁</p>
      </header>

      <div class="unlock-box__container">
        <el-form ref="form" :model="form" :rules="rules" class="unlock-box__form">
          <el-form-item label="密码：" prop="pass" :error="submitError">
            <el-input v-model.trim="form.pass" placeholder="请输入密码" show-password @focus="submitError = ''" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LockScreen',

  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (this.submitError !== '') {
        callback(new Error(this.submitError))
      } else {
        callback()
      }
    }

    return {
      form: {
        pass: ''
      },

      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      },

      submitError: '' // 提交时的报错
    }
  },
  methods: {
    onSubmit() {
      this.$refs['form'].validate((valid) => {
        console.log('valid:', valid)
        if (valid) {
          console.log('submit!')
          // setTimeout(() => {
          //   this.submitError = '密码错误'
          // }, 2000)、

          this.$store.dispatch('app/toggleLock', false)
        } else {
          return false
        }
      })
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style lang="scss">
.lock-screen{
  height: 100%;
  background-color: $primaryBg;
  display: flex;
  align-items: center;
  justify-content: center;

  .unlock-box {
    width: 360px;
    height: 280px;
    background: #1E2129;
    border: 1px solid $lineColor;

    .unlock-box__header {
      height: 80px;
      background: $secondBg;
      border-bottom: 1px solid $lineColor;
      display: flex;
      justify-content: center;
      position: relative;

      .header__icon {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, -50%);
        width: 48px;
        height: 48px;
        background: #303847;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .iconfont {
          color: $primaryText;
          font-size: 24px;
        }
      }

      .header-title {
        padding-top: 22px;
        font-size: 14px;
        color: $primaryText;
      }
    }

    .unlock-box__container {
      padding: 40px 52px;

      .unlock-box__form{
        .el-input {
          width: 200px;
        }
        .el-form-item__error {
          left: 54px;
        }
        .el-button {
          margin-top: 18px;
          width: 100%;
        }
      }
    }
  }
}
</style>
