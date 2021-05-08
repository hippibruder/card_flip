<template>
  <div class="card-wrapper">
    <svg viewBox="0 0 25 35"></svg>
    <div
      class="card"
      :class="{ flipped: card.flipped, hint: isNextMove }"
      v-show="!card.removed"
      @click="click"
    >
      <div class="card-content" ref="content">
        {{ card.index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    card: Object,
    showHints: Boolean,
    nextMove: Number,
  },
  methods: {
    click() {
      this.$emit("card-clicked", this.card.index, this.card.flipped);
    },
  },
  computed: {
    isNextMove() {
      return this.showHints && this.card.index == this.nextMove;
    },
  },
};
</script>
s
<style scoped>
.card-wrapper {
  flex: 1;
  display: grid;
}

.card-wrapper > * {
  grid-area: 1/1;
}

.card {
  margin: 5%;

  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.5);

  background-color: red;

  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: whitesmoke;

  box-shadow: 0.1em 0.1em 0.15em rgba(0, 0, 0, 0.5);
}

.card-content {
  text-align: center;
}

.flipped {
  background-color: green;
}

.hint {
  border: 1px solid rgb(109, 109, 0);
  box-shadow: 0em 0em 0.08em 0.08em yellow,
    0.01em 0.01em 0.3em 0.1em rgba(77, 77, 0, 0.37);
}
</style>
