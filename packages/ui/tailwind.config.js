/* eslint-disable @typescript-eslint/no-var-requires */
import baseConfig from '@demo/tailwind-config'

export default {
  ...baseConfig,
  content: [
    ...baseConfig.content,
    './src/components/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}',
    './src/index.ts',
  ],
}
