<template>
  <DefaultInput
      :suggestions="suggestions"
      :inputModel="inputModel"
      :placeholder="placeholder"
      type="email"
      @input="onInput"
      @select="onSelect"
  />
</template>

<script>
import axios from "axios";
import DefaultInput from "./DefaultInput";
import {defineComponent} from "vue";
import debounce from "../helpers/debounce";

export default defineComponent({
  name: 'EmailWithHints',
  components: {DefaultInput},
  emits:['input', 'select'],
  props:{
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
    placeholder:{
      type: String,
      default: 'Введите адрес электронной почты',
    },
    // для двухстороннего связывания
    value:{
      type: String,
      default: '',
    }
  },
  data() {
    return {
      suggestions: [],
      inputModel: this.value,
      debouncedGetFields: null,
    };
  },
  watch:{
    value(){
      this.inputModel = this.value
    }
  },
  mounted() {
    this.debouncedGetFields = debounce(this.getFields, 500)
  },
  methods:{
    getFields(){
      if (this.inputModel.length < 3) return;
      if (this.inputModel.indexOf('@') === -1) return;

      axios.post(this.apiURL+"/suggest/email",{
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