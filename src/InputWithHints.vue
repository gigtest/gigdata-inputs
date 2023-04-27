<template>
  <DefaultInput
      :suggestions="suggestions"
      :inputModel="inputModel"
      :placeholder="placeholder"
      @input="onInput"
      @select="onSelect"
  />
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";
import DefaultInput from "./components/DefaultInput.vue";
import debounce from "./helpers/debounce";
import config from "./config";

export const types = [
  "fio",
  "passport",
  "educations",
  "address",
  "profession",
  "bank",
  "email",
  "party",
]

export default defineComponent({
  name: 'InputWithHints',
  components: {DefaultInput},
  emits:['input', 'select'],
  props: {
    // кол-во выводимых подсказок
    count: {
      type: Number,
      default: 5,
    },
    token: {
      type: String,
      default: process.env?.VUE_APP_API_TOKEN || '',
    },
    apiURL: {
      type: String,
      default: process.env?.VUE_APP_API_URL || '',
    },
    placeholder: {
      type: String,
      default: 'Введите адрес',
    },
    // для двухстороннего связывания
    value: {
      type: String,
      default: '',
    },
    // тип - конеченая точка api
    type:{
      type: String,
      default: 'fio',
      validator(value) {
        return types.includes(value)
      }
    },
    // дополнительные данные для запроса
    params:{
      type: Object,
      default: ()=>({})
    }
  },
  data() {
    return {
      suggestions: [],
      inputModel: this.value,
      debouncedGetFields:null,
    };
  },
  watch:{
    value(){
      this.inputModel = this.value
    }
  },
  mounted() {
    this.debouncedGetFields = debounce(this.getFields, config.debounceTime)
  },
  methods:{
    getFields(){
      if (this.inputModel.length < 3) return;

      let data = {
        query: this.inputModel,
        count: this.count,
      }
      data = Object.assign(data, this.params);

      axios.post(this.apiURL+"/suggest/" + this.type,data,{
        headers:{
          'Authorization': 'Token ' + this.token,
        }
      })
          .then((data)=>{
            this.suggestions = data.data.suggestions
          })
          .catch((err)=>{
            console.log(err)
          })
    },
    onInput(value){
      this.suggestions = []
      this.inputModel=value
      this.debouncedGetFields()
      this.$emit('input', value)
    },
    onSelect(item){
      this.inputModel = item.value
      this.suggestions = []
      this.$el.firstElementChild.focus()
      this.$emit('select', item)
    }
  },

})
</script>