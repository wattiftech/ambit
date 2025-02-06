import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['hebbkx1anhila5yf.public.blob.vercel-storage.com'],
  },
  env: {
    EmailJS_Service_ID: process.env.EMAILJS_SERVICE_ID,
    EmailJS_Template_ID: process.env.EMAILJS_Template_ID,
    EmailJS_Public_Key: process.env.EMAILJS_PUBLIC_KEY,
    EMAILJS_CALCULATE_TEMPLATE_ID: process.env.EMAILJS_CALCULATE_TEMPLATE_ID,

  }
};

export default nextConfig;
