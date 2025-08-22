import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.246ec84c49134aabb18f75e31997094a',
  appName: 'Public Transport Delay Tracker',
  webDir: 'dist',
  server: {
    url: 'https://246ec84c-4913-4aab-b18f-75e31997094a.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
};

export default config;