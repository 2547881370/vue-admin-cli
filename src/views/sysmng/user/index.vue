<!-- 用户管理 -->
<template>
  <div class="page-container">
    <component
      :is="templateName"
      :set-template-name="setTemplateName"
      :setInfoData="setInfoData"
      :infoData="infoData"
    />
  </div>
</template>
<script>
import userList from './userList'
import addUser from './addUser'
import viewUser from './viewUser'
import editUser from './editUser'
export default {
  components: {
    userList,
    addUser,
    viewUser,
    editUser
  },
  data() {
    return {
      templateName: 'userList',
      infoData: null
    }
  },
  mounted() {
    // todo
  },
  methods: {
    setTemplateName(data) {
      this.templateName = data.templateName
    },
    setInfoData(data) {
      this.infoData = JSON.parse(JSON.stringify(data.infoData))
    }
  }
}
</script>

<style lang="less" scoped>
.page-container {
  box-sizing: border-box;
  padding: 10px;
  padding-right: 30px;
}
</style>
