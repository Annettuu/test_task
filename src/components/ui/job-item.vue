<template>
  <component :is='is' class='job-item'>
    <span class='job-item__title'>{{ title }}</span>
    <v-button @click='btnAction'>{{ btnText }}</v-button>
  </component>
</template>

<script setup>
import { computed } from 'vue';
import VButton from '@/components/ui/v-button.vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  tuning: {
    required: true
  },
  is: {
    type: String,
    default: 'li'
  }
});
const emit = defineEmits(['btn-action']);
const btnAction = () => {
  emit('btn-action');
};
const btnText = computed(() => {
  return props.tuning ? 'Удалить' : 'Добавить';
});
</script>

<style scoped lang='scss'>
.job-item {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid black;
  &__title {
    font-size: 12px;
    color: black;
  }
}
</style>
