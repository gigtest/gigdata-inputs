<template>
  <div>
    <EmailWithHints/>

    ФИО
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