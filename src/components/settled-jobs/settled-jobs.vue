<template>
  <form class='settled-jobs'>
    <h2>Список настроенных должностей</h2>
    <ul class='settled-jobs__list' v-if='sortedJobs.length'>
      <settled-job v-for='job of sortedJobs'
                  :job='job'
                  :key='job.id'
                  :show-notice='showNotice'
                  @update-salary='updateSalary'
                  @remove-job='removeJob(job.id)'/>
    </ul>
    <span v-else><b>Список пуст</b></span>
    <v-button class='settled-jobs__save-btn'
              type='submit'
              @click.prevent='sendChanges'
              :disabled='btnText === textMap.empty'>{{ btnText }}</v-button>
  </form>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import SettledJob from '@/components/settled-jobs/settled-job.vue';
import VButton from '@/components/ui/v-button.vue';

const props = defineProps({
  jobs: {
    type: Array,
    required: true
  }
});
const emit = defineEmits(['upd-settled-jobs']);

const textMap = {
  empty: 'Должность не настроена',
  toSave: 'Сохранить изменения',
  saved: 'Сохранено'
};
let btnText = ref(textMap.empty);
let showNotice = ref(false);
let localJobs = ref([]);
let salaries = ref([]);

let sortedJobs = computed(() => {
  return [...localJobs.value].sort((a,b) => {
    let result;
    a = a.name.toLowerCase();
    b = b.name.toLowerCase();
    if (a < b) result = -1;
    else if (a>b) result = 1;
    else result = 0;
    return result;
  });
});

watch(() => props.jobs, (data) => {
  localJobs.value = data;
});
watch(sortedJobs, (data) => {
  btnText.value = data.length ? textMap.toSave : textMap.empty;
});

const updateSalary = ({id, value}) => {
  const index = salaries.value.findIndex(job => job.rate_area_id === id);
  if (index < 0) {
    salaries.value.push({rate_area_id: id, base_charge_value: value});
  } else {
    salaries.value[index].base_charge_value = value;
  }
};
const removeJob = (id) => {
  const index = salaries.value.findIndex(job => job.rate_area_id === id);
  salaries.value.splice(index, 1);
  emit('upd-settled-jobs', { id, tuning: false });
};
const showSavedText = () => {
  btnText.value = textMap.saved;
  setTimeout(() => {
    btnText.value = textMap.toSave;
  }, 3000);
};
const sendChanges = () => {
  if (localJobs.value.length === salaries.value.length && !salaries.value.find(job => !job.base_charge_value)) {
    showNotice.value = false;
    showSavedText();
    console.log(JSON.stringify(salaries.value));
  } else {
    showNotice.value = true;
  }
};
</script>

<style scoped lang='scss'>
.settled-jobs {
  &__list {
    list-style: none;
  }
  &__save-btn {
    margin-top: 20px;
    min-width: 160px;
  }
}
</style>
