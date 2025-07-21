import { createBrowserRouter, redirect } from "react-router"
import { RootLayout } from "./routes/_root"
import { NotesPage, loader as notesLoader } from "./routes/notes/_index"
import { NoteDetailPage, loader as noteDetailLoader } from "./routes/notes/$id"
import { SpacesPage, loader as spacesLoader } from "./routes/spaces"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        loader: () => redirect("/notes"),
      },
      {
        path: "notes",
        children: [
          {
            index: true,
            Component: NotesPage,
            loader: notesLoader,
          },
          {
            path: ":id",
            Component: NoteDetailPage,
            loader: noteDetailLoader,
          },
        ],
      },
      {
        path: "spaces",
        Component: SpacesPage,
        loader: spacesLoader,
      },
    ],
  },
])
