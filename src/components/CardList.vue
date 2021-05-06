<template>
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
    msg: String,
    cards: Array,
  },
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
.card-list {
  display: flex;
  margin: 3vw;
}
</style>
