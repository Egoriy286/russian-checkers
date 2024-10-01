<template>
<div class="box" :class="{boxW:  theme === 'white'}">
  <slot>default</slot>
</div>
</template>
  
  <script  lang="ts">
  import { defineComponent } from "vue";
  export default defineComponent({
      name: "Box",
      props: ['theme']
    }    
)
  </script>
  
  <style scoped>
  .box {
      align-content: center;

      text-align: center;
      width: calc(); 
      height: calc(); 
      aspect-ratio: 1 / 1;
      padding: 0;
      flex-shrink: 0; 
      border: 2px solid #C15829; 
      background: #C15829;
  }
  .boxW{
      width: calc(); 
      height: calc(); 
      aspect-ratio: 1 / 1;
      flex-shrink: 0; 
      background: #FAEEB9;;
  }
  </style>
  