import "~/styles/globals.css"
import "virtual:uno.css"
import React from "react"
import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Menu } from "lucide-react"
import Sidebar from "./app-components/Sidebar"
import { getViewStateFromPath, routes } from "./router"

// 初始化 UCID（用户匿名 ID）
if (typeof window !== "undefined") {
  const UCID_KEY = "newsnow-ucid"
  if (!localStorage.getItem(UCID_KEY)) {
    const ucid = `user_${crypto.randomUUID()}`
    localStorage.setItem(UCID_KEY, ucid)
    console.log("Initialized UCID:", ucid)
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
  },
})

const AppContent: React.FC = () => {
  const location = useLocation()
  const currentView = getViewStateFromPath(location.hash)
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true)

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      {isSidebarOpen && <Sidebar currentView={currentView} onToggle={() => setIsSidebarOpen(!isSidebarOpen)} />}
      <main className="flex-1 flex flex-col min-w-0 overflow-auto relative">
        {!isSidebarOpen && (
          <button
            type="button"
            onClick={() => setIsSidebarOpen(true)}
            className="absolute top-4 left-4 z-50 p-2 bg-surface border border-border rounded-lg hover:bg-surfaceHighlight transition-colors text-textSecondary hover:text-white"
          >
            <Menu size={20} />
          </button>
        )}
        <Routes>
          {routes.map(route => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </QueryClientProvider>
  )
}

export default App
