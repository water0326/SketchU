/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const destination = process.env.NEXT_PUBLIC_API_URL + '/:path*';
        
        return [
          {
            source: '/api/:path*',
            destination: destination,
          },
        ];
    }
};

export default nextConfig;
