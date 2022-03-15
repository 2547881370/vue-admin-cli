<template>
  <header class="layout-header">
    <h3 class="system-name">{{ systemName }}</h3>
    <!-- 右侧-->
    <div class="right-control">
      <!-- 从右往左的顺序写 -->
      <!-- 退出登录 -->
      <div class="icon exit" @click.stop="exitSystem"></div>
      <!-- 登录人名 -->
      <div>
        <el-dropdown trigger="click">
          <div class="icon user">
            <div class="username-wrapper">
              <span class="user-name">{{ userInfo.userName }}</span>
              <i class="el-icon-caret-bottom"></i>
            </div>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <el-dropdown-item @click.native="updatePwd">修改密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from 'vuex'
import { confirm } from '@/decorator/confirm'
import SessionStorage from '@/common/utils/session-storage.js'
export default {
  props: {
    unreadNumber: {
      type: Number
    }
  },
  data() {
    return {
      systemName: process.env.VUE_APP_SYS_NAME,
      userInfo: { name: '非法登录' }
    }
  },
  mounted() {
    // 存用户信息
    this.userInfo = SessionStorage.loadFromSession('userInfo', {})
  },
  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),
    // 点击设置按钮
    handlerSetting() {
      console.log('setting')
    },
    // 点击修改密码
    updatePwd() {},
    // 点击退出按钮
    @confirm('是否确定退出登录？')
    exitSystem() {
      const loading = this.$loading({ lock: true })
      this.$emit('cancelHealthCheck')
      this.userLogout()
        .then(list => {
          this.$router.push({ name: 'login' })
          // 为了重新实例化vue-router对象 避免bug
          // location.reload()
        })
        .catch(err => {
          console.log('退出登录error: ', err)
        })
        .finally(() => {
          loading.close()
        })
    }
  }
}
</script>

<style scoped lang="less">
.layout-header {
  width: 100%;
  height: 60px;
  background-image: url('~@/assets/images/layout/header-bg.png');
  background-repeat: no-repeat;
  background-size: auto 100%;
  .logo {
    height: 40px;
    cursor: pointer;
    vertical-align: middle;
  }
  .system-name {
    display: inline;
    font-weight: 400;
    font-size: 18px;
    margin-left: 10px;
    color: #ffffff !important;
    line-height: 30px;
  }
  .right-control {
    display: flex;
    flex-direction: row-reverse;
    box-sizing: border-box;
    float: right;
    height: 40px;
    width: 400px;
    padding-right: 30px;
    padding-top: 5px;
    .icon {
      height: 30px;
      line-height: 30px;
      background-repeat: no-repeat;
      background-position: left center;
      background-size: contain;
      cursor: pointer;
      margin: 0 10px;
      text-align: center;
      padding-left: 30px;
    }
    .user {
      background-image: url('~@/assets/images/layout/user-img.png');
      outline: none;
      .username-wrapper {
        color: #fff;
      }
    }
    .setting {
      background-image: url('~@/assets/images/layout/setting-img.png');
    }
    .exit {
      background-image: url('~@/assets/images/layout/exit-img.png');
    }
    .notifications {
      font-size: 22px;
      margin-top: 1px;
      color: #64ffff;
      padding-right: 10px;
    }
  }
  .pwd-dialog {
    /deep/ .el-dialog {
      width: 500px;
    }
  }
}
@media (min-width: 1640px) {
  .layout-header {
    background-size: 100% 100%;
  }
}
</style>
