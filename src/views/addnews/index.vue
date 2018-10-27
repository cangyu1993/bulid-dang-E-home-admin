<template>
  <div class="mainContent">
    <el-card>
      <p class="title">新闻标题</p>
      <el-input class="newstitle"/>
      <p class="title">新闻作者</p>
      <el-input class="newstitle"/>
      <div class="quillEdit">
        <quill-editor
          v-model="content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="handleEditCha"
        >
        </quill-editor>
      </div>
    </el-card>
  </div>
</template>

<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
  import axios from 'axios'

  export default {
    components: {quillEditor},
    name: "index",
    data() {
      return {
        token: '',
        content: '',
        editorOption: {
          modules: {
            ImageExtend: {
              loading: true,
              name: 'file',
              action: 'https://upload-z1.qiniup.com',
              response: (res) => {
                return res.url
              },
              change: (xhr, formData) => {
                formData.append('token', this.token)
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
      }
    },
    methods: {
      getToken() {
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.token = res.data.data
        })
      },
      handleEditCha({quill, html, text}) {
        // console.log('editor change!', quill, html, text)
        // console.log(text)
        // this.content = html
      }
    },
    created() {
      this.getToken()
    }
  }
</script>

<style scoped lang="scss">
  .mainContent {
    box-sizing: border-box;
    margin: 20px 20px;
    .newstitle {
      margin: 10px 0;
      width: 70%;
    }
    .quillEdit {
      margin-top: 20px;
      /deep/ .ql-editor {
        min-height: 400px;
      }
      /deep/ .ql-tooltip {
        margin-left: 400px;
      }

    }
  }
</style>
