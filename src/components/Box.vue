<template>
  <div :class="['box', theme]" >
    <slot> <div v-if="validBox" class="valid-move">

    </div></slot>
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
    },
    validBox:{
      type: Boolean,
      required: false,
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

.white {
  background-color: #f0d9b5;
}

.black {
  background-color: #b58863;
}

.valid-move {
  width: 30px;
  height: 30px;
  background-color: rgba(0, 255, 0, 0.3);
  }
</style>
