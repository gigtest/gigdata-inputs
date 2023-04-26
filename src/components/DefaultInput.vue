<template>
  <div class="defaultInput"
       @keydown.tab="onTab"
       @keydown.down="onKeyDown"
       @keydown.up="onKeyUp"
  >
    <input
        :type="type"
        @input="onInput"
        :placeholder="placeholder"
        :value="inputModel"

    >
    <ul class="defaultInput__suggestions"
        v-if="suggestions.length > 0"
    >
      <li
          class="defaultInput__suggestions__item"
          v-for="(item,index) in suggestions"
          :key="index"
          :tabindex="index+2"
          @keydown.enter="onSelect(item.value)"
          @click="onSelect(item.value)"
      >
        <span>
        {{item.value.slice(0, item.value.toLowerCase().indexOf(inputModel.toLowerCase()))}}
        </span>
        <span class="defaultInput__suggestions__item__highlight">
          {{
            item.value.slice(
            item.value.toLowerCase().indexOf(inputModel.toLowerCase()),
            item.value.toLowerCase().indexOf(inputModel.toLowerCase())+inputModel.length)
          }}
        </span>
        <span>
          {{item.value.slice(item.value.toLowerCase().indexOf(inputModel.toLowerCase())+inputModel.length)}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";

export default defineComponent({
  name: 'DefaultInput',
  emits: ['input', 'select'],
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
  methods:{
    onInput(e){
      this.$emit('input', e.target.value)
    },
    onTab(e){
      this.onKeyDown(e)
    },
    onSelect(value){
      this.$emit('select', value)
      this.$el.firstElementChild.focus()
    },
    onKeyDown(e){
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