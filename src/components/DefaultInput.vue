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
        :value="modelValue"
        @focus="onFocus"
        @blur="onBlur"
        :disabled="disabled"
        :class="{
            'selected': currentSuggestionIndex === -1
            }"
    >
    <ul class="defaultInput__suggestions"
        v-if="isOpen && currentSuggestions?.length > 0"
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
          v-html="highlightSubString(item.value, modelValue)"
      >
      </li>
    </ul>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import {maskit, maskTokens} from "../helpers/mask";
import highlightSubString from "../helpers/highlightSubString";
import {getGigdataHints} from "../api/gigdataHints";
import debounce from "../helpers/debounce";
import config from "../config";

export default defineComponent({
  name: 'DefaultInput',
  emits: ['input', 'select', 'focus', 'blur', 'update:modelValue'],
  props: {
    // для двухстороннего связывания
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    htmlInputType: {
      type: String,
      default: 'new-password',
    },
    disabled: {
      type: Boolean,
      default: false
    },
    maska: {
      type: [Boolean, String],
      required: false
    },
    count: {
      type: Number,
      default: 5,
    },
    token: {
      type: String,
      default: () => {
        try {
          return process?.env?.VUE_APP_API_TOKEN || ''
        } catch {
          return '';
        }
      },
    },
    apiURL: {
      type: String,
      default: () => {
        try {
          return process?.env?.VUE_APP_API_URL || ''
        } catch {
          return '';
        }
      },
    },
    type: {
      type: String,
      default: 'fio',
    },
    // Будет ли изменять значение событие select
    onSelectChangeValue: {
      type: Boolean,
      default: true,
    },
    enableHints: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isOpen: true,
      currentSuggestionIndex: -1,
      currentSuggestions: [],
      debouncedGetFields: null,
    }
  },
  mounted() {
    document.addEventListener('click', this.clickOutsideHolder)
    this.debouncedGetFields = debounce(this.getFields, config.debounceTime)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.clickOutsideHolder)
  },
  methods: {
    highlightSubString,
    getFields() {
      if (!this.enableHints) return
      if (this.modelValue.length < 3) return;

      getGigdataHints({
        token: this.token,
        apiURL: this.apiURL,
        type: this.type,
        count: this.count,
        query: this.modelValue,
      })
          .then((data) => {
            this.isOpen = true
            this.currentSuggestions = data
          })
          .catch((err) => {
            console.log(err)
          })
    },
    onFocus() {
      this.$emit('focus')
    },
    onBlur() {
      this.$emit('blur')
    },
    onInput(e) {
      if (this.maska)
        e.target.value = maskit(e.target.value, this.maska, true, maskTokens)
      this.debouncedGetFields()
      this.$emit('input', e.target.value, e)
      this.$emit('update:modelValue', e.target.value, e)
    },
    onTab(e) {
      e.stopPropagation();
      this.onKeyDown(e)
    },
    onEsc(e) {
      e.stopPropagation();
      this.isOpen = false;
    },
    onSelect(e) {
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
      this.isOpen = false

      if (this.onSelectChangeValue) {
        this.$emit('input', item.value, e)
        this.$emit('update:modelValue', item.value, e)
      }

      this.currentSuggestions = []
    },
    onSelectClick(e, index) {
      this.currentSuggestionIndex = index
      this.onSelect(e)
    },
    clickOutsideHolder(e) {
      e.stopPropagation();
      if (!e.composedPath().includes(this.$el)) {
        this.isOpen = false
      }
    },
    onKeyDown(e) {
      if (this.currentSuggestions.length < 1) return
      e.stopPropagation();
      e.preventDefault()
      // Обработка нажатия если пользователь в инпуте
      if (this.currentSuggestionIndex > this.currentSuggestions.length - 2) {
        this.currentSuggestionIndex = -1
      } else {
        this.currentSuggestionIndex++
      }
    },
    onKeyUp(e) {
      if (this.currentSuggestions.length < 1) return
      e.stopPropagation();
      e.preventDefault()
      // Обработка нажатия если пользователь в инпуте
      if (this.currentSuggestionIndex < 0) {
        this.currentSuggestionIndex = this.currentSuggestions.length - 1
      } else {
        this.currentSuggestionIndex--
      }
    }
  },
})
</script>

<style lang="scss" scoped>
.defaultInput {
  position: relative;
  background: white;

  input {
    width: 100%;
    outline: none;
    background: inherit;
  }

  &__suggestions {
    z-index: 1;

    &__item {
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