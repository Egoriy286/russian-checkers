<template>
  <div :class="['box', theme]">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Box',
  props: {
    theme: {
      type: String,
      required: true
    }
  }
});
</script>

<style scoped>
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.black {
  background-color: #f0d9b5;
}

.black {
  background-color: #b58863;
}
</style>
