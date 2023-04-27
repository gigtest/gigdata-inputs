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
import config from "../config";

export default defineComponent({
  name: 'PartyWithHints',
  components: {DefaultInput},
  emits:['input', 'select'],
  props: {
    // кол-во выводимых подсказок
    count: {
      type: Number,
      default: 5,
    },
    // пока не работает
    // пример
    /*"locationBoost": [
      {
        "kladr_id": "77"
      }
    ]*/
    locationBoost:{
      type: Array,
      default: '',
    },
    // пока не работает
    // пример
    /*"locations": [
      {
        "kladr_id": "77"
      }
    ]*/
    restrict_value:{
      type: Boolean,
      default: false,
    },
    locations:{
      type: Array,
      default: '',
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
      if (this.locations.length > 0) data.locations = this.locations
      if (this.locationBoost.length > 0) data.location_boost = this.locationBoost
      if (this.restrict_value) data.restrict_value = this.restrict_value

      axios.post(this.apiURL+"/suggest/party",data,{
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