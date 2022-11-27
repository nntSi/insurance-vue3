<template>
  <h1>HomeView</h1>
  <p>{{state.loginState}}</p>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const store = useStore()

const state = reactive({loginState: store.getters['auth/myAccount']});

</script>