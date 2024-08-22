/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/index/:path*",
        destination: "http://65.109.69.98:7700/:path*", // Proxy to Backend, token required
      },
      // {
      //   source: "/indexMain/:path*",
      //   destination: "http://65.109.69.98:7701/:path*", // Proxy to Backend, token required
      // },
      // {
      //   source: "/indexBase/:path*",
      //   destination: "http://65.109.69.98:7702/:path*", // Proxy to Backend, token required
      // },
      {
        source: "/api/:path*",
        destination: "http://65.109.69.98:9001/:path*", // Proxy to Backend
      },
      {
        source: "/docs/:path*",
        destination: "http://65.109.69.98:9001/:path*", // Proxy to Backend, token required
      },
      // {
      //   source: "/apiMain/:path*",
      //   destination: "http://65.109.69.98:8088/:path*", // Proxy to Backend
      // },
      // {
      //   source: "/apiBase/:path*",
      //   destination: "http://65.109.69.98:8089/:path*", // Proxy to Backend
      // },
    ];
  },
  webpack(config, { isServer }) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(
      (/** @type {{ test: { test: (arg0: string) => any; }; }} */ rule) =>
        rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              icon: true,
              typescript: true,
              ext: "tsx",
            },
          },
        ],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };

    // if (isServer) {
    //   config.externals = ["http-proxy-middleware", ...config.externals];
    // }

    return config;
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
