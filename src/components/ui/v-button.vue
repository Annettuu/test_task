<template>
  <button class='v-button' :type='type' :disabled='disabled'><slot /></button>
</template>

<script>
export default {
  name: 'v-button',
  props: {
    disabled: {
      type: Boolean
    },
    type: {
      type: String
    }
  }
};
</script>

<style scoped lang='scss'>
.v-button {
  cursor: pointer;
  background-color: #519cff;
  color: white;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  padding: 2px 6px;
  border: none;
  min-width: 102px;
  &:hover {
    background-color: #3d7dd2;
  }
  &:disabled {
    pointer-events: none;
    cursor: default;
    background-color: #9e9e9e;
  }
}
</style>
