import type { NextConfig } from "next";


//configuración de next.js para permitir cargar imágenes desde un dominio específico
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;

