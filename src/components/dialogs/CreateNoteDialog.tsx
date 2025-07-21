import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createNoteAction, type CreateNoteState } from "@/actions/noteActions"
import type { BaseDialogProps } from "@/lib/dialog"

type CreateNoteDialogProps = BaseDialogProps & {
  defaultTitle?: string
  defaultContent?: string
}

// Submit button component
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create Note"}
    </Button>
  )
}

// Cancel button component
function CancelButton({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus()

  return (
    <Button type="button" variant="outline" onClick={onCancel} disabled={pending}>
      Cancel
    </Button>
  )
}

export function CreateNoteDialog({ onClose, onSuccess, defaultTitle = "", defaultContent = "" }: CreateNoteDialogProps) {
  // useActionState for form handling
  const [state, submitAction] = useActionState<CreateNoteState, FormData>(createNoteAction, { errors: {} })

  // Handle successful note creation
  useEffect(() => {
    if (state.note) {
      // Pass the created note to onSuccess
      onSuccess?.(state.note)
      onClose()
    }
  }, [state.note, onSuccess, onClose])

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Note</DialogTitle>
          <DialogDescription>Add a new note to your collection.</DialogDescription>
        </DialogHeader>

        <form action={submitAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter note title"
              defaultValue={defaultTitle}
              required
              minLength={3}
              autoFocus
            />
            {state.errors?.title && <p className="text-sm text-red-600">{state.errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              placeholder="Write your note content here..."
              defaultValue={defaultContent}
              required
              rows={5}
              className="resize-none"
            />
            {state.errors?.content && <p className="text-sm text-red-600">{state.errors.content}</p>}
          </div>

          {state.errors?.general && <p className="text-sm text-red-600 font-medium">{state.errors.general}</p>}

          <DialogFooter>
            <CancelButton onCancel={onClose} />
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateNoteDialog
