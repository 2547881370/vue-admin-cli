<template>
  <div class="base-table-container">
    <el-table
      ref="table"
      v-base-loading="loading"
      :data="data"
      :row-class-name="tableRowClassName"
      :row-key="rowKey"
      :tree-props="option.treeProps || {}"
      v-loading="loading"
      v-bind="$attrs"
    >
      <el-table-column
        v-for="(item, index) of option.column"
        :key="item.prop"
        :align="item.align"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
      >
        <template slot-scope="{ row, $index }">
          <template v-if="item.type === columnType.slot || item.type === columnType.operation">
            <slot :index="$index" :name="'table-slot-' + item.prop" :row="row"></slot>
          </template>
          <!--普通数据-->
          <template v-else>
            {{ row[item.prop] || '' }}
          </template>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination" v-if="option.isPagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { ColumnTypeEnum } from '@/components/base-table/enums/base-table-enum'

export default {
  name: 'base-table',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },

    loading: {
      type: Boolean,
      default: () => {
        return false
      }
    },

    option: {
      type: Object,
      default: () => {
        return {}
      }
    },

    rowKey: {
      type: String,
      default: () => {
        return ''
      }
    },

    tableRowClassName: {
      type: String,
      default: () => {
        return ''
      }
    },

    // 用于分页-共多少条数据
    total: {
      type: Number,
      default: () => {
        return 0
      }
    },

    // 每页多少条数据
    pageSize: {
      type: Number,
      default: () => {
        return 10
      }
    },

    // 每页显示个数选择器的选项设置
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 50, 100]
      }
    }
  },
  data() {
    return {
      columnType: ColumnTypeEnum,
      // 当前页
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.$emit('sizeChange', val)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.$emit('currentChange', val)
    }
  }
}
</script>

<style lang="less" scoped>
.base-table-container {
  .pagination {
    padding: 10px;
    display: flex;
    justify-content: center;
  }
}
</style>
