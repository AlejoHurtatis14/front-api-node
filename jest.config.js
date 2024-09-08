module.exports = {
    verbose: true,
    preset: 'ts-jest',
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest',
    },
    setupFiles: ["<rootDir>/src/jest/localStorageMocks.js"],
    globals: {
        "localStorage": {}
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/src/jest/fileMock.js",
    }
};