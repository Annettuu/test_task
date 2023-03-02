<template>
  <main>
    <suspense>
      <setupJobs />
      <template #fallback>
        Загрузка
      </template>
    </suspense>
  </main>
</template>

<script setup>
import SetupJobs from '@/pages/setupJobs.vue';
</script>
