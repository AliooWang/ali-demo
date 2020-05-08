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
    Editor,
    // eslint-disable-next-line vue/no-unused-components
    // VueFroala,
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
        width: 850,
        height: 400,
        /* eslint-disable max-len */
        plugins: 'image link table lists imagetools',
        // plugins: 'image link table anchor toc advlist lists imagetools powerpaste',
        toolbar: 'formatselect | bold italic underline strikethrough forecolor backcolor | link image table | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat',
        menubar: false,
        language_url: '/langs/zh_CN.js',
        language: 'zh_CN',
        target_list: [
          { title: '当前窗口', value: '' },
          { title: '新窗口', value: '_blank' },
        ],
        file_picker_types: 'image',
        /* and here's our custom image picker */
        // @ts-ignore
        file_picker_callback: function (cb, value, meta) {
          let input = document.createElement('input')
          input.setAttribute('type', 'file')
          input.setAttribute('accept', 'image/*')

          /*
      Note: In modern browsers input[type="file"] is functional without
      even adding it to the DOM, but that might not be the case in some older
      or quirky browsers like IE, so you might want to add it to the DOM
      just in case, and visually hide it. And do not forget do remove it
      once you do not need it anymore.
    */

          input.onchange = function () {
            // @ts-ignore
            let file = this.files[0]

            let reader = new FileReader()
            reader.onload = function () {
              /*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
              let id = 'blobid' + (new Date()).getTime()
              // @ts-ignore
              let blobCache = tinymce.activeEditor.editorUpload.blobCache
              // @ts-ignore
              let base64 = reader.result.split(',')[1]
              console.log(reader.result)
              let blobInfo = blobCache.create(id, file, base64)
              blobCache.add(blobInfo)

              // const blobUri = URL.createObjectURL(dataURLtoBlob(reader.result as string))
              // console.log(blobUri)
              // cb(blobUri, { title: file.name })
              /* call the callback and populate the Title field with the file name */
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

