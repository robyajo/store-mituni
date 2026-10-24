import type { NextConfig } from "next";

const apiBackendUrl =
  process.env.API_SERVICE_URL ||
  process.env.NEXT_PUBLIC_API_SERVCE_URL ||
  "http://127.0.0.1:8000";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${apiBackendUrl}/api/:path*`,
      },
      {
        source: "/storage/:path*",
        destination: `${apiBackendUrl}/storage/:path*`,
      },
    ];
  },
};

export default nextConfig;
