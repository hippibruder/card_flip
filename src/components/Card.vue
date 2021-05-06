<template>
  <div class="card-wrapper">
    <svg viewBox="0 0 25 35"></svg>
    <div
      class="card"
      :class="{ flipped: flipped }"
      v-show="!removed"
      @click="click"
    >
      <div class="card-content" ref="content">
        {{ index }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    flipped: Boolean,
    removed: Boolean,
    index: Number,
  },
  methods: {
    click() {
      this.$emit("card-clicked", this.index, this.flipped);
    },
  },
};
</script>
s
<style scoped>
.card-wrapper {
  flex: 1;
  display: grid;
}

.card-wrapper > * {
  grid-area: 1/1;
}

.card {
  margin: 5%;

  border: 1px solid black;
  background-color: red;

  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000;
  color: whitesmoke;

  -webkit-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  -moz-box-shadow: 0px 2px 15px -12px rgba(0, 0, 0, 0.57);
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.57);
}

.card-content {
  text-align: center;
}

.flipped {
  background-color: green;
}
</style>
