<template>
  <div>
    <img class="checker" src="../assets/checker.svg" :style="{ left: checkerLeft, top: checkerTop }"/>
  </div>
</template>

<script lang="ts">


import { defineComponent } from "vue"
export default defineComponent({
    name: "Checker",
    data(){
      return {
      squares: Array(64).fill(null), // create an array of 64 squares
      checkerLeft: '100px', // initial left position
      checkerTop: '100px' // initial top position
    }
    }
})
</script>

<style scoped>


.square {
  background-color: #ccc; /* adjust the square color */
  padding: 20px; /* adjust the square padding */
  border: 1px solid #666; /* adjust the square border */
}
.checker {
  position: absolute;
  top: -50px; /* adjust the value to position it above the board */
  left: 50%; /* center it horizontally */
  transform: translateX(-50%);
  width: 100px; /* adjust as needed */
  z-index: 1; /* ensure it's on top of the board */
}
</style>
