module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
    "^vue$": "vue/dist/vue.common.js"
  },
  moduleFileExtensions: ["js", "vue", "json", "ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  setupFiles: ["<rootDir>/test/setup.ts"],
  collectCoverage: true,
  collectCoverageFrom: ["<rootDir>/src/**/*"]
};
