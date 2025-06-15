/** @type {import('next').NextConfig} */
const nextConfig = {
  /* ------------------------------------------------------------------ */
  /* Core                                                               */
  /* ------------------------------------------------------------------ */
  reactStrictMode: true,               // extra runtime checks in dev
  output: "standalone",                // good for Vercel & Docker images


  /* ------------------------------------------------------------------ */
  /* ESLint & TypeScript – fail the build if errors remain              */
  /* ------------------------------------------------------------------ */
  eslint: {
    dirs: ["pages", "components", "lib"],   // folders to lint
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
