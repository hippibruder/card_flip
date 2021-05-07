<template>
  <form class="settings" @submit.prevent="onSubmit">
    <div class="settings_item">
      <label for="num-cards">Number of cards:</label>
      <input id="num-cards" v-model.number="numCards" @wheel="handleScroll" />
    </div>

    <div class="settings_item">
      <label for="show-hints">Show hints:</label>
      <input id="show-hints" type="checkbox" v-model="showHints" @change="showHintsChanged" />
    </div>

    <input class="settings_item button" type="button" value="New Game" @click="newGame"/>
    <input class="settings_item button" type="button" value="Reset Game" @click="resetGame"/>
  </form>
</template>

<script>
export default {
  name: "Settings",
  props: {
  },
  data() {
    return {
      numCards: 8,
      showHints: false,
    };
  },
  methods: {
    newGame() {
      this.$emit("new-game", this.numCards);
    },
    resetGame() {
      this.$emit("reset-game");
    },
    handleScroll(event) {
      this.numCards += event.deltaY < 0 ? 1 : -1;
      this.newGame();
    },
    showHintsChanged() {
      this.$emit("show-hints-changed", this.showHints);
    },
  },
  created() {
    this.newGame();
  },
};
</script>

<style scoped>
.settings {
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(-90deg, rgba(255, 0, 0, 0.70), rgba(0, 128, 0, 0.70));
  width: 100%;
  height: 35px;
  margin-bottom: 25px;

  border: solid 1px;
  border-color: slategray;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.50);
}

.settings_item {
  margin-left: 10px;
  margin-right: 10px;
}

#num-cards {
  width: 30px;
  text-align: center;
  margin-left: 5px;
}

.settings_item.button {
  font-size: 120%;
}
</style>
