import baseConfig from '@demo/tailwind-config'
import path from 'path'

export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    `${path.join(require.resolve('@demo/ui'), '..')}/**/*.{ts,tsx}`,
  ],
  plugins: [],
}
