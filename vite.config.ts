import { defineConfig } from "vite"
import path from "path"

const projectRootDir = path.resolve(__dirname)
const appSrcPath = path.resolve(projectRootDir, "src")
const publicPath = path.resolve(projectRootDir, "public")
const buildOutput = path.resolve(projectRootDir, "dist")

// https://vitejs.dev/config/
export default defineConfig({
    root: "src",
    envDir: projectRootDir,
    resolve: {
        alias: {
            "@app": appSrcPath
        },
    },
    build: {
        outDir: buildOutput,
        sourcemap: true,
        emptyOutDir: true,
        manifest: true
    },
    publicDir: publicPath,
    server: {
        port: 8000
    }
})