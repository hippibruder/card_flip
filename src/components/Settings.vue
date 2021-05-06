<template>
  <form class="settings" @submit.prevent="onSubmit">
    <div class="settings_item">
      <label for="num-cards">Number of cards:</label>
      <input id="num-cards" v-model.number="numCards" @wheel="handleScroll" />
    </div>

    <input class="settings_item button" type="submit" value="New Game" />
  </form>
</template>

<script>
export default {
  name: "Settings",
  props: {
    msg: String,
    cards: Array,
  },
  data() {
    return {
      numCards: 8,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("start-game", this.numCards);
    },
    handleScroll(event) {
      this.numCards += event.deltaY < 0 ? 1 : -1;
      this.onSubmit();
    },
  },
  created() {
    this.onSubmit();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.settings {
  display: flex;
  justify-content: center;
  align-items: center;

  background: linear-gradient(-90deg, rgba(255, 0, 0, 0.70), rgba(0, 128, 0, 0.55));
  width: 100%;
  height: 30px;
  margin-bottom: 25px;

  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
}

.settings_item {
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.settings .button {
  margin: 3px;
}
</style>
