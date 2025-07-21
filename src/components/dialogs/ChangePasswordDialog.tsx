import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { changePasswordAction, type ChangePasswordState } from "@/actions/passwordActions"
import type { BaseDialogProps } from "@/lib/dialog"

// Submit button component that uses useFormStatus
function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Changing..." : "Change Password"}
    </Button>
  )
}

// Cancel button component that also respects form status
function CancelButton({ onCancel }: { onCancel: () => void }) {
  const { pending } = useFormStatus()

  return (
    <Button type="button" variant="outline" onClick={onCancel} disabled={pending}>
      Cancel
    </Button>
  )
}

export function ChangePasswordDialog({ onClose, onSuccess }: BaseDialogProps) {
  // useActionState replaces all the useState logic
  const [state, submitAction] = useActionState<ChangePasswordState, FormData>(
    changePasswordAction,
    { errors: {} } // Initial state
  )

  // Handle successful password change with useEffect to avoid side effects in render
  useEffect(() => {
    if (state.message) {
      // Call onSuccess with the message and close dialog
      onSuccess?.(state.message)
      onClose()
    }
  }, [state.message, onSuccess, onClose])

  return (
    <Dialog open onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>Enter your current password and choose a new one.</DialogDescription>
        </DialogHeader>

        <form action={submitAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" name="currentPassword" type="password" placeholder="Enter current password" required />
            {state.errors?.currentPassword && <p className="text-sm text-red-600">{state.errors.currentPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" name="newPassword" type="password" placeholder="Enter new password" required minLength={6} />
            {state.errors?.newPassword && <p className="text-sm text-red-600">{state.errors.newPassword}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" name="confirmPassword" type="password" placeholder="Confirm new password" required />
            {state.errors?.confirmPassword && <p className="text-sm text-red-600">{state.errors.confirmPassword}</p>}
          </div>

          {/* General error message */}
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

export default ChangePasswordDialog
