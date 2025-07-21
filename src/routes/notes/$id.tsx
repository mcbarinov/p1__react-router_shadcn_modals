import { useLoaderData } from "react-router"
import type { LoaderFunctionArgs } from "react-router"

type NoteDetail = {
  id: number
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader({ params }: LoaderFunctionArgs) {
  const noteId = params.id

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 300))

  // In real app: const response = await fetch(`/api/notes/${noteId}`);
  const note: NoteDetail = {
    id: Number(noteId),
    title: `Note ${noteId}`,
    content: `This is the detailed content of note ${noteId}. In a real application, this would be fetched from your API.`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return { note }
}

export function NoteDetailPage() {
  const { note } = useLoaderData<typeof loader>()

  return (
    <article className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{note.title}</h1>
      <div className="text-sm text-gray-500 mb-6">
        Created: {new Date(note.createdAt).toLocaleDateString()}
        {note.updatedAt !== note.createdAt && <> • Updated: {new Date(note.updatedAt).toLocaleDateString()}</>}
      </div>
      <div className="prose prose-lg">
        <p>{note.content}</p>
      </div>
    </article>
  )
}
