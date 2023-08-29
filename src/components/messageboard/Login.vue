<script setup lang="ts">
interface Props {
  loginData: {
    email: string
    password: string
  }
}
const props = defineProps<Props>();

const emit = defineEmits([
  'update:loginData',
  'handleLogin',
]);

const loginData = computed({
  get: () => props.loginData,
  set: (value) => {
    emit('update:loginData', value);
  },
});

function login() {
  emit('handleLogin');
}
</script>

<template>
  <div class="login q-pa-md q-mb-md rounded-lg bg-gray-100 shadow-md">
    <div class="mb-2 flex items-center">
      <span class="mr-2">帳號:</span>
      <q-input
        v-model="loginData.email"
        filled
        class="flex-grow"
      />
    </div>
    <div class="mb-2 flex items-center">
      <span class="mr-2">密碼:</span>
      <q-input
        v-model="loginData.password"
        filled
        type="password"
      />
    </div>
    <q-btn
      color="blue"
      rounded
      class="text-white"
      @click="login"
    >
      登入
    </q-btn>
  </div>
</template>
