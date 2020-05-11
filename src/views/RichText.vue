<template>
  <Editor
    :init="initConfig"
    v-model="content"
  >Init text</Editor>
</template>

<script lang="ts">
import Vue from 'vue'
import 'tinymce/themes/mobile/theme.js'
import Editor from '@tinymce/tinymce-vue'
export default Vue.extend({
  components: {
    Editor
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    // 在失去焦点的时候会触发一次change事件，导致删除出现问题
    willRemove: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
      content: '',
      initConfig: {
        statusbar: false,
        // 固定宽高
        width: 850,
        height: 400,
        /* eslint-disable max-len */
        // plugins配置参数用于指定哪些插件被用在当前编辑器实例中
        plugins: 'image link table lists imagetools',
        // 工具栏上添加相应的按钮
        toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | link image table | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat',
        // 顶部菜单栏显示
        menubar: false,
        // 中文语言包路径
        language_url: '/langs/zh_CN.js',
        language: 'zh_CN',
        target_list: [
          { title: '当前窗口', value: '' },
          { title: '新窗口', value: '_blank' },
        ],

        /* 我们的自定义图像选择器 */
        file_picker_types: 'image',
        // @ts-ignore
        file_picker_callback: function (cb, value, meta) {
          let input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')

          input.onchange = function () {
            // @ts-ignore
            let file = this.files[0]
            let reader = new FileReader()
            reader.onload = function () {
              /* Note: Now we need to register the blob in TinyMCEs image blob registry.  */
              let id = 'blobid' + (new Date()).getTime()
              // @ts-ignore
              let blobCache = tinymce.activeEditor.editorUpload.blobCache
              // @ts-ignore
              let base64 = reader.result.split(',')[1]
              console.log(reader.result)
              let blobInfo = blobCache.create(id, file, base64)
              blobCache.add(blobInfo)

              cb(blobInfo.blobUri(), { title: file.name })
            }
            reader.readAsDataURL(file)
          }

          input.click()
        },
      },
      /* eslint-enable max-len */
    }
  },
  computed: {
    // content: {
    //   get: function (): string {
    //     return this.value
    //   },
    //   set: function (v: string) {
    //     // eslint-disable-next-line no-console
    //     // console.table({
    //     //   isChged: this.content !== v,
    //     //   'willRemove': this.willRemove,
    //     // })
    //     if (this.content !== v && !this.willRemove) {
    //       this.$emit('input', v)
    //     }
    //   },
    // },
  },
  methods: {
    onChange (e: any) {
      this.$emit('input', this.content)
      console.log(e.type, this.content)
    },
  },
})
</script>

