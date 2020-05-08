<template>
  <div class="page-view">
    <div class="form-wrapper">
      <div>商品规格：</div>
      <el-form 
        :model="formData" 
        ref="dynamicValidateForm" 
        label-width="10px" 
        class="demo-dynamic"
      >
        <el-form-item
          v-for="(domain, index) in formData"
          :key="domain.key"
          :prop="domain.name"
          class="domain-view"
        >
          <el-input class="input-style" v-model="domain.name"></el-input>
          <el-button type="primary" @click.prevent="removeDomain(domain)">删除</el-button>
          <div class="child-domain-wrapper">
            <div class="item-font-div" />
            <el-form-item 
              v-for="(itemC, indexC) in domain.items"
              :key="indexC"
              :prop="'items.' + indexC"
            >
              <el-input class="input-style" v-model="itemC.value"></el-input>
              <i class="el-icon-circle-close icon-style" @click="removeChildDomain(index, indexC)"></i>
            </el-form-item>
            <el-button type="text" @click.prevent="addChildDomain(domain)">添加规格值</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button v-if="formData.length < 3" @click="addDomain">新增规格</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格部分 -->
    <div class="content-wrapper">
<!-- 111111111111111111111111111111111111111111111111111111111111111111 -->
      <!-- <el-table
        :data="tableData1"
        :span-method="objectSpanMethod"
      >
        <el-table-column
          :prop="item.name"
          :label="item.name"
          width="200"
          :key="k" 
          v-for="(item,k) in tableHeader"
        >
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格"
        >
          <template slot-scope="scope">
            <el-input class="input-style" v-model="scope.row.price" @blur="onBlurPrice(scopr.row)"></el-input>
          </template>
        </el-table-column>
      </el-table> -->

<!-- 22222222222222222222222222222222222222222222222222222222222222222 -->
      <!-- <table>
        <thead>
          <th 
            v-for="(item,index) in tableHeader" 
            :key="index"
          >{{ item.name }}</th>
          <th>
            价格
          </th>
        </thead>
        <tbody v-if="formData.length > 0">
          <tr 
            v-for="(item,index) in formData[0].items" 
            :key="index"
          >
            <td>{{item.value}}</td>
            <td v-if="formData[1]">
              <div class="border-bottom" v-for="(itemS, indexS) in formData[1].items" :key="indexS">
                {{ itemS.value }}
              </div>
            </td>
            <td v-if="formData[2]">
              <div class="border-bottom" v-for="(itemS, indexS) in formData[1].items" :key="indexS">
                <div class="border-bottom" v-for="(itemT, indexT) in formData[2].items" :key="indexT">
                  {{ itemT.value }}
                </div>
              </div>
            </td>
            <td v-if="formData[2]">
              <div class="border-bottom" v-for="(itemS, indexS) in formData[1].items" :key="indexS">
                <div class="border-bottom" v-for="(itemT, indexT) in formData[2].items" :key="indexT">
                  <input class="input-style" v-model="indexT.price">
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table> -->

<!-- 333333333333333333333333333333333333333333333333333333333333333333333 -->
      <!-- <div class="table-header-view">
        <div v-for="(item, index) in tableHeader"
        :key="index"
        class="header-item">
          {{item.name}}
        </div>
        <div>c</div>
      </div>
      <table class="table-content">
        <tr 
          v-for="(item, index) in tableData" 
          :key="index"
          class="border-bottom"
        >
          <td>{{item.name}}</td>
          <td 
            v-for="(itemS, indexS) in item.children" 
            :key="indexS"
            class="children-flex">
            {{itemS.name}}
          </td>
          <td 
            v-for="(itemS, indexS) in item.children" 
            :key="indexS"
            class="children-flex">
            <div 
              v-for="(itemT, indexT) in itemS.children" 
              :key="indexT"
              class="border-bottom">
              {{itemT.name}}
            </div>
          </td>
        </tr>
      </table> -->
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Vue from 'vue'
import { MessageBox, Message } from 'element-ui'
export default Vue.extend({
  name: 'Home',
  components: {
    // HelloWorld
  },
  data() {
    return {
      formData: [{
        key: 1,
        name: 'a',
        items: [{
          value: 'a1',
          price: '100',
        }, {
          value: 'a2',
          price: '100',
        }]
      },{
        key: 2,
        name: 'b',
        items: [{
          value: 'b1',
          price: '100',
        }, {
          value: 'b2',
          price: '100',
        }]
      }],

      tableData: [{
        name: 'a1',
        children: [{
          name: 'b1',
          children: [{
            name: 'c1', 
          },{
            name: 'c2', 
          }]
        }, {
          name: 'b2',
          children: [{
            name: 'c1', 
          },{
            name: 'c2', 
          }]
        }]
      }, {
        name: 'a2',
        children: [{
          name: 'b1',
          children: [{
            name: 'c1', 
          }]
        }]
      }],
    }
  },
  computed: {
    tableHeader(): any {
      if (this.formData.length === 0) {
        return []
      }
      let tempHeader = [] as any;
      for(let i = 0; i < this.formData.length; i++) {
        tempHeader = this.formData.map((item: any) => {
          return {
            name: item.name,
          }
        })
      }
      return tempHeader
    },
    // tableData1(): any {
    //   let nd = [] as any
    //   this.formData.forEach(f => {
    //     const newNd = [] as any
    //     f.items.forEach(i => {
    //       if (nd.length === 0) {
    //         newNd.push({ [f.name]: i.value, price: '' })
    //       } else {
    //         nd.forEach((n: any) => {
    //           newNd.push({ ...n, [f.name]: i.value })
    //         })
    //       }
    //     })
    //     nd = newNd
    //   })
    //   return nd
    // },
  },
  methods: {
    // 移除大规格
    removeDomain(item: any) {
      MessageBox.confirm('确定要删除该规格？')
        .then(() => {
          var index = this.formData.indexOf(item)
          if (index !== -1) {
            this.formData.splice(index, 1)
          }
        }).catch(() => {

        })
    },
    // 移除子规格数值
    removeChildDomain (index: number, indexC: number) {
      this.formData[index].items.splice(indexC, 1)
    },
    // 新增子规格数值
    addChildDomain(item: any) {
      let index = this.formData.indexOf(item)
      if (index !== -1) {
        this.formData[index].items.push({
          value: '',
          price: '100',
        })
      }
    },
    // 新增大规格
    addDomain() {
      if (this.formData.length >= 3) {
        Message.warning('最多添加3个规格')
        return
      }
      this.formData.push({
        name: '',
        key: this.formData.length + 1,
        items: [],
      });
    },
  },
})
</script>

<style lang="scss" scoped>
.page-view {
  height: 100%;
}
.form-wrapper {
  display: flex;
  justify-content: flex-start;
}
.children-flex {
  display: flex;
  flex-direction: column;
}

.item-font-div {
  width: 30px;
  height: 20px;
  margin-left: 33px;
  margin-right: 10px;
  border-left: 1px solid #333;
  border-bottom: 1px solid #333;
}
.child-domain-wrapper {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 10px;
}
.input-style {
  width: 160px;
  margin-right: 10px;
}
.icon-style {
  // width: 30px;
  background: #fff;
  position: relative;
  top: -15px;
  left: -20px
}
table {
  tr, td {
    border-bottom: 1px solid #999;
    text-align: center;
    width: 200px;
  }
  td {
    line-height: 30px;
  }
  .border-bottom {
    border-bottom: 1px solid #999;
    &:last-child {
      border: none;
    }
  }
}
.table-header-view {
  display: flex;
  justify-content: flex-start;
}
.header-item {
  width: 200px;
}
</style>
