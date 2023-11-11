/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;

module.exports = {
  images: {
    domains: ["infura-ipfs.io",'rahul-nft-marketplace.infura-ipfs.io'],
    formats: ["image/webp"]
  },
}




