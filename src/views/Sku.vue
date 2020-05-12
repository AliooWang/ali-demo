<template>
  <div class='sku-page-view'>
    <div
      v-for="(spec, index) in specification"
      :key="spec.id"
      class="sku-group"
    >
      <div class="spec-title">
        <span class="label">规格名：</span>
        <el-input
          class="input"
          v-model.trim="spec.value"
        ></el-input>
        <span
          class="remove-title"
          @click="delSepc(index)"
        >
          ×
        </span>
      </div>

      <div class="group-container">
        <span class="value-title-text">规格值：</span>
        <el-popover
          placement="bottom"
          width="120"
          trigger="click"
          v-for="(option, option_index) in spec.leaf" :key="option_index"
        >
          <el-input
            v-model.trim="option.value"
            style="width: 110px;"
          ></el-input>
          <div class="sku-item" slot="reference">
            <span class="remove" @click.stop="delOption(index, option_index)">×</span>
            <div class="text">{{ option.value }}</div>
          </div>
        </el-popover>
        <el-input
          class="input"
          suffix-icon="el-icon-plus"
          v-model="addValues[index]"
          placeholder="多个产品属性以空格隔开"
          @keyup.native.enter="addOption(index)"
          @blur="addOption(index)"
        ></el-input>
      </div>
    </div>

    <div class="spec-title">
      <el-button
        type="primary"
        size="medium "
        :disabled="disabled"
        @click="addSpec"
      >添加规格项目</el-button>
    </div>

    <div>
      <SkuTable
        :skusData="specificationFilter"
      />
    </div>
  </div>
</template>
      
<script lang='ts'>
import Vue from 'vue'
import { createUniqueString, uniqueArr } from '../lib/utils'
export default Vue.extend({
  components: {
    SkuTable: () => import(/* webpackChunkName SkuTable */ 'components/sku/SkuTable.vue'),
  },
  data() {
    return {
      addValues: [],
      specification: [
        {
          id: 1,
          value: '颜色',
          leaf: [
            {
              id: 11,
              value: '白色',
            },
            {
              id: 12,
              value: '黑色',
            },
          ],
        },
        {
          id: 2,
          value: '内存',
          leaf: [
            {
              id: 21,
              value: '128G',
            },
            {
              id: 22,
              value: '256G',
            }
          ],
        },
      ] as any
    }
  },

  computed: {
    disabled (): boolean {
      if (this.specification.length > 3 || this.specification.some((item: any) => !item.value)) {
        return true
      }
      return false
    },

    // 过滤掉属性名和属性值为空的数据规格项目
    specificationFilter(): Array<any> {
      return this.specification.filter((item: any) => item.value && item.leaf.length)
    },
  },
  
  methods:{
    addSpec() {
      this.specification.push({
        id: createUniqueString() + '_id',
        value: '',
        leaf: [],
      })
    },

    delSepc(index: number) {
      this.specification.splice(index, 1)
    },

    addOption(index: number) {
      let str = this.addValues[index] || ''
      str = str.trim()
      if (!str) return
      const oldArr = this.specification[index].leaf
      const arr = str
                    .split(/\s+/) // 使用空格分割成数组
                    .filter(value => !oldArr.some((option: any) => option.value === value)) // 过滤掉 oldArr 已存在的 value
                    .map(value => ({ id: createUniqueString() + '_id', value })) // 把 value 转成对象，id 设置为 null
      this.specification[index].leaf = uniqueArr([...oldArr, ...arr])
      this.$set(this.addValues, index, '')
    },

    delOption(spec_index: number, option_index: number) {
      this.specification[spec_index].leaf.splice(option_index, 1)
    },
  }
});
</script>
      
<style lang='scss' scoped>
.sku-page-view {
  width: 800px;
  margin: 0 auto;
}
.remove, .remove-title {
  display: none;
  position: absolute;
  z-index: 2;
  width: 18px;
  height: 18px;
  font-size: 14px;
  line-height: 16px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  background: rgba(0,0,0,.3);
  border-radius: 50%;
}
.sku-group {
  margin-bottom: 10px;
}
.spec-title {
  position: relative;
  padding: 7px 10px;
  background-color: #f8f8f8;
  line-height: 16px;
  font-weight: 400;
  &:hover {
    .remove-title {
      display: block;
      top: -8px;
      right: -8px;
    }
  }
  .input {
    width: 200px;
  }
}
.value-title-text {
  margin-left: 30px;
}
.group-container {
  padding: 10px 10px 0;
  .input {
    width: 250px;
  }
  .sku-item {
    background-color: #f8f8f8;
    padding: 10px;
    display: inline-block;
    margin-right: 10px;
    vertical-align: middle;
    text-align: center;
    position: relative;
    border-radius: 2px;
    cursor: pointer;
    &:hover {
      .remove {
        display: block;
        top: -8px;
        right: -8px;
      }
    }
    .text {
      display: block;
      width: 74px;
      margin: 0 auto;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>