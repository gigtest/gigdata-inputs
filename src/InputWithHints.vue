<template>
  <DefaultInput
      :suggestions="suggestions"
      :inputModel="inputModel"
      :placeholder="placeholder"
      :disabled="disabled"
      :htmlInputType="htmlInputType"
      @input="onInput"
      @select="onSelect"
      @focus="onFocus"
      @blur="onBlur"
  />
</template>

<script>
import axios from "axios";
import {defineComponent} from "vue";
import DefaultInput from "./components/DefaultInput.vue";
import debounce from "./helpers/debounce";
import config from "./config";
import {requestEnum} from "./enums";

export default defineComponent({
  name: 'InputWithHints',
  components: {DefaultInput},
  emits:['input', 'select', 'focus', 'blur'],
  props: {
    // кол-во выводимых подсказок
    count: {
      type: Number,
      default: 5,
    },
    token: {
      type: String,
      default: ()=>{
        try {
          return process?.env?.VUE_APP_API_TOKEN || ''
        } catch {
          return '';
        }
      },
    },
    apiURL: {
      type: String,
      default: ()=>{
        try {
          return process?.env?.VUE_APP_API_URL || ''
        } catch {
          return '';
        }
      },
    },
    placeholder: {
      type: String,
      default: '',
    },
    // для двухстороннего связывания
    value: {
      type: String,
      default: '',
    },
    // тип - конечная точка api
    type:{
      type: String,
      default: 'fio',
    },
    // дополнительные данные для запроса
    params:{
      type: Object,
      default: ()=>({})
    },
    // Будет ли изменять значение событие select
    onSelectChangeValue: {
      type:Boolean,
      default: true,
    },
    htmlInputType: {
      type: String,
      default: 'text',
    },
    disabled:{
      type:Boolean,
      default:false
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
    onFocus(){
      this.$emit('focus')
    },
    onBlur(){
      this.$emit('blur')
    },
    getFields(){
      if (this.inputModel.length < 3) return;

      let data = {
        query: this.inputModel,
        count: this.count,
      }
      data = Object.assign(data, this.params);

      axios.post(this.apiURL + "/suggest/" + this.type, data, {
        headers: {
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
      if (this.onSelectChangeValue)
        this.inputModel = item.value
      this.suggestions = []
      this.$el.firstElementChild.focus()
      this.$emit('select', item)
    }
  },
})
</script>