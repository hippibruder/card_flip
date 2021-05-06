<template>
  <settings @start-game="newGame"></settings>
  <card-list :cards="game.cards" @card-clicked="cardClicked"></card-list>
  <game-over :win="win" :lose="lose" @new-game="newGame" @restart-game="restartGame"></game-over>
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
      this.updateGameState();
    },
    cardClicked(index) {
      this.game.removeCard(index);
      this.updateGameState();
    },
    updateGameState() {
      this.lose = this.game.lose;
      this.win = this.game.win;
    },
  },
  updated() {
    this.updateGameState();
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
