import pluginReactHooks from 'eslint-plugin-react-hooks';
import pluginReactRefresh from 'eslint-plugin-react-refresh';
import baseConfig from './base.js';

const reactConfig = [
  ...baseConfig,
  {
    name: 'monorepo/react-hooks',
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      'react-hooks': pluginReactHooks,
      'react-refresh': pluginReactRefresh
    },
    rules: {
      'react-hooks/exhaustive-deps': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
    }
  }
];

export default reactConfig;
