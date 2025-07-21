import { useLoaderData } from "react-router"

type Space = {
  id: number
  name: string
  description: string
  membersCount: number
}

// eslint-disable-next-line react-refresh/only-export-components
export async function loader() {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const spaces: Space[] = [
    {
      id: 1,
      name: "Personal workspace",
      description: "My personal notes and ideas",
      membersCount: 1,
    },
    {
      id: 2,
      name: "Work project",
      description: "Project documentation and notes",
      membersCount: 5,
    },
  ]

  return { spaces }
}

export function SpacesPage() {
  const { spaces } = useLoaderData<typeof loader>()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Spaces</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {spaces.map((space) => (
          <div key={space.id} className="p-6 border rounded-lg hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">{space.name}</h2>
            <p className="text-gray-600 mb-4">{space.description}</p>
            <p className="text-sm text-gray-500">Members: {space.membersCount}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
