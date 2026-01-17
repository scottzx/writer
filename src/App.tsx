import "~/styles/globals.css"
import "virtual:uno.css"
import React from "react"
import { HashRouter, Route, Routes, useLocation } from "react-router-dom"
import Sidebar from "./app-components/Sidebar"
import { getViewStateFromPath, routes } from "./router"
import { ViewState } from "./app-types"

const AppContent: React.FC = () => {
  const location = useLocation()
  const currentView = getViewStateFromPath(location.hash) || ViewState.NEWS

  return (
    <div className="flex h-screen bg-background text-white font-sans overflow-hidden">
      <Sidebar currentView={currentView} />
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
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
    <HashRouter>
      <AppContent />
    </HashRouter>
  )
}

export default App
