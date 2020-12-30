module.exports = {
  moduleFileExtensions: [
    "js",
    "jsx",
    "json",
    "ts",
    "tsx",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: [
    "**/(tests/unit/**/*.(spec|test)|__tests__/*).(js|jsx|ts|tsx)",
  ],
  testURL: "http://localhost:7357/",
};
