import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'
import { ZodType } from 'zod'

export function zodValidator<T>(schema: ZodType<T>): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const result = schema.safeParse(control.value)
    if (result.success) return null

    const errors: Record<string, string> = {}
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || 'zod'
      if (!errors[path]) {
        errors[path] = issue.message
      }
    }
    return errors
  }
}
