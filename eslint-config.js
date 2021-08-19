module.exports = {
  extends: ['eslint-config-prettier'].map(require.resolve),
  globals: {
    window: true,
    document: true,
    describe: 'readonly',
    test: 'readonly',
    beforeEach: 'readonly',
    expect: 'readonly',
  },
};
