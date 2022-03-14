<template>
  <div class="newUser">
    <div class="newUser_input">
      <el-form
        ref="ruleForm"
        :model="information"
        :rules="rules"
        label-width="140px"
        class="demo-ruleForm"
        label-position="right"
      >
        <div class="newUser_input_form">
          <ul>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="用户姓名：" prop="userName">
                    <el-input
                      v-model.trim="information.userName"
                      placeholder="用户姓名"
                      style="width:220px"
                      maxlength="10"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item label="用户账号：" prop="account">
                    <el-input
                      v-model.trim="information.account"
                      placeholder="用户账号"
                      maxlength="15"
                      style="width:220px"
                      show-word-limit
                      clearable
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="所属辖区：" prop="areaId">
                    <tree-select
                      v-model="information.areaId"
                      class="tree_select"
                      style="width: 250px"
                      :options="deptTreeData"
                      :normalizer="normalizer"
                      placeholder="请选择所属辖区"
                      @input="handleDeptIdChage"
                    />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item label="账号有效期：" prop="userValidity">
                    <el-date-picker
                      v-model="information.userValidity"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="是否辖区负责人：" prop="userType">
                    <el-select
                      v-model="information.userType"
                      placeholder="是否辖区负责人"
                      style="width:220px"
                      name="level"
                    >
                      <el-option
                        v-for="(item, index) of userTypeArr"
                        :key="item.codeVal"
                        :label="item.codeExplain1"
                        :value="item.codeVal"
                      >
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item label="密码有效期：" prop="pwdValidity">
                    <el-date-picker
                      v-model="information.pwdValidity"
                      type="date"
                      value-format="yyyy-MM-dd"
                      placeholder="选择日期"
                      :picker-options="pickerOptions"
                    />
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-col :span="10">
                  <el-form-item label="身份证号：" prop="userCard">
                    <el-input v-model.trim="information.userCard" style="width:250px" maxlength="18" show-word-limit />
                  </el-form-item>
                </el-col>
                <el-col :span="10" :offset="1">
                  <el-form-item label="手机号码：" prop="userPhone">
                    <el-input
                      v-model.trim.number="information.userPhone"
                      style="width:220px"
                      maxlength="11"
                      show-word-limit
                    />
                    <br />
                    <span style="font-size: 12px;">设定手机号，可用于验证码登录</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </li>
            <li>
              <el-row>
                <el-form-item label="现住地址：">
                  <el-select
                    v-model="information.userProvince"
                    @change="getCity"
                    filterable
                    placeholder="省"
                    style="width: 150px;"
                  >
                    <el-option
                      v-for="item of provinceList"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                  <span style="margin: 0 10px;">-</span>
                  <el-select
                    v-model="information.userCity"
                    filterable
                    @change="getDistrict"
                    placeholder="市"
                    style="width: 150px;"
                  >
                    <el-option v-for="item of cityList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                  </el-select>
                  <span style="margin: 0 10px;">-</span>
                  <el-select v-model="information.userDistrict" filterable placeholder="区" style="width: 150px;">
                    <el-option
                      v-for="item of districtList"
                      :label="item.name"
                      :key="item.id"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input
                    v-model="information.userAddress"
                    style="width:520px"
                    placeholder="详细地址"
                    rows="3"
                    maxlength="99"
                    show-word-limit
                    type="textarea"
                  />
                </el-form-item>
              </el-row>
            </li>
            <li>
              <el-form-item label="备注：">
                <el-input
                  v-model.trim="information.remark"
                  style="width:520px"
                  placeholder="备注"
                  rows="3"
                  maxlength="99"
                  show-word-limit
                  type="textarea"
                />
              </el-form-item>
            </li>
            <li>
              <el-form-item label="关联角色：" prop="relatedRole" style="min-width: 500px;">
                <el-checkbox-group v-model="information.relatedRole">
                  <el-checkbox v-for="item in queryRoleList" :key="item.roleId" :label="item.roleId">
                    {{ item.roleName }}
                  </el-checkbox>
                </el-checkbox-group>
              </el-form-item>
            </li>
          </ul>
        </div>

        <div class="newUser_input_button">
          <el-button size="small" type="primary" @click="onSubmit('ruleForm')">
            保 存
          </el-button>
          <!-- <el-button size="small" @click="resetForm('ruleForm')">
            重置
          </el-button> -->
          <el-button type="primary" plain size="small" @click="returnPage">
            取 消
          </el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import { loadFromSession } from '@/common/session-storage'
import * as PublicTool from '@/common/public.js'
import { getAreaAll, getAreaByUserId } from '@/api/area'
import { queryRole } from '@/api/role'
import { addUser } from '@/api/user'
import { validatePhone, validateAccount, checkUserCard } from '@/common/validate.js'

export default {
  components: {
    TreeSelect
  },
  props: {
    setTemplateName: {
      type: [Function],
      default: null
    }
  },
  computed: {
    ...mapState({
      // 用户类型选项
      userTypeArr: state => state.allConfig.userTypeArr,
      userSexArr: state => state.allConfig.userSexArr,
      userStatusArr: state => state.allConfig.userStatusArr,
      // 省-市-区，这里直接用在【省】的下拉中
      provinceList: state => state.allConfig.allAddressList
    })
  },
  data() {
    return {
      deptTreeData: [],
      // vuetreeselect 的下拉配置项，到时候需要提到config配置里面去
      normalizer(node) {
        return {
          id: node.areaId,
          label: node.areaName,
          children: node.children
        }
      },
      pickerOptions: {
        onPick: obj => {
          this.pickerMinDate = new Date(obj.minDate).getTime()
        },
        disabledDate: time => {
          const day2 = 24 * 3600 * 1000
          if (this.pickerMinDate) {
            const day1 = 30 * 24 * 3600 * 1000
            let maxTime = this.pickerMinDate + day1
            let minTime = this.pickerMinDate - day1
            return time.getTime() < maxTime || time.getTime() > minTime || time.getTime() < Date.now() - day2
          } else {
            return time.getTime() < Date.now() - day2
          }
        }
      },
      cityList: [], // 市
      districtList: [], // 区
      // 关联角色选择项
      queryRoleList: [],
      // 表单
      information: {
        // 用户类型（是否是辖区管理员）
        userType: '',
        userName: null,
        // 用户账号
        account: null,
        // 辖区id
        areaId: null,
        // 身份证
        userCard: null,
        // 账户有效期
        userValidity: null,
        // 密码有效期
        pwdValidity: null,
        // 手机号码
        userPhone: null,
        // 现住地址，省市区
        userProvince: null,
        userCity: null,
        userDistrict: null,
        userAddress: null,
        // 备注
        remark: null,
        // 关联角色
        relatedRole: []
      },
      rules: {
        userType: [{ required: true, message: '请选择是否是辖区负责人', trigger: ['blur, change'] }],
        userName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
        account: [
          { required: true, message: '请输入用户账号', trigger: 'blur' },
          { required: true, validator: validateAccount, trigger: 'blur' }
        ],
        areaId: [{ required: true, message: '请选择所属辖区', trigger: 'change' }],
        userValidity: [{ required: true, message: '请选择账户有效期', trigger: 'change' }],
        pwdValidity: [{ required: true, message: '请选择密码有效期', trigger: 'change' }],
        sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
        userCard: [
          { required: true, message: '请输入身份证', trigger: 'blur' },
          { min: 18, max: 18, message: '身份证号码不符合要求', trigger: 'blur' },
          { required: true, validator: checkUserCard, trigger: 'blur' }
        ],
        userPhone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { required: true, validator: validatePhone, trigger: 'blur' }
        ],
        relatedRole: [{ required: true, message: '请选择关联角色', trigger: 'blur' }]
      }
    }
  },

  created() {
    // 获取部门树结构
    this.getAllDeptTree()
    // 获取角色列表供用户选择
    // this.getAllRoleList()

    // 是否辖区负责人，默认【否】
    this.information.userType = this.userTypeArr[1].codeVal
  },

  methods: {
    handleDeptIdChage(val) {
      this.$refs.ruleForm.validateField('areaId')
      this.getAllRoleList(val)
      this.information.relatedRole = []
      this.$refs.ruleForm.clearValidate('relatedRole')
    },
    // 获取城市列表
    getCity(provinceId) {
      if (!provinceId) {
        this.cityList = []
        return
      }
      if (this.cityList && this.cityList.length > 0 && this.cityList[0].pid == provinceId) {
        return
      }
      let flag = false
      let flag2 = false
      for (let index = 0; index < this.provinceList.length; index++) {
        const p = this.provinceList[index]
        if (p.id == provinceId) {
          this.cityList = p.child
          flag2 = true
          for (let j = 0; j < this.cityList.length; j++) {
            const c = this.cityList[j]
            if (c.id == this.information.userCity) {
              this.information.userCity = c.id
              flag = true
              break
            }
          }
          break
        }
      }
      if (!flag2) {
        this.cityList = []
      }
      if (!flag) {
        this.information.userCity = ''
        this.information.userDistrict = ''
      }
    },
    // 获取区县列表
    getDistrict(cityId) {
      if (!cityId) {
        this.districtList = []
        return
      }
      if (this.districtList && this.districtList.length > 0 && this.districtList[0].pid == cityId) {
        return
      }
      let flag = false
      let flag2 = false
      for (let index = 0; index < this.cityList.length; index++) {
        const c = this.cityList[index]
        if (c.id == cityId) {
          this.districtList = c.child
          flag2 = true
          for (let j = 0; j < this.districtList.length; j++) {
            const d = this.districtList[j]
            if (d.id == this.information.userDistrict) {
              this.information.userDistrict = d.id
              flag = true
              break
            }
          }
          break
        }
      }
      if (!flag2) {
        this.districtList = []
      }
      if (!flag) {
        this.information.userDistrict = ''
      }
    },

    getAllRoleList(val = null) {
      queryRole({ page: -1, areaId: val }).then(res => {
        this.queryRoleList = res.data
      })
    },

    // 获取辖区
    getAllDeptTree() {
      // 根据当前用户id，获取辖区树结构
      getAreaByUserId(loadFromSession('userInfo')?.userId ?? '').then(({ data }) => {
        // 没有数据
        if (!PublicTool.isContent(data)) {
          this.deptTreeData = []
        } else {
          // 有数据
          this.deptTreeData = PublicTool.formatTree2(data, 'areaId', 'pid', loadFromSession('userInfo')?.areaId)
        }
      })
    },
    // 保存
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let params = {
            // 添加的时候，默认状态正常
            status: '1',
            roles: this.information.relatedRole
          }
          Object.assign(params, this.information)
          const loading = this.$loading({ lock: true })
          addUser(params)
            .then(({ code, msg }) => {
              this.$message({
                type: code != '000000' ? 'warning' : 'success',
                message: code != '000000' ? msg : '新增用户成功'
              })
              code != '000000' ? '' : this.returnPage()
            })
            .catch(error => {
              console.log('新增用户error：', error)
            })
            .finally(() => {
              loading.close()
            })
        }
      })
    },
    // 返回
    returnPage() {
      this.setTemplateName({
        templateName: 'userList'
      })
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
