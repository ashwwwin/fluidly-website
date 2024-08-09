import MillionLint from '@million/lint';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: config => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  }
};
export default MillionLint.next({
  rsc: true
})(nextConfig);