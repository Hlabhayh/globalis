export default {
  clearMocks: true,
  modulePathIgnorePatterns: ["./cypress"],
  transform: {"^.+\\.[t|j]sx?$": "babel-jest"},
  testEnvironment: "jsdom",
};
