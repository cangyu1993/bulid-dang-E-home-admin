<template>
  <div class="mainContent">
    <el-card>
      <p class="title">新闻标题</p>
      <el-input class="newstitle" v-model="newsContent.title"/>
      <div class="author-category">
        <div class="author">
          <p class="title">新闻作者</p>
          <el-select v-model="newsContent.author"
                     clearable
                     placeholder="请选择新闻作者">
            <el-option
              v-for="item in user"
              :key="item.value"
              :label="item.username"
              :value="item._id">
            </el-option>
          </el-select>
        </div>

        <div class="category">
          <p class="title">新闻分类</p>
          <el-select v-model="newsContent.type"
                     clearable
                     placeholder="请选择新闻分类">
            <el-option
              v-for="item in category"
              :key="item.value"
              :label="item.title"
              :value="item._id">
            </el-option>
          </el-select>
        </div>
        <div class="lookNum">
          <p class="title">观看人数</p>
          <el-input-number v-model="newsContent.lookNum"
                           :min="0"
                           :max="1000000"
          >
          </el-input-number>
        </div>
      </div>

      <div class="img" style="margin-top: 10px">
        <div class="switch">
          <p class="title">新闻头图</p>
          <el-switch
            style="display: block;margin-top: 10px;margin-left: 10px"
            v-model="isShow"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="URL上传"
            inactive-text="本地上传">
          </el-switch>
        </div>
        <upload @getimgs="getimgUrl" v-if="!isShow" v-show="!newsContent.img"/>
        <img :src="newsContent.img"
             style="width: 100px;height: 100px;margin-top: 10px"
             v-show="newsContent.img"
             v-if="!isShow"
        >
        <el-input class="newstitle"
                  v-model="newsContent.img"
                  v-if="isShow"
        />
      </div>
      <div class="quillEdit">
        <quill-editor
          v-model="newsContent.content"
          ref="myQuillEditor"
          :options="editorOption"
          @change="handleEditCha"
        >
        </quill-editor>
      </div>

      <el-button type="primary"
                 class="btn"
                 @click="handleClick"
      >添加新闻</el-button>
    </el-card>
  </div>
</template>

<script>
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  import upload from '@/components/upload'
  import axios from 'axios'

  Quill.register('modules/ImageExtend', ImageExtend)

  export default {
    components: {quillEditor, upload},
    name: "index",
    data() {
      return {
        token: '',
        isShow:true,
        newsContent: {
          title: '',
          content: '',
          contentText: '',
          author: '',
          type: '',
          lookNum: '',
          img: ''
        },
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
        },
        category: [],
        user: []
      }
    },
    methods: {
      getToken() {
        axios.get('http://upload.yaojunrong.com/getToken').then(res => {
          this.token = res.data.data
        })
      },
      handleEditCha({quill, html, text}) {
        // this.newsContent.content = html
        this.newsContent.contentText = text
      },
      getAuthor() {
        this.$axios.get('/getAllUser').then(res => {
          this.user = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      getCategory() {
        this.$axios.get('/allcategory').then(res => {
          this.category = res.data.data
        }).catch(err => {
          console.log(err)
        })
      },
      getimgUrl(e) {
        this.newsContent.img = e
      },
      handleClick(){
        this.$axios.post('/addnews',this.newsContent).then(res=>{
          console.log(res.data)
        }).catch(err=>{
          console.log(err)
        })
      }
    },
    created() {
      this.getToken()
      this.getAuthor()
      this.getCategory()
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
    .author-category {
      display: flex;
      justify-content: flex-start;
      .title {
        margin-bottom: 10px;
      }
      .category {
        margin-left: 40px;
      }
      .lookNum {
        margin-left: 40px;
      }
    }

    .quillEdit {
      margin-top: 20px;
      /deep/ .ql-editor {
        min-height: 300px;
      }
      /deep/ .ql-tooltip {
        margin-left: 400px;
      }
    }
    .btn{
      width: 100%;
      margin-top: 25px;
    }
  }
</style>
