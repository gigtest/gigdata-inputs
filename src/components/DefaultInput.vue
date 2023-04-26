<template>
  <div class="defaultInput"
       @keydown.tab="onTab"
       @keydown.down="onKeyDown"
       @keydown.up="onKeyUp"
  >
    <input
        type="email"
        @input="onInput"
        :value="inputModel"
        tabindex="1"

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
        {{ item.value }}
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
    }
  },
  methods:{
    onInput(e){
      this.$emit('input', e.target.value)
    },
    onTab(e){
      if (e.target === this.$el.lastElementChild.lastElementChild){
        e.preventDefault()
        this.$el.firstElementChild.focus()
      }
    },
    onSelect(value){
      this.$emit('select', value)
      this.$el.firstElementChild.focus()
    },
    onKeyDown(e){
      e.preventDefault()

      if (e.target.nextElementSibling?.firstElementChild){
        e.target.nextElementSibling.firstElementChild.focus()
        return
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
      e.preventDefault()
      if (e.target === this.$el.firstElementChild){
        this.$el.lastElementChild.lastElementChild.focus()
        return
      }
      if (e.target === this.$el.lastElementChild.firstElementChild){
        this.$el.firstElementChild.focus()
        return
      }
      if (e.target.previousElementSibling?.lastElementChild){
        e.target.previousElementSibling.lastElementChild.focus()
        return
      }
      if (e.target.previousElementSibling){
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
    padding: 10px;
    border: none;
    font-size: 24px;
    outline: none;
    background: inherit;
  }
  &__suggestions {
    padding: 0 10px;
    width: 100%;
    z-index: 1;
    background: inherit;
    position: absolute;
    top: 100%;
    list-style: none;
  }
}
</style>