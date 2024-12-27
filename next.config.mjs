/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://kdt-react-node-1-team01.elicecoding.com/api/:path*",
      },
    ];
  },
};

export default nextConfig;
