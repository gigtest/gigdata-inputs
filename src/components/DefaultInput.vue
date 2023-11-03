<template>
  <div class="defaultInput"
       @keydown.down="onKeyDown"
       @keydown.up="onKeyUp"
       @keydown.esc="onEsc"
       @keydown.tab="onTab"
       @keydown.enter="onSelect($event)"
       @keydown.space="onSelect($event)"
       @click="()=> isOpen = true"
  >
    <input
        :type="htmlInputType"
        @input="onInput"
        :placeholder="placeholder"
        :value="inputModel"
        @focus="onFocus"
        @blur="onBlur"
        :disabled="disabled"
        :class="{
            'selected': currentSuggestionIndex === -1
            }"
    >
    <ul class="defaultInput__suggestions"
        v-if="isOpen && currentSuggestions.length > 0"
    >
      <li
          v-for="(item,index) in currentSuggestions"
          :class="{
            'defaultInput__suggestions__item':true,
            'selected': currentSuggestionIndex === index
            }"
          :key="index"
          :tabindex="index+2"
          @click="(e)=>onSelectClick(e, index)"
      >
        <span>
          {{getFirstSamePart(item)}}
        </span>
        <span class="defaultInput__suggestions__item__highlight">
          {{getHighlightPart(item)}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {maskit, tokens} from "@/helpers/mask";

export default defineComponent({
  name: 'DefaultInput',
  emits: ['input', 'select','focus', 'blur'],
  props:{
    suggestions: {
      type: Array,
      default: () => []
    },
    inputModel: {
      type: String,
      default: ''
    },
    placeholder:{
      type: String,
      default: '',
    },
    htmlInputType: {
      type: String,
      default: 'new-password',
    },
    disabled:{
      type:Boolean,
      default:false
    },
    maska:{
      type:[Boolean, String],
      required:true
    },
  },
  data(){
    return {
      isOpen: false,
      currentSuggestionIndex: -1,
      currentSuggestions: [],
    }
  },
  mounted() {
    document.addEventListener('click',this.clickOutsideHolder)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.clickOutsideHolder)
  },
  watch:{
   suggestions(){
     this.currentSuggestions = this.suggestions
     this.isOpen = this.currentSuggestions.length > 0
   }
  },
  methods:{
    onFocus(){
      this.$emit('focus')
    },
    onBlur(){
      this.$emit('blur')
    },
    onInput(e){
      if (this.maska)
        e.target.value = maskit(e.target.value, this.maska, true, tokens)
      this.$emit('input', e.target.value)
    },
    getFirstSamePart(item){
      if (item.value.toLowerCase().indexOf(this.inputModel.toLowerCase()) < 0)
        return ''

      return item.value.slice(
          0,
          item.value.toLowerCase().indexOf(this.inputModel.toLowerCase())+this.inputModel.length
      )
    },
    getHighlightPart(item){
      if (item.value.toLowerCase().indexOf(this.inputModel.toLowerCase()) < 0)
        return item.value

      return item.value.slice(item.value.toLowerCase().indexOf(this.inputModel.toLowerCase())+this.inputModel.length)
    },
    onTab(e){
      e.stopPropagation();
      this.onKeyDown(e)
    },
    onEsc(e){
      e.stopPropagation();
      this.isOpen=false;
    },
    onSelect(e){
      if (this.currentSuggestionIndex < 0) {
        this.currentSuggestions = []
      }
      if (this.currentSuggestions.length < 1) return
      e?.stopPropagation();
      e?.preventDefault();
      let item = this.currentSuggestions[this.currentSuggestionIndex]
      this.currentSuggestionIndex = -1
      this.$emit('select', item, e)
      this.$el.firstElementChild.focus()
    },
    onSelectClick(e,index){
      e.stopPropagation();
      let item = this.currentSuggestions[index]
      this.currentSuggestionIndex = -1
      this.$emit('select', item, e)
      this.$el.firstElementChild.focus()
    },
    clickOutsideHolder(e){
      e.stopPropagation();
      if (!e.composedPath().includes(this.$el)){
        this.isOpen=false
      }
    },
    onKeyDown(e){
      if (this.currentSuggestions.length < 1) return
      e.stopPropagation();
      e.preventDefault()
      // Обработка нажатия если пользователь в инпуте
      if (this.currentSuggestionIndex > this.currentSuggestions.length-2){
        this.currentSuggestionIndex = -1
      } else{
        this.currentSuggestionIndex++
      }
    },
    onKeyUp(e){
      if (this.currentSuggestions.length < 1) return
      e.stopPropagation();
      e.preventDefault()
      // Обработка нажатия если пользователь в инпуте
      if (this.currentSuggestionIndex < 0){
        this.currentSuggestionIndex = this.currentSuggestions.length-1
      } else {
        this.currentSuggestionIndex--
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.defaultInput{
  position: relative;
  background: white;
  input{
    width: 100%;
    outline: none;
    background: inherit;
  }
  &__suggestions {
    z-index: 1;
    &__item{
      cursor: pointer;
    }
    width: 100%;
    background: inherit;
    position: absolute;
    top: 100%;
    list-style: none;
    .selected {
      background: rgba(128, 128, 128, 0.19);
    }
  }
}
</style>