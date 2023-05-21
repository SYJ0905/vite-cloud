<script setup lang="ts">
import EmitProps from '@/template/components/EmitProps.vue';

const customMessage = ref('測試');
</script>

<template>
  <EmitProps
    v-model:customMessage="customMessage"
  />
  <span>{{ customMessage }}</span>
</template>

<style scoped>
</style>
