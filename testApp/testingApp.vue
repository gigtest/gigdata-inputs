<template>
  <div class="container">
    {{ type }}
    <h2>Инпут с выбором api</h2>
    <select v-model="type">
      <option
          :value="option"
          v-for="option in Object.keys(requestEnum)"
      >{{ option }}
      </option>
    </select>
    <DefaultInput
        @select="onSelect"
        :type="type"
        v-model="value"
        html-input-type="email"
        @input="(str)=>value=str"
    />
    <pre>{{ inputInfo }}</pre>
  </div>

</template>

<script>
import {DefaultInput, requestEnum} from "../src";

export default {
  computed: {
    requestEnum() {
      return requestEnum
    }
  },
  components: {
    DefaultInput
  },
  data() {
    return {
      inputInfo: null,
      type: requestEnum.party,
      value: '',
    }
  },
  methods: {
    onInput(value) {
      console.log(value)
    },
    onSelect(item) {
      this.inputInfo = item
    },
  }
}
</script>

<style>
html {
  background: #e5e5e5;
}

.container {
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}
</style>