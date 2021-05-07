<template>
  <div class="card-list-info">
    <div>Flipped: {{ numFlipped }}/{{ numLeftover }}</div>
    <div v-if="showHints">
      <div v-show="!solvable">Not solvable!</div>
      <div v-show="solvable">Next move: {{ nextMove }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "GameInfo",
  props: {
    numFlipped: Number,
    numLeftover: Number,
    showHints: Boolean,
    solvable: Boolean,
    nextMove: Number,
  },
};
</script>

<style scoped>
.card-list-info {
  display: inline;
}

.card-list-info * {
  display: inline-block;
  margin: 0 5px;
}
</style>
