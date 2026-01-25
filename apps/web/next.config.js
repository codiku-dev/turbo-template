/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['http://localhost:3090/trpc'],
  transpilePackages: ['@repo/ui'],
};
