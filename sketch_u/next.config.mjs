/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: process.env.NEXT_PUBLIC_API_URL 
              ? `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
              : 'http://43.201.55.125:8081/api/:path*',
          },
        ];
    }
};

export default nextConfig;
