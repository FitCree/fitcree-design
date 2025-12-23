import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Turbopack のルートディレクトリを明示的に設定
  // プロジェクトルートを絶対パスで指定
  turbopack: {
    root: path.resolve(process.cwd()),
  } as any,
};

export default nextConfig;
