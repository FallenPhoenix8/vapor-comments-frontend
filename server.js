import { serve } from "bun"
import { readFileSync } from "fs"
import { join } from "path"

const PORT = process.env.POT || 3000 // You can change the port if needed
const DIST_DIR = process.env.DIST_DIR || "./dist" // Path to your built Vue app

serve({
  port: PORT,
  fetch(req) {
    const url = new URL(req.url)
    let filePath = join(
      DIST_DIR,
      url.pathname === "/" ? "index.html" : url.pathname
    )

    try {
      const fileContent = readFileSync(filePath)
      return new Response(fileContent, {
        headers: {
          "Content-Type": getContentType(filePath),
        },
      })
    } catch (error) {
      return new Response("404 Not Found", { status: 404 })
    }
  },
})

console.log(`Server running at http://localhost:${PORT}`)

function getContentType(filePath) {
  const ext = filePath.split(".").pop()
  switch (ext) {
    case "html":
      return "text/html"
    case "js":
      return "application/javascript"
    case "css":
      return "text/css"
    case "png":
      return "image/png"
    case "jpg":
    case "jpeg":
      return "image/jpeg"
    case "gif":
      return "image/gif"
    case "svg":
      return "image/svg+xml"
    case "ico":
      return "image/x-icon"
    default:
      return "application/octet-stream"
  }
}
