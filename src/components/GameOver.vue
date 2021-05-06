<template>
  <div class="game-over" v-show="gameOver">
    <div class="game-over-background">
      <div class="game-over-text win" v-show="win">Win!</div>
      <div class="game-over-text lose" v-show="lose">Lose!</div>

      <input
        class="game-over-button"
        type="button"
        value="New Game"
        @click="newGame"
      />
      <input
        class="game-over-button"
        type="button"
        value="Reset Game"
        @click="resetGame"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "GameOver",
  props: {
    win: {
      type: Boolean,
      required: true,
    },
    lose: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      numCards: 8,
    };
  },
  computed: {
    gameOver() {
      return this.win || this.lose;
    },
  },
  methods: {
    newGame() {
      this.$emit("new-game");
    },
    resetGame() {
      this.$emit("reset-game");
    },
  },
};
</script>

<style scoped>
.game-over {
  position: absolute;
  top: 10vw;
  width: 100%;
}

.game-over-background {
  margin: auto;
  padding: 2%;
  width: fit-content;
  background-color: rgba(200, 213, 218, 0.699);
  border: solid 1px;
  border-radius: 10%;
}

.game-over-text {
  font-size: 20vw;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
}

.win {
  color: rgb(0, 170, 0);
}

.lose {
  color: red;
}

.game-over-button {
  float: none;
  font-size: 125%;
  margin-left: 2%;
  margin-right: 2%;
}
</style>
