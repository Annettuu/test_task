<template>
  <li class='settled-job'>
    <job-item is='span' :tuning='job.tuning' :title='job.name' @btn-action='removeJob'/>
    <label>
      <span class='settled-job__salary'>Базовая заработная плата</span>
      <span class='settled-job__container'>
        <input type="text" v-model="input" @input="filterNonNumeric" />
        <span class='settled-job__notice' v-if='showNotice && !input'>Необходимо заполнить поле</span>
      </span>
    </label>
  </li>
</template>

<script setup>
import JobItem from '@/components/ui/job-item.vue';
import { ref, watch } from 'vue';

const props = defineProps({
  job: {
    type: Object,
    required: true
  },
  showNotice: {
    type: Boolean
  }
});
const emit = defineEmits(['update-salary', 'remove-job']);

let input = ref('');

watch(input, () => {
  emit('update-salary', { value: input, id: props.job.id });
});

const filterNonNumeric = () => {
  input.value = input.value.match(/[0-9]*/g)[0];
};
const removeJob = () => {
  emit('remove-job');
};
</script>

<style scoped lang='scss'>
.settled-job {
  display: flex;
  flex-flow: column;
  & label {
    /* отступ снизу для подсказки */
    padding: 10px 10px 16px;
    display: flex;
    flex-flow: row;
    gap: 10px;
  }
  &__container {
    position: relative;
  }
  &__notice {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    transform: translateY(100%);
    font-size: 12px;
    color: red;
  }
}
</style>
