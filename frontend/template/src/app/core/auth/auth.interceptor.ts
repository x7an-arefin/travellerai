import { inject } from '@angular/core'
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http'
import { catchError, from, switchMap, throwError } from 'rxjs'
import { AuthService } from '../services/auth.service'

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthService)
  const retried = request.headers.get('x-auth-retried') === '1'
  const token = auth.accessToken()
  const headers = token && !request.headers.has('Authorization') && !request.url.includes('/api/auth/')
    ? request.headers.set('Authorization', `Bearer ${token}`)
    : request.headers
  const outgoing = request.clone({ withCredentials: true, headers })
  return next(outgoing).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || retried || request.url.includes('/api/auth/get-session')) return throwError(() => error)
      return from(auth.refresh()).pipe(
        switchMap((refreshed) => refreshed
          ? next(outgoing.clone({ setHeaders: { 'x-auth-retried': '1' } }))
          : throwError(() => error)),
      )
    }),
  )
}
