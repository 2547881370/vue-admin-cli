<template>
  <div class="app-layout">
    <navbar
      :unreadNumber="unreadNumber"
      @toggleNotification="toggleNotification"
    ></navbar>
    <div class="main-container">
      <sidebar></sidebar>
      <div class="right-container">
        <section class="app-main">
          <el-scrollbar ref="scrollbar" class="scroll-wrapper" :noresize="false">
            <transition name="fade-transform" mode="out-in">
              <router-view :key="key" />
            </transition>
          </el-scrollbar>
        </section>
        <div class="footer">
          数科划小管理系统
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar } from './components'

export default {
  name: 'AppLayout',
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      timer: null,
      // 是否显示全屏红色警告
      isSOS: false,
      // 通知消息数量
      unreadNumber: null,
      showNotification: false
    }
  },
  computed: {
    key() {
      return this.$route.path
    },
  },
  watch: {
    $route() {
      this.$refs.scrollbar.update()
    }
  },
  methods: {
    changePwd() {
      console.log('change password')
    },
    // toggle消息通知弹窗
    toggleNotification() {
      this.showNotification = !this.showNotification
    },
  }
}
</script>

<style lang="less">
@import '~@/assets/styles/sidebar.less';
</style>

<style scoped lang="less">
.app-layout {
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('~@/assets/images/layout/layout-bg.png');
  background-size: cover;

  .main-container {
    display: flex;
    width: 100%;
    height: calc(100vh - 60px);

    .right-container {
      position: relative;
      box-sizing: border-box;
      flex: auto;
      // width: calc(100% - 290px);
      font-size: 14px;
      overflow: hidden;
      margin: 0 10px 5px 15px;

      .app-main {
        height: calc(100% - 50px);
        padding: 5px;
        background-image: url('~@/assets/images/layout/main-page-bg.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
        background-position: center center;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        overflow: hidden;

        .scroll-wrapper {
          width: 100%;
          height: 100%;
          overflow: hidden;

          /deep/ .el-scrollbar__wrap {
            &::-webkit-scrollbar {
              display: none; /* Chrome Safari */
            }

            .el-scrollbar__view {
              width: calc(100% - 16px);
              height: 100%;
            }
          }
        }
      }

      .footer {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
        height: 40px;
        line-height: 40px;

        .img {
          vertical-align: middle;
        }
      }
    }
  }

  .slide-enter-active {
    transition: all 0.2s ease;
  }

  .slide-leave-active {
    transition: all 0.2s ease;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate3d(300px, 0, 0);
  }

  .fullpage-warning {
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 9999;
    width: 100vw;
    height: 100vh;
    -webkit-pointer-events: none;
    -moz-pointer-events: none;
    -ms-pointer-events: none;
    -o-pointer-events: none;
    pointer-events: none;

    &.red {
      animation: warning 2s infinite;
      animation-direction: alternate;
    }
  }
}

@keyframes warning {
  0% {
    box-shadow: 0px 0px 100vw #dd2c00 inset;
  }
  100% {
    box-shadow: -1px -1px 0px transparent inset;
  }
}
</style>
