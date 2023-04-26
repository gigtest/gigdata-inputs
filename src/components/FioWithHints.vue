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
import {defineComponent} from "vue";
import debounce from "../helpers/debounce";

export default defineComponent({
  name: 'FioWithHints',
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
      default: 'Введите ФИО',
    },
    // для двухстороннего связывания
    value:{
      type: String,
      default: '',
    },
    // Части подсказок
    // Возможные значения:
    // NAME, SURNAME, PATRONYMIC
    // Пока не работает если указывать более 1 значения
    parts: {
      type: Array,
      default: () => null
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
      console.log(this.inputModel);
      if (this.inputModel.length < 3) return;

      axios.post(this.apiURL+"/suggest/fio",{
        query: this.inputModel,
        count: this.count,
        parts: this.parts?.length > 0? this.parts : null
      },{
        headers:{
          'Authorization': 'Token ' + this.token,
        },
      })
      .then((data)=>{
        this.suggestions = data.data.suggestions
      })
      .catch((err)=>{
        console.log(err)
      })
    },
    onInput(value){
      this.suggestions = [];
      this.inputModel=value;
      this.debouncedGetFields.call();
      this.$emit('input', value);
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