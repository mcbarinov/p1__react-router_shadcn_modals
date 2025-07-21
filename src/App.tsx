import { RouterProvider } from "react-router"
import { router } from "./routes"
import { DialogProvider } from "./lib/dialog"

function App() {
  return (
    <DialogProvider>
      <RouterProvider router={router} />
    </DialogProvider>
  )
}

export default App
