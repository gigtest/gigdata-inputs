<template>
  <div>
    <h1>Тестирование</h1>
    <h2>Email</h2>
    <EmailWithHints/>
    <h2>ФИО</h2>
    <FioWithHints/>
  </div>
</template>

<script>
import EmailWithHints from "./components/EmailWithHints.vue";
import FioWithHints from "./components/FioWithHints.vue";

export default {
  components: {FioWithHints, EmailWithHints}

}
</script>

<style lang="scss" scoped>

</style>