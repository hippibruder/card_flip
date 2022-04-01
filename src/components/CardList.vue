<template>
  <div class="card-list">
    <card
      v-for="c in cards"
      :card="c"
      :showHints="showHints"
      :nextMove="nextMove"
      @card-clicked="cardClicked"
      :key="c.index"
    ></card>
  </div>
</template>

<script>
import Card from "./Card.vue";
import { debounce } from "../helpers.js";
export default {
  name: "CardList",
  components: {
    Card,
  },
  props: {
    cards: Array,
    showHints: Boolean,
    nextMove: Number,
  },
  emits: ["card-clicked"],
  methods: {
    cardClicked(index, flipped) {
      this.$emit("card-clicked", index, flipped);
    },
    adjustFontSize() {
      let cards = document.querySelectorAll(".card");
      cards.forEach((el) => {
        let size = el.clientWidth / 2;
        el.style.fontSize = size + "px";
      });
    },
  },
  created() {
    this.adjustFontSizeDebounced = debounce(this.adjustFontSize, 100);
  },
  mounted() {
    if (ResizeObserver) {
      this.ro = new ResizeObserver(this.adjustFontSizeDebounced).observe(
        this.$el
      );
    }
  },
  beforeUnmount() {
    if (this.ro) {
      this.ro.unobserve(this.$el);
    }
  },
};
</script>

<style scoped>
.card-list {
  display: flex;
  margin: 0.4vh 2vw 0vh;
}
</style>
