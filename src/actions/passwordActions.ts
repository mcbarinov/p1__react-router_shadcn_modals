// Action function for changing password
export type ChangePasswordState = {
  message?: string
  errors?: {
    currentPassword?: string
    newPassword?: string
    confirmPassword?: string
    general?: string
  }
}

// Add reset action
export async function resetPasswordDialogAction(): Promise<ChangePasswordState> {
  return { errors: {} }
}

export async function changePasswordAction(prevState: ChangePasswordState, formData: FormData): Promise<ChangePasswordState> {
  // 1. Extract form data
  const currentPassword = formData.get("currentPassword") as string
  const newPassword = formData.get("newPassword") as string
  const confirmPassword = formData.get("confirmPassword") as string

  // 2. Client-side validation
  const errors: NonNullable<ChangePasswordState["errors"]> = {}

  if (!currentPassword?.trim()) {
    errors.currentPassword = "Current password is required"
  }

  if (!newPassword?.trim()) {
    errors.newPassword = "New password is required"
  } else if (newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters"
  }

  if (!confirmPassword?.trim()) {
    errors.confirmPassword = "Please confirm your password"
  } else if (newPassword !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match"
  }

  // Return validation errors if any
  if (Object.keys(errors).length > 0) {
    return { errors }
  }

  // 3. Simulate API call
  try {
    // Add artificial delay to show pending state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate API call
    // In real app: await api.changePassword(currentPassword, newPassword)

    // Simulate potential server error (uncomment to test)
    // if (Math.random() > 0.7) {
    //   throw new Error('Server error')
    // }

    return {
      message: "Password changed successfully!",
      errors: {}, // Clear any previous errors
    }
  } catch (error) {
    console.error("Password change failed:", error)

    return {
      errors: {
        general: "Failed to change password. Please try again.",
      },
    }
  }
}
