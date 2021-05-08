<template>
  <form class="settings" @submit.prevent="newGame">
    <div class="settings_item">
      <label for="num-cards">Cards:</label>
      <input id="num-cards" v-model.number="numCards" @wheel="handleScroll" />
    </div>

    <div class="settings_item">
      <label for="show-hints">Hints:</label>
      <input
        id="show-hints"
        type="checkbox"
        v-model="showHints"
        @change="showHintsChanged"
      />
    </div>

    <input
      class="settings_item button"
      type="button"
      value="⎌"
      title="Undo Move"
      @click="undoMove"
      :disabled="!undoEnabled"
    />
    <input
      class="settings_item button"
      type="button"
      value="New Game"
      @click="newGame"
    />
    <input
      class="settings_item button"
      type="button"
      value="Reset Game"
      @click="resetGame"
    />
  </form>
</template>

<script>
export default {
  name: "Settings",
  props: {
    undoEnabled: Boolean,
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
    undoMove() {
      this.$emit("undo-move");
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
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  background: linear-gradient(
    -90deg,
    rgba(255, 0, 0, 0.7),
    rgba(0, 128, 0, 0.7)
  );
  padding: 5px 0px 5px 5px;
  margin-bottom: 25px;

  border: solid 1px;
  border-color: slategray;

  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.settings_item {
  margin-left: 1vw;
  margin-right: 1vw;
}

#num-cards {
  width: 25px;
  text-align: center;
  margin-left: 5px;
}

.settings_item.button {
  font-size: 1.1em;
}
</style>
