/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["firebasestorage.googleapis.com"], // Daftar host gambar yang diizinkan
  },
};

module.exports = nextConfig;
