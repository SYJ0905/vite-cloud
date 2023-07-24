<script setup lang="ts">
// 必須補上，除非 jest config 有找到是哪個設定導致，不然沒補會報錯
import { ref } from 'vue';

const count = ref<number>(0);

function increment() {
  count.value += 1;
}
</script>

<template>
  <div>
    <h1 data-testId="currentCounter">
      當前點擊次數{{ count }}
    </h1>
    <button
      data-testId="addCounter"
      @click.prevent="increment"
    >
      點我加1
    </button>
  </div>
</template>
