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
import debounce from "gigdata-inputs/src/helpers/debounce";
let debouncedGetFields = null;
import {defineComponent} from "vue";

export default defineComponent({
  name: 'EmailWithHints',
  components: {DefaultInput},
  props:{
    count: {
      type: Number,
      default: 5,
    },
    token: {
      type: String,
      default: '',
    },
    apiURL: {
      type: String,
      default: '',
    },
    placeholder:{
      type: String,
      default: 'Введите адрес электронной почты',
    }
  },
  data() {
    return {
      suggestions: [],
      inputModel: '',
    };
  },
  mounted() {
    debouncedGetFields = debounce(()=>this.getFields(), 500)
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
      debouncedGetFields()
    },
    onSelect(value){
      this.inputModel = value
      this.suggestions = []
      this.$el.firstElementChild.focus()
    }
  },

})
</script>