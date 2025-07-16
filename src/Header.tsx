import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, User } from "lucide-react"

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <h1 className="text-xl font-semibold">SpaceNote</h1>

      <nav className="flex items-center gap-6 text-sm">
        <a href="#" className="hover:underline">
          Notes
        </a>
        <a href="#" className="hover:underline">
          Spaces
        </a>

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
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
