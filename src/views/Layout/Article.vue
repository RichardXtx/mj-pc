<template>
  <div class="article-page">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card shadow="never" border="false">
      <!-- 头部 -->
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            round
            @click="show('新增')"
          >
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
        <el-table-column prop="content" label="内容" show-overflow-tooltip>
        </el-table-column>
        <el-table-column prop="createdAt" label="更新时间" width="177">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <!-- slot-scope="scope" -->
          <template slot-scope="scope">
            <!-- scope.$index, scope.row -->

            <!-- 三个按钮 -->
            <div class="actions">
              <i class="el-icon-view" @click="show('预览')"></i>
              <i
                class="el-icon-edit-outline"
                @click="show('编辑', scope.row.id)"
              ></i>
              <i class="el-icon-delete" @click="del(scope.row.id)"></i>
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

    <!-- 新增 抽屉式 弹框 -->
    <el-drawer
      size="70%"
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <!-- form 表单 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="标题" prop="stem">
          <el-input v-model="form.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <!-- <el-input type="textarea" v-model="form.content"></el-input> -->
          <quillEditor v-model="form.content" @blur="fwbBlur"></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button @click="drawer = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
// 富文本编辑器局部引入
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'article-page',

  data () { // 初始化数据
    return {
      tableData: [{ // 默认展示数据
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

      total: 0, // 总文章数

      drawer: false, // 默认关闭
      direction: 'rtl', // 方向，这个为 右到左

      title: '',  // 标题,

      form: { // form 表单初始数据
        stem: '',
        content: '',
      },
      rules: { // 验证规则
        stem: [ // 标题验证规则
          { required: true, message: '请输入用户标题', trigger: 'blur' },
        ],
        content: [ // 标题验证规则
          { required: true, message: '请输入内容', trigger: 'blur' },
        ],
      },

    }
  },

  created () {
    this.getList()

  },

  methods: { // 各类方法

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
    handleCurrentChange (val) { // 页码变了执行
      // console.log(`当前页: ${val}`)
      this.current = val
      this.getList()
    },
    handleClose (done) { // ele 抽屉关闭

      this.$refs.form.resetFields() // 重置表单校验结果

      this.drawer = false

    },
    async show (val, id) { // 抽屉显示隐藏
      this.drawer = true // 点击打开

      this.title = val // 将参数赋值给标题

      if (val == '编辑') {
        let res = await this.$axios({
          url: "/admin/interview/show",
          params: { id }
        })
        // console.log(res)
        this.form.stem = res.data.data.stem
        this.form.content = res.data.data.content
      }
    },
    onSubmit () { // form提交
      this.$refs.form.validate(async (val) => {
        if (val) {
          let res = await this.$axios({
            url: '/admin/interview/create',
            method: "post",
            data: this.form
          })
          console.log(res)
          this.$message({
            message: '恭喜你，新增成功',
            type: 'success'
          })

          this.handleClose() // 重置表单
          this.getList() // 重新请求数据

        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    fwbBlur () { // 富文本编辑器失焦函数
      this.$refs.form.validateField('content')
    },
    del (id) { // 删除
      this.$confirm('你确定删除吗?')
        .then(async _ => {
          await this.$axios({
            url: '/admin/interview/remove',
            method: 'delete',
            data: { id }
          })
          this.$message({ // 成功提示
            message: '删除成功',
            type: 'success'
          })
          this.getList()  // 重新渲染列表

        })
        .catch(_ => {

        })

    }
  },

  components: { // 注册组件
    quillEditor
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
