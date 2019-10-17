/**
 * Created by sunwd on 2018/9/28.
 */
import CancerDatePickerRange from '@/components/CancerDatePickerRange'
import CancerDatePicker from '@/components/CancerDatePicker'
import CancerWidget from '@/components/CancerWidget'
import SearchCom from '@/components/searchCom'
import TableCom from '@/components/tableCom'

const components = [
  CancerDatePickerRange,
  CancerDatePicker,
  CancerWidget,
  SearchCom,
  TableCom
]

export default {
  install (Vue) {
    components.map(component => {
      Vue.component(component.name, component)
    })
  }
}
