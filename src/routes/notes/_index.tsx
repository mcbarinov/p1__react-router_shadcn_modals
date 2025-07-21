import { Link, useLoaderData } from "react-router"

// Type for our notes
type Note = {
  id: number
  title: string
  content: string
  createdAt: string
}

// Loader function - runs BEFORE component renders
// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // In real app, this would be a fetch call
  const notes: Note[] = [
    {
      id: 1,
      title: "First note",
      content: "Content of the first note",
      createdAt: new Date().toISOString(),
    },
    {
      id: 2,
      title: "Second note",
      content: "Content of the second note",
      createdAt: new Date().toISOString(),
    },
  ]

  return { notes }
}

export function NotesPage() {
  // useLoaderData() returns data from loader function
  const { notes } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Notes</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Link key={note.id} to={`/notes/${note.id}`} className="block p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-2">{note.title}</h2>
            <p className="text-gray-600">{note.content}</p>
            <p className="text-sm text-gray-400 mt-4">{new Date(note.createdAt).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
