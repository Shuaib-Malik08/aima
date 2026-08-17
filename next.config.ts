// // import type { NextConfig } from "next";

// // const nextConfig: NextConfig = {
// //   /* config options here */
// // };

// // export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   basePath: "/aimaweb",
//   assetPrefix: "/aimaweb/",
//   async redirects() {
//     return [
//       {
//         source: "/home",
//         destination: "/home",
//         permanent: false,
//       },
//     ];
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "aima.sanntra.com",
//         port: "",
//         pathname: "/**",
//       },
//     ],
//   },
// };

// export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/aimaweb",
  assetPrefix: "/aimaweb/",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aima.sanntra.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
