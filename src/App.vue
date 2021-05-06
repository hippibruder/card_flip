<template>
  <settings
    @new-game="newGame"
    @reset-game="resetGame"
    @show-hints-changed="showHintsChanged"
  ></settings>
  <card-list
    :cards="game.cards"
    :numLeftover="game.leftovers.length"
    :numFlipped="game.flipped.length"
    :showHints="showHints"
    :solvable="game.solvable"
    :nextMove="game.getNextMove()"
    @card-clicked="cardClicked"
  ></card-list>
  <game-over
    :win="game.win"
    :lose="game.lose"
    @new-game="newGame"
    @reset-game="resetGame"
  ></game-over>
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
      showHints: false,
    };
  },
  methods: {
    newGame(numCards) {
      if (numCards !== undefined) {
        this.numCards = numCards;
      }
      this.game = new Game(this.numCards);
    },
    resetGame() {
      this.game.reset();
    },
    cardClicked(index) {
      this.game.removeCard(index);
    },
    showHintsChanged(showHints) {
      this.showHints = showHints;
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
