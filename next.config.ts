import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // O projeto é publicado como site estático no GitHub Pages.
  // Rotas de servidor/API não podem fazer parte desse build.
  output: 'export',
  poweredByHeader: false,
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
