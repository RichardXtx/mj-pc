<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="never" border="false">
      <!-- 头部 -->
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" round>
            添加面经
          </el-button>
        </div>
      </template>

      <!-- table表格 -->
      <el-table
        :data="tableData"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column
          prop="stem"
          label="标题"
          width="260"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column prop="creator" label="作者"> </el-table-column>
        <el-table-column prop="likeCount" label="点赞"> </el-table-column>
        <el-table-column prop="views" label="浏览数"> </el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="177">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- scope.$index, scope.row -->

            <!-- 三个按钮 -->
            <div class="actions">
              <i class="el-icon-view"></i>
              <i class="el-icon-edit-outline"></i>
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="current"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'article-page',
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      current: 1, // 当前页数
      pageSize: 10, // 每页展示数量

      // 总文章数
      total: 0
    }
  },
  created () {
    this.getList()

  },
  methods: {
    async getList () { // 公共请求数据函数
      let res = await this.$axios({
        url: '/admin/interview/query',
        params: {
          current: this.current,
          pageSize: this.pageSize
        }
      })
      // console.log(res)
      this.tableData = res.data.data.rows
      // console.log(res.data.data)
      this.total = res.data.data.total
    },
    tableRowClassName ({ row, rowIndex }) { // 颜色
      if (rowIndex % 2 == 0) {
        return 'warning-row'
      } else if (rowIndex % 2 != 0) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange (val) { // 每页页数变化执行
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.current = val
      this.getList()
    }
  },
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }
  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;
    > i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}
.el-pagination {
  margin-top: 20px;
  text-align: center;
}
.el-breadcrumb {
  margin-top: 10px;
}
.el-form {
  padding-right: 40px;
}
.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}
.el-rate {
  padding: 10px 0;
}
.article-preview {
  padding: 0 40px 40px 40px;
  > h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
::v-deep .el-table .warning-row {
  background: rgb(18, 196, 241);
}
::v-deep .el-table .success-row {
  background: #f0f9eb;
}
</style>
