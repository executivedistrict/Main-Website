import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Deploy marker, inlined at build time and rendered as <meta> tags by the
  // root layout. The client owns the Netlify account, so this is how we
  // confirm from the live site which commit is deployed. COMMIT_REF is set
  // by Netlify during builds; local builds fall back to "local".
  env: {
    BUILD_COMMIT: process.env.COMMIT_REF ?? "local",
    BUILD_TIME: new Date().toISOString(),
  },
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
