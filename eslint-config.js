module.exports = {
  extends: [
    'eslint-config-airbnb',
    'eslint-config-prettier',
    'eslint-config-prettier/react'
  ].map(require.resolve),

  plugins: ['react', 'prettier'],

  globals: {
    PLATFORM: true,
    MODE: true,
    window: true,
    document: true,
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: true,
    __REDUX_DEVTOOLS_EXTENSION__: true,
    createjs: true,
    TweenMax: true,
    TimelineMax: true,
    SplitText: true,
    Back: true,
    Power1: true,
    Power2: true,
    Power3: true,
    Cubic: true,
    Elastic: true,
    Linear: true,
    Bounce: true,
    describe: true,
    test: true,
    beforeEach: true,
    afterEach: true,
    expect: true
  },

  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    }
  },
  rules: {
    indent: 0, // eslint vs prettier. Round 1! Fight!
    curly: ['error', 'all'],
    'import/prefer-default-export': 'off',
    'no-alert': 'error',
    'no-debugger': 'error',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'linebreak-style': 'off',
    'lines-around-comment': ['error', { beforeBlockComment: true }],
    'multiline-comment-style': ['error', 'separate-lines'],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'prettier/prettier': [
      'error',
      {
        // Number of spaces it should use per tab
        tabWidth: 2,
        singleQuote: true,

        // Controls the printing of trailing commas wherever possible. Valid options:
        // 'none' - No trailing commas
        // 'es5'  - Trailing commas where valid in ES5 (objects, arrays, etc)
        // 'all'  - Trailing commas wherever possible (function arguments)
        trailingComma: 'none',

        // If true, puts the `>` of a multi-line jsx element at the end of
        // The last line instead of being alone on the next line
        jsxBracketSameLine: false
      }
    ]
  }
};
