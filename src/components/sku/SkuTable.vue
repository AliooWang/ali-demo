<template>
  <div class='sku-table-wrapper'>
    <el-table
      border
      :data="tableData"
      v-if="tableData.length > 0"
      :span-method="handleSpanMethod"
    >
      <template v-for="(label, index) in columns">
        <el-table-column
          v-if="label"
          :label="label"
          :key="index + 1">
          <template slot-scope="scope">
            {{scope.row.skus[index] && scope.row.skus[index].v}}
          </template>
        </el-table-column>
      </template>

      <el-table-column
        prop="price"
        label="价格"
        width="160">
        <template slot-scope="scope">
          <el-input controls-position="right" v-model="scope.row.price"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
      
<script lang='ts'>
import Vue from 'vue'
import { flatten } from '../../lib/sku'
import { diffArary } from '../../lib/utils'
export default Vue.extend({
  props: {
    skusData: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      tableData: [] as any,
      rowspan: [],
    }
  },
  computed: {
    columns() {
      return this.skusData.map((item: any) => item.value)
    },
    skusList(): Array<any> {
      return flatten(this.skusData, [], {}).map((item: any) => ({
        skus: item.skus,
        ids: item.skus.reduce(
          (total: any, prev: any, index: any) =>
            `${total}${prev.k_id}-${prev.v_id}${
              index === item.skus.length - 1 ? '' : '_'
            }`,
          '',
        ),
      }))
    }
  },
  watch: {
    skusList: {
      deep: true,
      immediate: true,
      handler(newSkus, oldSkus) {
        if (!newSkus.length) {
          this.tableData = []
          return
        }
        if (!oldSkus || !oldSkus.length) return this.initData(newSkus)

        // 当规格名和规格值数量未发生变化，更新 skus 即可
        if (newSkus.length === oldSkus.length && newSkus[0].skus.length === oldSkus[0].skus.length) {
          return (this.tableData = newSkus.map((item: any, index: any) => ({
            ...this.tableData[index],
            ...item,
          })))
        }

        // 当规格名的数量发生了变化
        if (newSkus[0].skus.length !== oldSkus[0].skus.length) {
          this.initData(newSkus)
          return
        }

        const diffIds = this.diffIds(newSkus, oldSkus)
        if (newSkus.length > oldSkus.length || newSkus[0].skus.length > oldSkus[0].skus.length) {
          // 当添加了规格值
          console.log('添加了规格值!!!!!!!!')
          let dataTemp = [] as any
          newSkus.forEach((item: any) => {
            const sku = this.tableData.find((_item: any) => _item.ids === item.ids)
            if (sku) {
              dataTemp.push(sku)
            } else {
              dataTemp.push({
                ...item,
                price: 100
              })
            }
          })
          this.tableData = dataTemp
        } else {
          // 当删除了规格值
          console.log('删除了规格值!!!!!!!!')
          this.tableData = this.tableData.filter((_item: any) => !diffIds.includes(_item.ids))
        }

        this.computeRowspan()
      },
    },
  },
  methods:{
    initData(skusList: any) {
      this.tableData = skusList.map((item: any) => ({
        ...item,
        // 初始化属性
        price: 100 // 为了方便展示数据，这里默认设置为 100
      }))
      this.computeRowspan()
    },
    diffIds(skusList1:any, skusList2:any) {
      // 两个数据的 ids 进行相差
      skusList1 = skusList1.map((item:any) => item.ids)
      skusList2 = skusList2.map((item:any) => item.ids)
      return diffArary(skusList1, skusList2)
    },

    computeRowspan () {
      console.log('computeRowspan')
      this.rowspan = []
      const rowspan = (index: number) => {
        let span = [] as any
        let dot = 0

        this.tableData.map((item:any, idx:any) => {
          if (idx === 0) {
            span.push(1)
          } else {
            if (item.skus[index].v === this.tableData[idx - 1].skus[index].v) {
              span[dot] += 1
              span.push(0)
            } else {
              dot = idx
              span.push(1)
            }
          }
        })

        this.rowspan.push(span)
      }

      this.skusData.map((item:any, index:any) => {
        rowspan(index)
      })
    },

    handleSpanMethod ({ row, column, rowIndex, columnIndex }: any) {
      for (let i = 0; i < this.skusData.length; i++) {
        if (columnIndex === i) {
          if (this.rowspan[i] && this.rowspan[i][rowIndex]) {
            return {
              rowspan: this.rowspan[i][rowIndex],
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
    }
  }
});
</script>
      
<style lang='scss' scoped>
.sku-table-wrapper {
  width: 800px;
}
</style>
