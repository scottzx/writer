import ReactDOM from "react-dom/client"
import App from "./App"
import { cacheSources } from "./utils/data"
import { getAllSourceData } from "./utils/loadStaticData"

// 初始化静态数据
async function initializeStaticData() {
  try {
    console.log("[main] Loading static data...")
    const sourcesData = await getAllSourceData()

    // 将静态数据填充到 cacheSources 中
    sourcesData.forEach((data) => {
      cacheSources.set(data.sourceId as any, {
        items: data.items,
        updatedTime: data.updatedTime,
      } as any)
    })

    console.log(`[main] Loaded ${sourcesData.length} sources into cache`)
  } catch (error) {
    console.error("[main] Failed to load static data:", error)
  }
}

const rootElement = document.getElementById("app")!

if (!rootElement.innerHTML) {
  // 初始化静态数据后再渲染应用
  initializeStaticData().then(() => {
    const root = ReactDOM.createRoot(rootElement)
    root.render(<App />)
  })
}
