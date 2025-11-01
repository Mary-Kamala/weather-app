// next.config.mjs
import path from "path";
 
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
 
  // ✅ Add Turbopack config so @ alias works
  turbopack: {
    resolveAlias: {
      "@": path.resolve("./src"),
    },
  },
};
 
export default nextConfig;









// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   /* config options here */
// };

// export default nextConfig;
