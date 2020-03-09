module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            babelConfig: true,
        }
    },
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest",
        "^.+\\.jsx?$": "babel-jest",
    },
};