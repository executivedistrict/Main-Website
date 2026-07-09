import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // /how-we-work was removed in plan 005; its content merged into the
      // home page (capabilities row). Permanent so old links and search
      // engines follow.
      {
        source: "/how-we-work",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
