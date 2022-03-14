<template>
  <div class="left-sidebar" :class="{ 'is-collapse': isCollapse }">
    <el-scrollbar :noresize="false">
      <el-menu
        mode="vertical"
        :default-active="activeMenu"
        unique-opened
        :collapse="isCollapse"
        :collapse-transition="false"
      >
        <sidebar-item
          v-for="router of permission_routes"
          :key="router.path"
          :item="router"
          :base-path="router.path"
        ></sidebar-item>
      </el-menu>
    </el-scrollbar>
    <hamburger
      class="hamburger-container"
      :class="{ 'is-collapse': isCollapse }"
      :is-active="sidebar.opened"
      @toggleClick="toggleSideBar"
    ></hamburger>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import SidebarItem from './sidebar-item'
import Hamburger from './hamburger'
export default {
  name: 'SideBar',
  components: {
    SidebarItem,
    Hamburger
  },
  computed: {
    ...mapGetters(['sidebar', 'permission_routes']),
    activeMenu() {
      return this.$route.path
    },
    isCollapse() {
      // 不用派发事件了，如果需要监听这个状态，就直接监听store里面的app.sidebar.opened
      if (this.sidebar.opened) {
        // 左侧菜单栏状态折叠
        // 派发事件
        // console.log('折叠')
      } else {
        // 左侧菜单栏状态展开
        // 派发事件
        // console.log('展开')
      }
      return this.sidebar.opened
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    handleOpen(key, keyPath) {
      console.log('handleOpen', key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log('handleClose', key, keyPath)
    }
  }
}
</script>
<style scoped lang="less">
.left-sidebar {
  box-sizing: border-box;
  position: relative;
  flex: none;
  width: 260px;
  padding: 5px 10px;
  z-index: 2;
  background-image: url('~@/assets/images/layout/sidebar-bg.png');
  background-size: 100% 100%;
  &.is-collapse {
    width: 70px;
    padding: 5px 3px;
  }
  .el-scrollbar {
    height: calc(100% - 30px);
    /deep/ .el-scrollbar__wrap {
      &::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      .el-scrollbar__view {
        width: 96%;
      }
    }
  }
  .hamburger-container {
    position: absolute;
    right: 0;
    top: 50%;
    &.is-collapse {
      right: -15px;
    }
  }
}
.el-menu {
  height: 100%;
  background-color: transparent;
  border-right: none;
}

.el-menu /deep/ a {
  text-decoration: none;
}
/* 折叠时需要隐藏文字和 > */
.el-menu--collapse /deep/ .el-submenu__title span {
  display: none;
}
/*隐藏 > */
.el-menu--collapse /deep/ .el-submenu__title .el-submenu__icon-arrow {
  display: none;
}
/*折叠的弹出的二级菜单样式修改*/
.el-menu--popup a {
  text-decoration: none;
}
</style>
