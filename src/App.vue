<template>
  <settings @start-game="newGame"></settings>
  <card-list :cards="game.cards" @card-clicked="cardClicked"></card-list>
  <game-over :win="game.win" :lose="game.lose" @new-game="newGame" @restart-game="restartGame"></game-over>
</template>

<script>
import CardList from "./components/CardList.vue";
import Settings from "./components/Settings.vue";
import GameOver from "./components/GameOver.vue";
import Game from "./Game.js";

export default {
  name: "App",
  components: {
    CardList,
    Settings,
    GameOver,
  },
  data() {
    return {
      game: new Game(0),
      numCards: 0,
      win: false,
      lose: false,
    };
  },
  methods: {
    newGame(numCards) {
      if (numCards !== undefined) {
        this.numCards = numCards;
      }
      this.game = new Game(this.numCards);
    },
    restartGame() {
      this.game.restart();
    },
    cardClicked(index) {
      this.game.removeCard(index);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #18222c;
  margin-top: 6px;
}
</style>
