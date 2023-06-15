<template>
  <div class="defaultInput"
       @keydown.tab="onTab"
       @keydown.down="onKeyDown"
       @keydown.up="onKeyUp"
       @keydown.esc="onEsc"
       @click="()=> isOpen = true"
  >
    <input
        :type="type"
        @input="onInput"
        :placeholder="placeholder"
        :value="inputModel"
        @focus="onFocus"
        @blur="onBlur"
    >
    <ul class="defaultInput__suggestions"
        v-if="isOpen && suggestions.length > 0"
    >
      <li
          class="defaultInput__suggestions__item"
          v-for="(item,index) in suggestions"
          :key="index"
          :tabindex="index+2"
          @keydown.enter="onSelect(item,$event)"
          @click="onSelect(item, $event)"
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
    type: {
      type: String,
      default: 'text',
    }
  },
  data(){
    return {
      isOpen: false,
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
     this.isOpen = this.suggestions.length > 0
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
    onSelect(item,e){
      e?.stopPropagation();
      this.$emit('select', item)
      this.$el.firstElementChild.focus()
    },
    clickOutsideHolder(e){
      e.stopPropagation();
      if (!e.composedPath().includes(this.$el)){
        this.isOpen=false
      }
    },
    onKeyDown(e){
      e.stopPropagation();
      if (this.suggestions.length < 1) return
      e.preventDefault()
      if (e.target.tagName === "INPUT"){
        e.target.nextElementSibling.firstElementChild.focus()
        return;
      }
      if (e.target.nextElementSibling){
        e.target.nextElementSibling.focus()
        return
      }
      if (e.target === this.$el.lastElementChild.lastElementChild){
        this.$el.firstElementChild.focus()
      }
    },
    onKeyUp(e){
      e.stopPropagation();
      if (this.suggestions.length < 1) return
      e.preventDefault()
      // Обработка нажатия если пользователь в инпуте
      if (e.target.tagName === "INPUT"){
        e.target.nextElementSibling.lastElementChild.focus()
        return;
      }
      // обработка нажатия если пользователь в первом LI
      if (e.target === this.$el.lastElementChild.firstElementChild){
        this.$el.firstElementChild.focus()
        return
      }
      // Обработка нажати если пользователь в LI
      if (e.target.tagName === "LI"){
        e.target.previousElementSibling.focus()
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
  }
}
</style>