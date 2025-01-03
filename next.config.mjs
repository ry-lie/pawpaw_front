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
  images: {
    domains: ['pawpaw-s3-bucket.s3.ap-northeast-2.amazonaws.com', 's3.ap-northeast-2.amazonaws.com'], // 허용할 이미지 도메인 추가
  },
};

export default nextConfig;
