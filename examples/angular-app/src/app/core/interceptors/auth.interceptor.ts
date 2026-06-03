import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private readonly authService: AuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    const accessToken: string | null = this.authService.getAccessToken();
    const isApiRequest: boolean = request.url.startsWith(environment.apiBaseUrl);
    const isAuthEndpoint: boolean = /\/auth\/(login|refresh)$/.test(request.url);

    if (!accessToken || !isApiRequest || isAuthEndpoint) {
      return next.handle(request);
    }

    return next.handle(
      request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + accessToken,
        },
      }),
    );
  }
}
