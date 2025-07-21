import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useDialog } from "@/lib/dialog"
import { ChevronDown, User } from "lucide-react"
import { NavLink } from "react-router"

export function Header() {
  const dialog = useDialog()

  const handleChangePassword = () => {
    dialog
      .open("changePassword")
      .then((result) => {
        console.log("Password change result:", result)
        // Here you could show a toast notification
      })
      .catch((error) => {
        console.error("Password change failed:", error)
      })
  }

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <h1 className="text-xl font-semibold">SpaceNote</h1>

      <nav className="flex items-center gap-6 text-sm">
        <NavLink
          to="/notes"
          className={({ isActive }) =>
            isActive ? "text-sm font-medium text-blue-600" : "text-sm font-medium text-gray-600 hover:text-gray-900"
          }
        >
          Notes
        </NavLink>
        <NavLink
          to="/spaces"
          className={({ isActive }) =>
            isActive ? "text-sm font-medium text-blue-600" : "text-sm font-medium text-gray-600 hover:text-gray-900"
          }
        >
          Spaces
        </NavLink>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-1 font-medium hover:underline focus:outline-none">
            <User className="w-4 h-4" />
            Open
            <ChevronDown className="w-4 h-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={5}>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
            <DropdownMenuItem onClick={handleChangePassword}>Change Password</DropdownMenuItem>
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
