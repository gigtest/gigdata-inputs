<template>
  <div class="container">
    <h2>Email</h2>
    <EmailWithHints/>
    <h2>ФИО</h2>
    <h3>Полное</h3>
    <FioWithHints/>
    <h3>Только имя</h3>
    <FioWithHints
      placeholder="Введите имя"
    />
    <h3>Имя + Фамилия</h3>
    <FioWithHints
        placeholder="Введите имя и фамилию"
    />
    <h2>Профессии</h2>
    <ProfessionsWithHints/>
  </div>

</template>

<script>
import EmailWithHints from "./components/EmailWithHints.vue";
import FioWithHints from "./components/FioWithHints.vue";
import ProfessionsWithHints from "./components/ProfessionsWithHints.vue";

export default {
  components: {ProfessionsWithHints, FioWithHints, EmailWithHints}

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