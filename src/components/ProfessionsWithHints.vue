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
import DefaultInput from "./DefaultInput";
let debouncedGetFields = null;
import {defineComponent} from "vue";
import debounce from "../helpers/debounce";

export default defineComponent({
  name: 'ProfessionsWithHints',
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
      default: 'Введите профессию',
    },
    // для двухстороннего связывания
    value: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      suggestions: [],
      inputModel: this.value,
    };
  },
  watch:{
    value(){
      this.inputModel = this.value
    }
  },
  mounted() {
    debouncedGetFields = debounce(()=>this.getFields(), 500)
  },
  methods:{
    getFields(){
      if (this.inputModel.length < 3) return;
      axios.post(this.apiURL+"/suggest/professions",{
        query: this.inputModel,
        count: this.count,
      },{
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
      debouncedGetFields()
      this.$emit('input', value)
    },
    onSelect(value){
      this.inputModel = value
      this.suggestions = []
      this.$el.firstElementChild.focus()
      this.$emit('input', value)
    }
  },

})
</script>