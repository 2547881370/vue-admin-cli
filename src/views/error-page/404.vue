<script src="../../../../../hcs-web/src/common/request.js"></script>
<template>
  <div>页面走丢了 <el-button @click.stop="doLogout">退出登录</el-button></div>
</template>

<script>
import { mapActions } from 'vuex'
import { confirm } from '@/decorator/confirm'
export default {
  methods: {
    ...mapActions({
      userLogout: 'user/logout'
    }),
    // 点击退出按钮
    @confirm('是否确定退出登录？')
    doLogout() {
      const loading = this.$loading({ lock: true })
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
