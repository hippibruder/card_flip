<template>
  <settings @start-game="startGame"></settings>
  <card-list :cards="game.cards" @card-clicked="cardClicked"></card-list>
  <div class="overlay win" v-show="win" @click="restartGame">Win!</div>
  <div class="overlay lose" v-show="lose" @click="restartGame">Lose!</div>
</template>

<script>
import CardList from "./components/CardList.vue";
import Settings from "./components/Settings.vue";
import Game from "./Game.js";

export default {
  name: "App",
  components: {
    CardList,
    Settings,
  },
  data() {
    return {
      game: new Game(0),
      win: false,
      lose: false,
    };
  },
  methods: {
    startGame(numCards) {
      this.game = new Game(numCards);
    },
    restartGame() {
      this.game.restart()
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
  text-shadow: -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000,
    2px 2px 0 #000;
}

.win {
  color: green;
}

.lose {
  color: red;
}
</style>
