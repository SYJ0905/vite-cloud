<script setup lang="ts">
interface Props {
  customMessage: string
}
const props = defineProps<Props>();

const emit = defineEmits([
  'update:customMessage',
]);

const textMessage = computed({
  get: () => props.customMessage,
  set: (value) => {
    emit('update:customMessage', value);
  },
});
</script>

<template>
  <div>
    <input
      v-model="textMessage"
      type="text"
      name="test"
    >
  </div>
</template>
