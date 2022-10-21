<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
</el-dialog>
</template>

<script>
export default {
  name: 'AddAccountDialog',

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
      dialogVisible: true,

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
