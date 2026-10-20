import type { NextConfig } from 'next';

const config: NextConfig = {
  output: 'export',
  trailingSlash: true,
  reactStrictMode: true,
  poweredByHeader: false,
  // Lets a phone on the same Wi-Fi use `npm run dev` through the laptop's local address.
  // Without this, Next blocks its dev scripts for other devices and every button on the page does nothing.
  allowedDevOrigins: ['192.168.*.*', '10.*.*.*', '172.16.*.*', '172.17.*.*', '172.18.*.*', '172.19.*.*', '*.local'],
};

export default config;
