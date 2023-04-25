<template>
  <DefaultInput
      :suggestions="suggestions"
      :inputModel="inputModel"
      @input="onInput"
      @select="onSelect"
  />
</template>

<script>
import axios from "axios";
import DefaultInput from "./DefaultInput";
import debounce from "./helpers/debounce";
let debouncedGetFields = null;

export default {
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

}
</script>