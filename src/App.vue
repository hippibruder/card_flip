<template>
  <settings
    @new-game="newGame"
    @reset-game="resetGame"
    @undo-move="undoMove"
    :undoEnabled="undoStack.hasActions"
    @show-hints-changed="showHintsChanged"
  ></settings>
  <game-info
    :numLeftover="game.leftovers.length"
    :numFlipped="game.flipped.length"
    :showHints="showHints"
    :solvable="gameSolver.solvable"
    :nextMove="gameSolver.nextMove"
  ></game-info>
  <card-list
    :cards="game.cards"
    :showHints="showHints"
    :nextMove="gameSolver.nextMove"
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
import GameInfo from "./components/GameInfo.vue";
import CardList from "./components/CardList.vue";
import Settings from "./components/Settings.vue";
import GameOver from "./components/GameOver.vue";
import { Game, GameSolver } from "./Game.js";
import UndoStack from "./UndoStack.js";

export default {
  name: "App",
  components: {
    GameInfo,
    CardList,
    Settings,
    GameOver,
  },
  data() {
    return {
      game: new Game(),
      gameSolver: new GameSolver(),
      undoStack: new UndoStack(),
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
      this.undoStack.reset();
      this.game = new Game(this.numCards, (undo) =>
        this.undoStack.addAction(undo)
      );
      this.gameSolver = new GameSolver(this.game);
      this.$nextTick(() => {
        this.adjustFontSize();
      });
    },
    resetGame() {
      this.undoStack.reset();
      this.game.reset();
    },
    undoMove() {
      this.undoStack.undoAction();
    },
    cardClicked(index) {
      this.game.removeCard(index);
    },
    showHintsChanged(showHints) {
      this.showHints = showHints;
    },
    keydown(e) {
      if (e.key === "z") {
        this.undoMove();
      }
    },
    adjustFontSize() {
      let cards = document.querySelectorAll(".card");
      cards.forEach((el) => {
        let size = el.clientWidth / 2;
        el.style.fontSize = size + "px";
      });
    },
  },
  mounted() {
    window.addEventListener("keydown", this.keydown);
  },
  unmounted() {
    window.removeEventListener("keydown", this.keydown);
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
