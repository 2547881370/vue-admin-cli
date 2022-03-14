<template>
  <el-container class="login-container">
    <el-card class="app-login-card animated flipInY">
      <div slot="header" class="el-card-header">
        <div style="clear: both"></div>
        <h2 class="login-title">{{ sysName }}</h2>
      </div>
      <el-form :rules="rules" :model="loginForm" ref="loginForm" label-width="70px">
        <el-form-item label="账号" prop="username" style="position:relative">
          <el-input type="text" v-model.trim="loginForm.username" maxlength="15" />
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            ref="pwd"
            :type="showPwd ? 'text' : 'password'"
            v-model.trim="loginForm.password"
            @keyup.enter.native="onLogin"
            maxlength="16"
          >
          </el-input>
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <span class="svg-container-end" @click.stop="toggleShowPwd">
            <svg-icon v-if="!showPwd" icon-class="eye-slash-fill" />
            <svg-icon v-else icon-class="eye-fill" />
          </span>
        </el-form-item>
      </el-form>
      <div class="change-logintype"></div>
      <el-button type="primary" @click="onLogin('loginForm')" :loading="loading">登 录</el-button>
    </el-card>
  </el-container>
</template>
<script>
import { mapActions } from 'vuex'
import { hex_md5 } from '@/common/md5.js'
import { validateUsername, validatePwd } from '@/common/validate.js'
import { getToken } from '@/api/token'
export default {
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  //   if (answer) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        if (this.pwdForm.newPwd2 !== '') {
          this.$refs.pwdForm.validateField('newPwd2')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'))
      } else if (value !== this.pwdForm.newPwd1) {
        callback(new Error('两次新密码输入不一致!'))
      } else {
        callback()
      }
    }
    return {
      sysName: process.env.VUE_APP_SYS_NAME,
      showPwd: false,
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      rules: {
        username: [
          { required: true, trigger: 'blur', message: '请输入账号' },
          { required: true, trigger: 'blur', validator: validateUsername },
          { required: true, trigger: 'change', validator: validateUsername }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' },
          { required: true, trigger: 'blur', validator: validatePwd },
          { required: true, trigger: 'change', validator: validatePwd }
        ]
      },
      redirect: undefined,
      otherQuery: {},
      token: null
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  async created() {
    await this.getToken()
  },
  methods: {
    ...mapActions({
      login: 'user/login'
    }),
    // 获取token
    getToken() {
      return new Promise(async (resolve, reject) => {
        try {
          let { data } = await getToken()
          this.token = data
        } catch (e) {
          reject(e)
        } finally {
          resolve()
        }
      })
    },
    toggleShowPwd() {
      this.showPwd = !this.showPwd
    },
    // 登录操作
    onLogin() {
      this.$refs.pwd.$el.getElementsByTagName('input')[0].blur()
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          let params = {
            userName: this.loginForm.username,
            // TODO 暂时用临时的密码
            // password: hex_md5(this.loginForm.password),
            password:
              'PXj5YiBSW1ThEBaBdXWi8Ov7XaB649/UiVtt6UtnccABxZxavJOz7WteMZyDtcJ5kv5uxA0k5ePm2DU6NT08+gDa3Izi1lS9oq4hwD1OwoGWQ6ZY3Z+KDuOEddZPms8tPRbMxjzC7Y85rzYKURHgI5HAjPDLGPKP+Gd0lOoejcE=',
            accessToken: this.token
          }
          this.login(params)
            .then(() => {
              // 登录成功
              this.$router.push({ path: '/', query: this.otherQuery }).catch(() => {
                console.log('登录成功，跳转... ')
              })
            })
            .catch(err => {
              // 登录时如果有异常错误，直接把后端返回的错误msg提示出来
              // 301 全局已提示
              // 这里处理其它的错误提示
              // not todo
            })
            .finally(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: mix(#044289, #494166);
  background-image: url('~@/assets/images/login/login-bg.png');
  background-size: 100% 100%;
  overflow: hidden;
  .app-logo-card {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1;
    width: 400px;
    margin: -330px 0 0 -240px;
    padding: 30px 10px;
    background: transparent;
    border: none;
    /deep/ .el-card__header {
      width: 128px;
      height: 128px;
      position: relative;
      left: 42%;
      background-size: 100% 100%;
      border: none;
    }
  }
  .app-login-card {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -200px 0 0 -200px;
    width: 400px;
    height: 270px;
    padding: 30px 10px;
    background: transparent;
    background-image: url('~@/assets/images/login/mianban.png');
    background-size: 100% 100%;
    border: none;
    /deep/ .el-card__header {
      background-image: url('~@/assets/images/login/guangxian.png');
      background-size: 100% 100%;
      margin-top: -10px;
      padding: 80px 0;
      border: none;
      .el-card-header {
        text-align: center;
        margin-top: -60px;
        font-size: 18px;
      }
    }
    /deep/ .el-card__body {
      margin-top: -70px;
    }
    .login-title {
      margin: 0;
      text-align: center;
      color: #fff;
    }
    .el-input /deep/ .el-input__inner {
      text-indent: 12px;
    }
    // .el-form-item__label {
    //   line-height: 48px;
    // }
    .change-logintype {
      height: 50px;
      text-align: right;
      .type-txt {
        color: #fff;
        cursor: pointer;

        &:hover {
          color: #18ffff;
          text-decoration: underline;
        }
      }
    }
    .svg-container {
      position: absolute;
      top: 0;
      left: 5px;
      color: #fff;
      &_user {
        font-size: 20px;
      }
      &_password {
        left: 7px;
        font-size: 12px;
      }
    }
    .svg-container-end {
      position: absolute;
      top: 0;
      right: 15px;
      color: #fff;
      cursor: pointer;
      padding: 0 5px;
      &:hover {
        transform: scale(1.1);
      }
    }
    .el-button--primary {
      width: 100%;
    }
  }
  .pwd-dialog {
    /deep/ .el-dialog {
      width: 600px;
      height: 400px;
    }
  }
}
</style>
