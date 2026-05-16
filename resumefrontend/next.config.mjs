/** @type {import('next').NextConfig} */
const nextConfig = {

  reactCompiler: true, 

  devIndicators: false,

  async rewrites() {
    return [
      {
        // FIX: Added '/' before :path* to ensure correct path matching
        source: "/api/:path*", 
        destination: "http://localhost:5001/api/:path*",
      },
    ];
  },


};

export default nextConfig;
