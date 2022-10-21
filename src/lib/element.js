import Vue from 'vue'

import {
  Scrollbar,
  Menu,
  MenuItem,
  Form,
  FormItem,
  Input,
  Checkbox,

  Breadcrumb,
  BreadcrumbItem,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Submenu,

  Select,
  Switch,
  Option,
  DatePicker,
  TimePicker,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Button,
  Col,
  Alert,
  Table,
  TableColumn,
  Pagination,
  Tooltip,
  Message,
  Tag,
  Tree
} from 'element-ui'

const element = {
  install: (Vue) => {
    Vue.use(Breadcrumb)
    Vue.use(BreadcrumbItem)
    Vue.use(Dropdown)
    Vue.use(DropdownMenu)
    Vue.use(DropdownItem)
    Vue.use(Scrollbar)
    Vue.use(Menu)
    Vue.use(MenuItem)
    Vue.use(Submenu)
    Vue.use(Form)
    Vue.use(FormItem)
    Vue.use(Input)
    Vue.use(Switch)
    Vue.use(DatePicker)
    Vue.use(TimePicker)
    Vue.use(Radio)
    Vue.use(RadioGroup)
    Vue.use(Col)
    Vue.use(Alert)
    Vue.use(Button)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(Pagination)
    Vue.use(Table)
    Vue.use(TableColumn)
    Vue.use(Checkbox)
    Vue.use(CheckboxGroup)
    Vue.use(Tooltip)
    Vue.use(Tag)
    Vue.use(Tree)
  }
}

Vue.prototype.$message = Message

export default element
