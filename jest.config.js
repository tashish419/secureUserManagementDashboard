module.exports = {
    transform: {
      '^.+\\.[tj]sx?$': 'babel-jest',
    },
    transformIgnorePatterns: [
      'node_modules/(?!(firebase|other-module)/)',
    ],
  };
  