import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.marcosesandra.vidasaudavel',
  appName: 'Vida Saudável',
  webDir: 'dist',
  server: {
    url: 'https://app-saude-self.vercel.app',
    androidScheme: 'https'
  }
};

export default config;
