import type { NextConfig } from 'next';
// Exportação estática: gera a pasta `out/`, que o GitHub Pages serve direto.
const nextConfig: NextConfig = { poweredByHeader: false, output: 'export', images: { unoptimized: true }, trailingSlash: true };
export default nextConfig;
