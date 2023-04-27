<template>
  <div class="container">
    <h2>Email</h2>
    <EmailWithHints
    @select="(item)=>emailInfo=item"
    />
    <pre v-if="emailInfo">{{emailInfo}}</pre>
    <h2>ФИО</h2>
    <h3>Полное</h3>
    <FioWithHints
        @select="(item)=>fio1Info=item"
    />
    <pre v-if="fio1Info">{{fio1Info}}</pre>
    <h3>Только имя</h3>
    <FioWithHints
        @select="(item)=>fio2Info=item"
        :parts="['NAME']"
        placeholder="Введите имя"
    />
    <pre v-if="fio2Info">{{fio2Info}}</pre>
    <h2>Профессии</h2>
    <ProfessionWithHints
      @select="(item)=>professionInfo=item"
    />
    <pre v-if="professionInfo">{{professionInfo}}</pre>
    <h2>Адреса</h2>
    <AddressWithHints
      @select="(item)=>addressInfo=item"
    />
    <pre v-if="addressInfo">{{addressInfo}}</pre>
    <h2>Организация</h2>
    <PartyWithHints/>
    <pre v-if="partyInfo">
      {{partyInfo}}
    </pre>
    <h2>Банк</h2>
    <BankWithHints
        @select="(item)=>bankInfo=item"
    />
    <pre
      v-if="bankInfo"
    >
      {{bankInfo}}
    </pre>
  </div>

</template>

<script>
import EmailWithHints from "./components/EmailWithHints.vue";
import FioWithHints from "./components/FioWithHints.vue";
import ProfessionWithHints from "./components/ProfessionWithHints.vue";
import AddressWithHints from "./components/AddressWithHints.vue";
import PartyWithHints from "./components/PartyWithHints.vue";
import BankWithHints from "./components/BankWithHints.vue";

export default {
  components: {BankWithHints, PartyWithHints, AddressWithHints, ProfessionWithHints, FioWithHints, EmailWithHints},
  data(){
    return{
      emailInfo: null,
      fio1Info: null,
      fio2Info: null,
      professionInfo: null,
      addressInfo: null,
      partyInfo:null,
      bankInfo:null
    }
  }
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