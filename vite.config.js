import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react-swc";

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     host: "0.0.0.0",
//     port: 8080, // o el puerto que hayas decidido usar
//     strictPort: true,
//     hmr: {
//       host: "192.168.100.9",
//       port: 8080,
//       clientPort: 8080,
//     },
//   },
// });
