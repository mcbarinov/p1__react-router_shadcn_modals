export type CreateNoteState = {
  message?: string
  errors?: {
    title?: string
    content?: string
    general?: string
  }
  note?: {
    id: number
    title: string
    content: string
  }
}

export async function createNoteAction(prevState: CreateNoteState, formData: FormData): Promise<CreateNoteState> {
  // Extract form data
  const title = formData.get("title") as string
  const content = formData.get("content") as string

  // Validation
  const errors: NonNullable<CreateNoteState["errors"]> = {}

  if (!title?.trim()) {
    errors.title = "Title is required"
  } else if (title.length < 3) {
    errors.title = "Title must be at least 3 characters"
  }

  if (!content?.trim()) {
    errors.content = "Content is required"
  }

  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  // Simulate API call
  try {
    // Add artificial delay to show pending state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // In real app: await api.createNote({ title, content })

    // Simulate creating a note
    const newNote = {
      id: Date.now(), // Use timestamp as fake ID
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
    }

    return {
      message: "Note created successfully!",
      note: newNote,
      errors: {}, // Clear any previous errors
    }
  } catch (error) {
    console.error("Note creation failed:", error)

    return {
      errors: {
        general: "Failed to create note. Please try again.",
      },
    }
  }
}
