import { Outlet } from "react-router"
import { Header } from "../components/layout/Header"

export function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8">
        <Outlet />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-600">
        <p>&copy; 2025 SpaceNote. All rights reserved.</p>
      </footer>
    </div>
  )
}
