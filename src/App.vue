<template>
  <settings @start-game="startGame"></settings>
  <card-list :cards="cards" @card-clicked="cardClicked"></card-list>
  <div class="overlay win" v-show="win">Win!</div>
  <div class="overlay lose" v-show="lose">Lose!</div>
</template>

<script>
import CardList from "./components/CardList.vue";
import Settings from "./components/Settings.vue";

export default {
  name: "App",
  components: {
    CardList,
    Settings,
  },
  data() {
    return {
      cards: [],
      win: false,
      lose: false,
    };
  },
  methods: {
    startGame(numCards) {
      this.numCards = numCards;
      this.cards = [];
      for (let index = 0; index < numCards; index++) {
        let flipped = Boolean(Math.floor(Math.random() * 2));
        this.cards.push({ flipped: flipped, removed: false });
      }
    },
    cardClicked(index, flipped) {
      if (flipped) {
        this.removeCard(index);
      }
      this.checkGameState();
    },
    removeCard(index) {
      this.cards[index].removed = true;
      let flips = [];
      const left = index - 1;
      if (left >= 0) {
        flips.push(left);
      }
      const right = index + 1;
      if (right < this.cards.length) {
        flips.push(right);
      }
      flips.forEach((i) => {
        const card = this.cards[i];
        card.flipped = !card.flipped;
      });
    },
    checkGameState() {
      if (this.numCards === 0) {
        this.lose = this.win = false;
        return;
      }

      const leftovers = this.cards.filter((c) => !c.removed);
      this.win = leftovers.length === 0;
      if (this.win) {
        return;
      }
      const notFlipped = leftovers.filter((c) => !c.flipped);
      this.lose = leftovers.length === notFlipped.length;
    },
  },
  updated() {
    this.checkGameState();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 6px;
}

.overlay {
  position: absolute;
  top: 10vw;
  width: 100%;
  display: flex;
  justify-content: center;

  font-size: 20vw;
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000, 2px 2px 0 #000;
}

.win {
  color: green;
}

.lose {
  color: red;
}
</style>
