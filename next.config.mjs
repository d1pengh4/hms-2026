/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/hms-2026',
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
