<template>
  <div class="card-wrapper">
    <svg viewBox="0 0 5 7"></svg>
    <button
      class="card"
      :class="{
        flipped: card.flipped,
        hint: isNextMove,
        visible: !card.removed,
      }"
      v-show="!card.removed"
      @click="click"
    >
      <div class="card-content">
        {{ card.index }}
      </div>
    </button>
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
      let isNext = this.showHints && this.card.index == this.nextMove;
      if (isNext) {
        this.$refs.card.focus();
      }
      return isNext;
    },
  },
};
</script>
s
<style scoped>
.card-wrapper {
  flex: 1;
  display: grid;
  user-select: none;
}

.card-wrapper > * {
  grid-area: 1/1;
}

.card {
  margin: 5%;
  min-width: 0;
  padding: 0;

  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.5);

  font-size: 1vw;
  background-color: red;

  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: whitesmoke;

  box-shadow: 0.1em 0.1em 0.15em rgba(0, 0, 0, 0.5);
}

.card-content {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.visible {
  cursor: not-allowed;
}

.visible.flipped {
  cursor: pointer;
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
