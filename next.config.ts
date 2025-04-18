import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: ["./src/styles"],
  },
};

export default nextConfig;
