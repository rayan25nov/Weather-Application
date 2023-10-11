import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env, // Load all environment variables
  },
  server: {
    open: true, // Automatically open the browser when starting the development server
    port: 3000, // Set the port to 3000
  },
});
