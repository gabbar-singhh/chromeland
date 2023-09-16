const nextConfig = {
  reactStrictMode: false,
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
          // Add other headers as needed
        ],
      },
    ];
  },
};

module.exports = nextConfig;
