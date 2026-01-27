/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [process.env.API_URL],
  transpilePackages: ['@repo/ui'],
};

export default nextConfig;
