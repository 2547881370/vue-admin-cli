<template>
  <div class="newUser">
    <!-- 返回上一页 -->
    <div class="getNormalscheduling_return">
      <div>
        <el-link type="primary" :underline="false" @click="returnPage"> <img :src="backImg" alt /> 返回 </el-link>
      </div>
    </div>

    <div class="newUser_input">
      <el-form
        ref="ruleForm"
        :model="infoData"
        status-icon
        label-width="140px"
        class="demo-ruleForm"
        label-position="right"
        disabled
      >
        <div class="newUser_input_form">
          <ul>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户姓名：" prop="userName">
                    <span>{{ infoData.userName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="用户账号：" prop="account">
                    <span>{{ infoData.account }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="所属辖区：" prop="areaName">
                    <span>{{ infoData.areaName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="是否辖区负责人：" prop="userTypeName">
                    <span>{{ infoData.userTypeName }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="性别：" prop="userSexName">
                    <span>{{ infoData.userSexName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="账户有效期：" prop="pwdValidity">
                    <span>{{ pwdValidity }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="身份证号：" prop="userCard">
                    <span>{{ infoData.userCard }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="密码有效期：" prop="pwdValidity">
                    <span>{{ pwdValidity }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户状态：" prop="statusName">
                    <span>{{ infoData.statusName }}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="10">
                  <el-form-item label="手机号码：" prop="userPhone">
                    <span>{{ infoData.userPhone }}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-form-item label="现住地址：">
                  <span style="width: 150px;">{{ infoData.userProvinceName }}</span>
                  <span style="margin: 0 10px;">-</span>
                  <span style="width: 150px;">{{ infoData.userCityName }}</span>
                  <span style="margin: 0 10px;">-</span>
                  <span style="width: 150px;">{{ infoData.userDistrictName }}</span>
                </el-form-item>
                <el-form-item>
                  <span style="width:520px">{{ infoData.userAddress }}</span>
                </el-form-item>
              </el-row>
            </li>
            <li>
              <el-form-item label="备注：" prop="remark">
                <span>{{ infoData.remark }}</span>
              </el-form-item>
            </li>
            <li>
              <el-form-item label="关联角色：">
                <span>
                  {{ queryRoleList }}
                </span>
              </el-form-item>
            </li>
          </ul>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import * as PublicTool from '@/common/public.js'
import { findUser } from '@/api/user'
export default {
  props: {
    setTemplateName: {
      type: [Function],
      default: null
    },
    infoData: {
      type: [Object],
      default: null
    }
  },
  data() {
    return {
      backImg: require('@/assets/images/common-icon-img/back.png'),
      // 账户有效期
      userValidity: '',
      // 密码有效期
      pwdValidity: '',
      // 关联角色
      queryRoleList: ''
    }
  },
  async mounted() {
    await this.getUserDetial()
  },
  methods: {
    // 返回
    returnPage() {
      this.setTemplateName({
        templateName: 'userList'
      })
    },
    // 获取用户详情
    getUserDetial() {
      // 打开进度条
      const loading = this.$loading({ lock: true })
      return new Promise((resove, reject) => {
        findUser(this.infoData.userId)
          .then(({ data }) => {
            // 没有数据
            if (!PublicTool.isContent(data)) {
              this.$message.warning('该用户信息暂时无法查看!')
            } else {
              // 有数据
              this.setUserDetial(data)
            }
            resove()
          })
          .catch(() => {
            reject()
          })
          .finally(() => {
            loading.close()
          })
      })
    },
    setUserDetial(userInfo) {
      if (userInfo?.userAccount?.userCard) {
        // 脱敏身份证
        userInfo.userAccount.userCard = PublicTool.secretUserCard(userInfo.userAccount.userCard)
      }
      if (PublicTool.isContent(userInfo.userAccount.userValidity)) {
        this.userValidity = userInfo.userAccount.userValidity
      }
      if (PublicTool.isContent(userInfo.userAccount.pwdValidity)) {
        this.pwdValidity = userInfo.userAccount.pwdValidity
      }
      Object.assign(this.infoData, userInfo.userAccount)
      if (PublicTool.isContent(userInfo.role)) {
        let qyaiUserRoles = []
        userInfo.role.forEach(r => {
          qyaiUserRoles.push(r.roleName)
        })
        this.queryRoleList = qyaiUserRoles.toString()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.newUser {
  position: relative;
  width: 100%;
  padding: 24px;
  box-sizing: border-box;
  .getNormalscheduling_return {
    width: 100%;
    height: 23px;
    div {
      width: auto;
    }
    img {
      width: 15px;
      height: 14px;
      vertical-align: middle;
    }
  }
  .newUser_head_portrait {
    width: 100%;
    height: 145px;
    display: flex;
    align-items: center;
    //  background: olivedrab;
    .newUser_head_portrait_add {
      width: 80px;
      height: 80px;
      background: rgba(242, 246, 252, 1);
      border: 1px solid rgba(220, 223, 230, 1);
      border-radius: 4px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      .el-icon-plus {
        font-size: 24px;
        color: rgba(192, 196, 204, 1);
        margin-bottom: 5px;
      }
      span {
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(80, 150, 240, 1);
      }
    }
  }

  .newUser_input {
    width: 100%;
    .newUser_input_form {
      ul {
        li {
          display: flex;
          margin-bottom: 10px;
        }
      }
    }

    .newUser_input_button {
      height: 200px;
      display: flex;
      align-items: center;
      margin-left: 50px;
      justify-content: center;
    }
  }

  .contactNumber {
    .contactNumber_list {
      width: 106%;
      height: 40px;
      display: flex;
      overflow-y: scroll;
      margin-top: 5px;
      /* 设置滚动条的样式 */
      &::-webkit-scrollbar {
        height: 5px;
      }

      /* 滚动槽 */
      &::-webkit-scrollbar-track {
        border-radius: 10px;
      }

      /* 滚动条滑块 */
      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(8, 3, 3, 0.151);
      }

      .contactNumber_list_info {
        margin-left: 5px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.newUser .el-select {
  width: 100%;
}
.newUser .el-row {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
}

.newUser .el-upload-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: none;
}

.newUser .el-select .el-select__tags > span {
  display: contents;
  width: 100%;
  display: block;
  display: flex;
  overflow-y: scroll;
  margin-left: 10px;
}

/* 设置滚动条的样式 */
.newUser .el-select .el-select__tags > span::-webkit-scrollbar {
  height: 5px;
}

/* 滚动槽 */
.newUser .el-select .el-select__tags > span::-webkit-scrollbar-track {
  border-radius: 10px;
}

/* 滚动条滑块 */
.newUser .el-select .el-select__tags > span::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: rgba(8, 3, 3, 0.151);
}
.newUser .el-checkbox__label {
  color: #000;
}
.newUser /deep/ .el-form-item__label {
  color: #fff;
}
.avatar-uploader /deep/ .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
