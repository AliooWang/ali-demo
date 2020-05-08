import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Loading,
  Form,
  Input,
  Select,
  Option,
  Button,
  FormItem,
  Table,
  TableColumn,
  Row,
  Col,
  MessageBox,
} from 'element-ui'
import './tinymce'

Vue.config.productionTip = false
Vue.use(Loading.directive as any)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Col)
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
