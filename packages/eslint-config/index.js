module.exports = {
  extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
  ignorePatterns: [
    '**/node_modules',
    '**/build',
    '**/dist',
    '**/public/build',
    '**/edgeql',
  ],
};
