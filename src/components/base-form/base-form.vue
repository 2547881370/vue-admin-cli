<template>
  <div class="base-form-container">
    <el-form :model="queryForm" :rules="rules" ref="form" :inline="inline">
      <template v-for="(item, index) in options">
        <el-form-item :label="item.label" :prop="item.prop" :required="item.required" :key="item.prop">
          <!--输入框类型-->
          <el-input
            v-model="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.text && !item.trim"
            :disabled="item.disabled"
            :type="item.type"
            :maxlength="item.maxlength"
            @change="onChange"
          />

          <!--输入框类型 去除前后空格-->
          <el-input
            v-model.trim="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.text && item.trim"
            :disabled="item.disabled"
            :type="item.type"
            :maxlength="item.maxlength"
            @change="onChange"
          />

          <!--密码类型-->
          <el-input
            v-model="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.password"
            :disabled="item.disabled"
            :type="item.type"
            :maxlength="item.maxlength"
            show-password
            @change="onChange"
          />

          <!--数字类型-->
          <el-input
            v-model.number="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.number"
            :disabled="item.disabled"
            :type="item.type"
            :maxlength="item.maxlength"
            @change="onChange"
          />

          <!--文本域类型-->
          <el-input
            v-model="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.textarea"
            :disabled="item.disabled"
            :type="item.type"
            :maxlength="item.maxlength"
            :show-word-limit="true"
            :rows="item.rows"
            @change="onChange"
          />

          <!--下拉选项-->
          <el-select
            v-model="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.selector"
            :disabled="item.disabled"
            :multiple="item.multi"
            :value-key="item.itemProp.value"
            @change="onChange"
          >
            <el-option
              v-for="child in item.itemList"
              :key="child[item.itemProp.value]"
              :label="child[item.itemProp.label]"
              :value="child[item.itemProp.value]"
            />
          </el-select>

          <!--级联选择-->
          <el-cascader
            v-model="queryForm[item.prop]"
            :placeholder="item.placeholder"
            v-if="item.type === formTypeEnum.cascader"
            :options="item.itemList"
            :props="item.itemProp"
            :disabled="item.disabled"
            :readonly="item.readonly"
            :filterable="item.filterable"
            @change="onChange(item)"
          >
          </el-cascader>

          <!--多选checkbox-->
          <el-checkbox-group
            v-model="queryForm[item.prop]"
            v-if="item.type === formTypeEnum.checkbox"
            @change="onChange(item)"
          >
            <el-checkbox
              v-for="child in item.itemList"
              :key="child[item.itemProp.value]"
              :label="child[item.itemProp.value]"
              :disabled="child.state"
            >
              {{ child[item.itemProp.label] }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('form')">搜索</el-button>
        <el-button type="primary" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { FormTypeEnum } from '@/components/base-form/enums/base-form-enum'

export default {
  name: 'base-form',
  props: {
    options: {
      type: Array,
      default: () => []
    },

    // 布局方式
    inline: {
      type: Boolean,
      default: () => false
    },

    // 数据双向绑定
    formData: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  model: {
    prop: 'formData',
    event: 'change'
  },
  data() {
    return {
      queryForm: {},
      rules: {},
      formTypeEnum: FormTypeEnum
    }
  },
  created() {
    this.initData()
    this.formatOptions()
  },
  mounted() {},
  methods: {
    // init
    initData() {
      this.queryForm = this.formData
    },

    // 将配置进行拆分和组合
    formatOptions() {
      for (let index = 0; index < this.options.length; index++) {
        let item = this.options[index]

        // 设置表单校验
        this.setRules(item)

        // 如果包含多选框时,model必须为array
        if (item.type === this.formTypeEnum.checkbox) {
          this.$set(this.queryForm, item.prop, this.formData[item.prop] || [])
        }
      }
    },

    // 设置表单校验
    setRules(item) {
      // 默认添加校验
      this.rules[item.prop] = [{ required: item.required || false, message: item.placeholder }]

      if (item.rules) {
        this.rules[item.prop] = this.rules[item.prop].concat(item.rules)
      }
    },

    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit('submit', this.queryForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    onReset() {
      this.$refs['form'].resetFields()
      this.$emit('reset', this.queryForm)
    },

    // 数据双向绑定
    onChange() {
      this.$emit('change', this.queryForm)
    }
  }
}
</script>

<style lang="less" scoped>
.base-form-container {
}
</style>
