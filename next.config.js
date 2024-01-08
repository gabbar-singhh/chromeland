// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: " https://chromeland-v1.vercel.app/fonts/PrintChar21.woff2", // Adjust this path to match your font file path
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can replace '*' with your specific domain if needed
          },
        ],
      },
      {
        source: "https://chromeland-v1.vercel.app/fonts/PrintChar21.woff2", // Adjust this path to match your font file path
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can replace '*' with your specific domain if needed
          },
        ],
      },
      {
        source: "https://chromeland-v1.vercel.app/fonts/PrintChar21.woff", // Adjust this path to match your font file path
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can replace '*' with your specific domain if needed
          },
        ],
      },
      {
        source: "https://chromeland-v1.vercel.app/fonts/PrintChar21.ttf", // Adjust this path to match your font file path
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // You can replace '*' with your specific domain if needed
          },
        ],
      },
    ];
  },
};
