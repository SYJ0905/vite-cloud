<script setup lang="ts">
interface Props {
  registerData: {
    username: string
    age: number
    email: string
    password: string
  }
}
const props = defineProps<Props>();

const emit = defineEmits([
  'update:registerData',
  'handleRegister',
]);

const registerData = computed({
  get: () => props.registerData,
  set: (value) => {
    emit('update:registerData', value);
  },
});

function register() {
  emit('handleRegister');
}
</script>

<template>
  <div class="register q-pa-md q-mb-md rounded-lg bg-gray-100 shadow-md">
    <div class="mb-2 flex items-center">
      <span class="mr-2">用戶名:</span>
      <q-input
        v-model="registerData.username"
        filled
        class="flex-grow"
      />
    </div>
    <div class="mb-2 flex items-center">
      <span class="mr-2">年齡:</span>
      <q-input
        v-model.number="registerData.age"
        filled
      />
    </div>
    <div class="mb-2 flex items-center">
      <span class="mr-2">帳號:</span>
      <q-input
        v-model="registerData.email"
        filled
      />
    </div>
    <div class="mb-2 flex items-center">
      <span class="mr-2">密碼:</span>
      <q-input
        v-model="registerData.password"
        filled
        type="password"
      />
    </div>
    <q-btn
      color="blue"
      rounded
      class="text-white"
      @click="register"
    >
      註冊
    </q-btn>
  </div>
</template>
