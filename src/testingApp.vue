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
      @select="(item)=>inputInfo=item"
      :type="type"
      @focus="onFocus"
      @blur="onBlur"
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
      type:requestEnum.fio
    }
  },
  methods:{
    onInput(value){
      console.log(value)
    },
    onFocus(){
      console.log('focus')
    },
    onBlur(){
      console.log('blur')
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