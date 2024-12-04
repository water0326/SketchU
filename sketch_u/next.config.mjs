/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'http://43.201.55.125:8081/api/:path*',
          },
        ];
    }
};

export default nextConfig;
