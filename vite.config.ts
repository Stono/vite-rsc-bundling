import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";

const excludeLucide = process.env.EXCLUDE_LUCIDE === "1";

export default defineConfig({
  optimizeDeps: {
    ...(excludeLucide ? { exclude: ["lucide-react"] } : {}),
    entries: ["**/*.{jsx,tsx}"],
  },
  plugins: [rsc()],
  environments: {
    rsc: {
      build: {
        rollupOptions: {
          input: {
            index: "./entry.rsc.tsx",
          },
        },
      },
    },
    ssr: {
      build: {
        rollupOptions: {
          input: {
            index: "./entry.ssr.tsx",
          },
        },
      },
    },
    client: {
      build: {
        rollupOptions: {
          input: {
            index: "./entry.browser.tsx",
          },
        },
      },
    },
  },
});
