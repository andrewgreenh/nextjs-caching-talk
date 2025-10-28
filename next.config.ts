import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  cacheLife: {
    "15s": {
      stale: 1,
      expire: 9999999,
      revalidate: 15,
    },
  },
};

export default nextConfig;
