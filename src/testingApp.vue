<template>
  <div class="container">
    <h2>Инпут с выбором api</h2>
    <select name="" id="" @change="(e)=>type=e.target.value">
      <option
          :value="option"
          v-for="option in Object.keys(requestEnum)"
      >{{ option }}</option>
    </select>
    <InputWithHints
      @select="onSelect"
      :onSelectChangeValue="false"
      :type="type"
      :value="value"
      @input="(str)=>value=str"
    />
    <pre>{{inputInfo}}</pre>
  </div>

</template>

<script>
import InputWithHints from "./InputWithHints.vue";
import {requestEnum} from "./enums";

export default {
  computed:{
    requestEnum(){
      return requestEnum
    }
  },
  components: {
    InputWithHints
  },
  data(){
    return{
      inputInfo:null,
      type:requestEnum.fio,
      value:'',
    }
  },
  methods:{
    onInput(value){
      console.log(value)
    },
    onSelect(item){
      this.inputInfo=item
    },
  }
}
</script>

<style>
html{
  background: #e5e5e5;
}
.container{
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
</style>