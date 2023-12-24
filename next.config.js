/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    unoptimized: false, // Disable Next.js' default image optimization
    domains: ["infura-ipfs.io",'rahul-nft-marketplace.infura-ipfs.io'] ,
    formats: ["image/webp"],
  },
};







