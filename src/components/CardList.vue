<template>
  <div class="card-list-info">
    <div>Flipped: {{ numFlipped }}/{{ numLeftover }}</div>
    <div v-if="showHints">
      <div v-show="!solvable">Not solvable!</div>
      <div v-show="solvable">Next move: {{ nextMove }}</div>
    </div>
  </div>
  <div class="card-list">
    <card
      v-for="(c, i) in cards"
      :flipped="c.flipped"
      :removed="c.removed"
      :index="i"
      @card-clicked="cardClicked"
      :key="i"
    ></card>
  </div>
</template>

<script>
import Card from "./Card.vue";
export default {
  name: "CardList",
  components: {
    Card,
  },
  props: {
    cards: Array,
    numFlipped: Number,
    numLeftover: Number,
    showHints: Boolean,
    solvable: Boolean,
    nextMove: Number,
  },
  emits: ["card-clicked"],
  methods: {
    cardClicked(index, flipped) {
      this.$emit("card-clicked", index, flipped);
    },
    adjustFontSize() {
      this.$nextTick(() => {
        let cards = document.querySelectorAll(".card-content");
        cards.forEach((el) => {
          let size = el.clientWidth / 2;
          el.style.fontSize = size + "px";
        });
      });
    },
  },
  created() {
    this.adjustFontSize();
  },
  updated() {
    this.adjustFontSize();
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

.card-list {
  display: flex;
  margin: 0.4vh 2vw 0vh;
}
</style>
