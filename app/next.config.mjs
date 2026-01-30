// next.config.mjs
/** @type {import('next').NextConfig} */
import withPWA from 'next-pwa';

const withPWAConfig = withPWA({
  dest: 'public', // サービスワーカーの出力先
  disable: process.env.NODE_ENV === 'development', // 開発モードではPWAを無効にする
});

const nextConfig = {
  // ここに Next.js の設定を追加できます
  // 例: experimental: { optimizePackageImports: ['@supabase/supabase-js'] }
};

// PWA設定とNext.js設定をマージしてエクスポート
export default withPWAConfig(nextConfig);