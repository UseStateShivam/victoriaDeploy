// next.config.mjs

/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
    distDir: 'dist',
    basePath: isProd ? '/victoriaDeploy' : '',
    output: 'export',
    images: {
        unoptimized: true,
      },
    typescript: {
        ignoreBuildErrors: true,
    }
};

export default nextConfig;
