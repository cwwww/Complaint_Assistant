<template>
  <div class="warp">
    <!-- <van-loading /> -->
    <van-popup
      v-model="show_uploader"
      closeable
      round
      position="bottom"
      :style="{ height: '30%' }"
      @closed="close"
    >
    <el-upload
      ref="upload"
      class="upload-demo"
      action
      accept=".xlsx"
      :limit=limit
      :auto-upload="true"
      :before-upload="beforeUpload"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-exceed="handleExceed"
      :on-success="handleSuccess"
      :on-error="handleError"
      :file-list="fileList"
      :http-request="uploadFile"
    >
      <el-button size="large" type="text" style="margin:15%">+Upload</el-button>
      <!-- <el-button type="primary" @click="submitUpload">Confirm</el-button> -->
    </el-upload>
    </van-popup>
  </div>
</template>
<script>
import axios from 'axios'

  export default {
    data() {
      return {
        limit: 1,  // 上传excell时，同时允许上传的最大数
        fileList: [],   // excel文件列表
        show_uploader: true

      }
    },
    props: ["showuploaderC"],
      watch: {
    showuploaderC(newValue) {
      this.show_uploader = newValue;
    },

    },
    methods:{
      close() {
      let params = {
        data: false,
      };
      console.log("close")
      this.$emit("closeUploaderC", params);
    },
      // 上传文件之前的钩子, 参数为上传的文件,若返回 false 或者返回 Promise 且被 reject，则停止上传
      beforeUpload(file) {
      let extension = file.name.substring(file.name.lastIndexOf('.')+1)
        let size = file.size / 1024 / 1024 
        if(extension !== 'xlsx') {
          this.$message.warning('只能上传后缀是.xlsx的文件')
        }
        if(size > 10) {
          this.$message.warning('文件大小不得超过10M')
        }
      },
    //   submitUpload() {
    //   this.$refs.upload.submit();
    // },
      // 文件状态改变
      handleChange(file, fileList) {
        if (file) {
          this.fileList = fileList.slice(-3)
        }
      },

      // 删除文件
      handleRemove(file, fileList) {
        this.fileList = []
      },

      // 文件超出个数限制
      handleExceed(files, fileList) {
        this.$message.warning(`只能选择 ${this.limitNum} 个文件，当前共选择了 ${files.length + fileList.length} 个`)
      },

      // 文件上传成功
      handleSuccess(res, file, fileList) {
        this.$message.success('文件上传成功')
      },

      // 文件上传失败
      handleError(err, file, fileList) {
        this.$message.error('文件上传失败')
      },
      
      // 覆盖默认的上传行为，自定义上传的实现
      uploadFile:function(file) {
        if (this.fileList.length === 0){
          this.$message.warning('Please upload file!')
        } else {
          console.log("upload!")
          const data = new FormData()
          const fileUps = file.file
          data.append('file', fileUps)
          axios.post('http://127.0.0.1:8000/common/recExcel/',data,{
            headers: {
              'Content-Type': 'multipart/form-data'
            },
          }).then(res=>{
            console.log(res)
          },err =>{
            console.log(err)
          })
        }
      }
    }
  }
</script>

