<script setup lang="ts">
import EmitProps from '@/template/components/EmitProps.vue';
import Counter from '@/template/components/Counter.vue';

const customMessage = ref('測試');
</script>

<template>
  <EmitProps
    v-model:customMessage="customMessage"
  />
  <span>{{ customMessage }}</span>

  <Counter />
</template>

<style scoped>
</style>
