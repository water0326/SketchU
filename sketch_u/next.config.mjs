/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        const destination = 'http://43.201.55.125:8081/api/:path*';
        
        return [
          {
            source: '/api/:path*',
            destination: destination,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
          },
        ];
    }
};

export default nextConfig;
