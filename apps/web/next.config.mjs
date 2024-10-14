import { config } from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
  config({ path: '../../.env' })
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatar.vercel.sh',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig
