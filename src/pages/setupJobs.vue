<template>
  <section class='setup-jobs'>
    <h1 class='_hidden'>Настройка должностей</h1>
      <search v-if='jobs && jobs.length' @upd-settled-jobs='updateJob' :jobs='jobs'/>
    <settledJobs @upd-settled-jobs='updateJob' :jobs='settledJobsList'/>
  </section>
</template>

<script setup>
import Search from '@/components/v-search/v-search.vue';
import SettledJobs from '@/components/settled-jobs/settled-jobs.vue';
import { getJobs } from '@/service/actions';
import { computed, ref } from 'vue';

let jobs = ref([]);
jobs.value = await getJobs();

const updateJob = ({ id, tuning }) => {
  const index = jobs.value.findIndex(job => job.id === id);
  jobs.value[index].tuning = tuning;
};
const settledJobsList = computed(() => {
  return jobs.value?.length ? jobs.value.filter(job => job.tuning) : [];
});
</script>

<style scoped lang='scss'>
.setup-jobs {
  display: flex;
  flex-flow: column;
}
</style>
