<template>
  <div class="container">
    <h2>Email</h2>
    <EmailWithHints/>
    <h2>ФИО</h2>
    <h3>Полное</h3>
    <FioWithHints/>
    <h3>Только имя</h3>
    <FioWithHints
      :parts="['NAME']"
      placeholder="Введите имя"
    />
    <h2>Профессии</h2>
    <ProfessionWithHints/>
    <h2>Адреса</h2>
    <AdressWithHints/>
  </div>

</template>

<script>
import EmailWithHints from "./components/EmailWithHints.vue";
import FioWithHints from "./components/FioWithHints.vue";
import ProfessionWithHints from "./components/ProfessionWithHints.vue";
import AdressWithHints from "./components/AdressWithHints.vue";

export default {
  components: {AdressWithHints, ProfessionWithHints, FioWithHints, EmailWithHints}

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