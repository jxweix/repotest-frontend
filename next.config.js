/** @type {import('next').NextConfig} */
const withFonts = require('next-fonts');
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_SUPABASE_URL: "https://iqdyhkjgaaimariweutv.supabase.co",
    NEXT_PUBLIC_SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlxZHloa2pnYWFpbWFyaXdldXR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2MTAyMzcsImV4cCI6MjAxNzE4NjIzN30.X5HdI7Qew8UH9AzMeEJLTQPSIIX5ntDuGk1-6rMlBpw",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = withFonts(nextConfig);