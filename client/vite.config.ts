import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { join } from "path"

// Client-specific configuration
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: join(__dirname, "src/setupTests.ts"),
    mockReset: true,
  }
})
