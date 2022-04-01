
module.exports = {
  testRegex: [".*_test.js$"],
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "vue-jest"
  }
};
