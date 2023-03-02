<template>
  <article class='v-search' v-if='jobs'>
    <h2>Поиск должностей</h2>
    <input type='search'
           class='v-search__input'
           placeholder='Искать должность по названию...'
           v-model='searchStr'>
    <ul class='v-search__list'>
      <jobItem v-for='job of sortedJobs'
               :key='job.id'
               :title='job.name'
               :tuning='job.tuning'
               @btn-action='setJob(job)'/>
    </ul>
  </article>
</template>

<script setup>
import JobItem from '@/components/ui/job-item.vue';
import { computed, ref } from 'vue';

const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(['upd-settled-jobs']);

let searchStr = ref('');
let sortedJobs = computed(() => {
  return props.jobs.filter(job => job.name.toLowerCase().includes(searchStr.value.toLowerCase()));
});
const setJob = (job) => {
  emit('upd-settled-jobs', {id: job.id, tuning: !job.tuning});
};
</script>

<style scoped lang='scss'>
.v-search {
  display: flex;
  flex-flow: column;
  margin-bottom: 20px;
  &__input {
    padding: 10px;
    margin-bottom: 10px;
  }
  &__list {
    border-top: 1px solid black;
  }
}
</style>
