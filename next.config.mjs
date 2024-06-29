// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
    distDir: 'dist',
    output: 'export',
    images: {
        unoptimized: true,
      },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
