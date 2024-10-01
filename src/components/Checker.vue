<template>
  <div :class="['checker', color, { king }]"></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'Checker',
  props: {
    color: {
      type: String as PropType<"white" | "black" | "empty">,
      required: true,
    },
    king: {
      type: Boolean,
      required: false,
      default: false
    }
  }
});
</script>

<style scoped>
.checker {
  width: 80%;
  height: 80%;
  border-radius: 50%;
}

.black {
  background-color: #000;
}

.white {
  background-color: #fff;
  border: 2px solid #000;
}

.king {
  border: 4px solid gold;
}
</style>
